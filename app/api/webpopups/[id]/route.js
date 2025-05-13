import { NextResponse } from 'next/server';
import PopupsModel from '@/lib/models/PopupsModel';
import { ConnectDB } from '@/lib/db/ConnectDB';
import cloudinary from '@/lib/cloudinary';
import fs from 'fs';
import path from 'path';

const uploadImageToCloudinary = async (file) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder: "Webpopups" },
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        );
        // Use createReadStream only after multer has processed the file
        const readStream = fs.createReadStream(file);
        readStream.pipe(stream);
    });
};

// Set up the directory where the files will be saved
const uploadDirectory = path.join(process.cwd(), 'public/images');

// Ensure the upload directory exists
if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory, { recursive: true });
};

export async function DELETE(req, { params }) {
    const { id } = params;

    try {
        await ConnectDB();

        // Find the popup by ID
        const popup = await PopupsModel.findById(id);

        if (!popup) {
            return NextResponse.json({ error: 'popup not found' }, { status: 404 });
        }

        const publicId = popup.image.public_id;
        if (publicId) {
            const result = await cloudinary.uploader.destroy(publicId);

            if (result.result !== 'ok') {
                return NextResponse.json({ error: 'Failed to delete image from Cloudinary' }, { status: 500 });
            }
        }
        await popupsModel.findByIdAndDelete(id);
        return NextResponse.json({ message: 'popup deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error deleting popup:', error);
        return NextResponse.json({ error: 'Failed to delete popup' }, { status: 500 });
    }
}

// GET popup by ID
export async function GET(req, { params }) {
    const { id } = params; // Extract ID from params

    try {
        await ConnectDB(); // Ensure DB connection
        const popup = await PopupsModel.findById(id); // Properly await the findById function

        if (!popup) {
            return NextResponse.json({ error: 'popup not found' }, { status: 404 });
        }

        return NextResponse.json({ popup }, { status: 200 });
    } catch (error) {
        console.error('Error fetching popup:', error);
        return NextResponse.json({ error: 'Error while fetching popup' }, { status: 500 });
    }
}

export async function PUT(req, { params }) {
    const { id } = params; // Extract popup ID from params
    try {
        const formData = await req.formData();
        const file = formData.get('image');
        const title = formData.get('title');
        const a = await file.arrayBuffer();
        const buffer = Buffer.from(a)
        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        // Generate a unique filename
        const uniqueFilename = `${Date.now()}_${file.name}`;
        const filePath = path.join(uploadDirectory, uniqueFilename);
        await fs.promises.writeFile(filePath, buffer);

        // Return the file path as a response
        const fileUrl = `public/images/${uniqueFilename}`
        const imageResult = await uploadImageToCloudinary(fileUrl);
        await PopupsModel.findByIdAndUpdate(
            id,
            {
                image: {
                    url: imageResult.secure_url,
                    public_id: imageResult.public_id,
                },
                title
            })
        return NextResponse.json({ message: 'Data Aded successfully' }, { status: 201 });
    } catch (error) {
        console.error('Error updating popup:', error);
        return NextResponse.json({ error: 'Failed to update popup' }, { status: 500 });
    }
}