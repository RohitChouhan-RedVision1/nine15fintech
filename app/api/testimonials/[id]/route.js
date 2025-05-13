import { NextResponse } from 'next/server';
import { ConnectDB } from '@/lib/db/ConnectDB';
import cloudinary from '@/lib/cloudinary';
import TestimonialModel from '@/lib/models/TestimonialModel';
import path from 'path';
import fs from 'fs';

export async function DELETE(req, { params }) {
    const { id } = params;

    try {
        await ConnectDB();

        // Find the testimonial by ID
        const testimonial = await TestimonialModel.findById(id);

        if (!testimonial) {
            return NextResponse.json({ error: 'testimonial not found' }, { status: 404 });
        }

        const publicId = testimonial.image.public_id;
        if (publicId) {
            const result = await cloudinary.uploader.destroy(publicId);

            if (result.result !== 'ok') {
                return NextResponse.json({ error: 'Failed to delete image from Cloudinary' }, { status: 500 });
            }
        }
        await TestimonialModel.findByIdAndDelete(id);
        return NextResponse.json({ message: 'testimonial deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error deleting testimonial:', error);
        return NextResponse.json({ error: 'Failed to delete testimonial' }, { status: 500 });
    }
}

// GET testimonial by ID
export async function GET(req, { params }) {
    const { id } = params; // Extract ID from params

    try {
        await ConnectDB(); // Ensure DB connection
        const testimonial = await TestimonialModel.findById(id); // Properly await the findById function

        if (!testimonial) {
            return NextResponse.json({ error: 'testimonial not found' }, { status: 404 });
        }

        return NextResponse.json({ testimonial }, { status: 200 });
    } catch (error) {
        console.error('Error fetching testimonial:', error);
        return NextResponse.json({ error: 'Error while fetching testimonial' }, { status: 500 });
    }
}

export async function PUT(req, { params }) {
    // Set up the directory where the files will be saved
    const uploadDirectory = path.join(process.cwd(), 'public/images');

    // Ensure the upload directory exists
    if (!fs.existsSync(uploadDirectory)) {
        fs.mkdirSync(uploadDirectory, { recursive: true });
    };

    const { id } = params;

    try {
        await ConnectDB();
        const formData = await req.formData();
        const image = formData.get('image');
        const author = formData.get('author');
        const designation = formData.get('designation');
        const content = formData.get('content');

        // Find the existing testimonial
        const testimonial = await TestimonialModel.findById(id);
        if (!testimonial) {
            return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
        }
        // Check if an image is being uploaded
        if (image && image.size > 0) {
            // If there's a new image, handle the old image deletion
            const publicId = testimonial.image?.public_id;
            if (publicId) {
                const result = await cloudinary.uploader.destroy(publicId);
                if (result.result !== 'ok') {
                    return NextResponse.json({ error: 'Failed to delete old image from Cloudinary' }, { status: 500 });
                }
            }
            // Generate a unique filename
            const a = await image.arrayBuffer();
            const buffer = Buffer.from(a)
            const uniqueFilename = `${Date.now()}_${image.name}`;
            const filePath = path.join(uploadDirectory, uniqueFilename);
            await fs.promises.writeFile(filePath, buffer);
            // Return the file path as a response
            const fileUrl = `public/images/${uniqueFilename}`

            // Upload the new image to Cloudinary
            const uploadResult = await cloudinary.uploader.upload(fileUrl, {
                folder: 'Testimonials', // You can specify the folder in Cloudinary
            });

            // Update the testimonial with the new image data
            testimonial.image = {
                url: uploadResult.secure_url,
                public_id: uploadResult.public_id,
            };
        }

        // Update the testimonial fields only if new values are provided
        testimonial.author = author || testimonial.author;
        testimonial.content = content || testimonial.content;
        testimonial.designation = designation || testimonial.designation;

        // Save the updated testimonial
        await testimonial.save();

        return NextResponse.json({ message: 'Testimonial updated successfully', testimonial }, { status: 200 });
    } catch (error) {
        console.error('Error updating testimonial:', error);
        return NextResponse.json({ error: 'Failed to update testimonial' }, { status: 500 });
    }
}
