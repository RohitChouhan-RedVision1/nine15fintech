import { NextResponse } from 'next/server';
import { ConnectDB } from '@/lib/db/ConnectDB';
import cloudinary from '@/lib/cloudinary';

import path from 'path';
import fs from 'fs';
import VideoModel from '@/lib/models/VideoModel';

export async function DELETE(req, { params }) {
    const { id } = params;

    try {
        await ConnectDB();

        // Find the testimonial by ID
        const video = await VideoModel.findById(id);

        if (!video) {
            return NextResponse.json({ error: 'video not found' }, { status: 404 });
        }

        const publicId = video.image.public_id;
        if (publicId) {
            const result = await cloudinary.uploader.destroy(publicId);

            if (result.result !== 'ok') {
                return NextResponse.json({ error: 'Failed to delete image from Cloudinary' }, { status: 500 });
            }
        }
        await VideoModel.findByIdAndDelete(id);
        return NextResponse.json({ message: 'video deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error deleting video:', error);
        return NextResponse.json({ error: 'Failed to delete video' }, { status: 500 });
    }
}

// GET testimonial by ID
export async function GET(req, { params }) {
    const { id } = params; // Extract ID from params

    try {
        await ConnectDB(); // Ensure DB connection
        const video = await VideoModel.findById(id); // Properly await the findById function

        if (!video) {
            return NextResponse.json({ error: 'video not found' }, { status: 404 });
        }

        // console.log(video)

        return NextResponse.json({ video }, { status: 200 });
    } catch (error) {
        console.error('Error fetching video:', error);
        return NextResponse.json({ error: 'Error while fetching video' }, { status: 500 });
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
        const title = formData.get('title');
        const videoUrl = formData.get('videoUrl');
        const embedUrl = formData.get('embedUrl');

        // Find the existing testimonial
        const video = await VideoModel.findById(id);
        if (!video) {
            return NextResponse.json({ error: 'video not found' }, { status: 404 });
        }
        // Check if an image is being uploaded
        if (image && image.size > 0) {
            // If there's a new image, handle the old image deletion
            const publicId = video.image?.public_id;
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
                folder: 'Video', // You can specify the folder in Cloudinary
            });

            // Update the testimonial with the new image data
            video.image = {
                url: uploadResult.secure_url,
                public_id: uploadResult.public_id,
            };
        }

        // Update the testimonial fields only if new values are provided
        video.title = title || video.title;
        video.videoUrl = videoUrl || video.videoUrl;
        video.embedUrl = embedUrl || video.embedUrl;

        console.log(video.embedUrl)

        // Save the updated testimonial
        await video.save();

        return NextResponse.json({ message: 'video updated successfully', video }, { status: 200 });
    } catch (error) {
        console.error('Error updating video:', error);
        return NextResponse.json({ error: 'Failed to update video' }, { status: 500 });
    }
}
