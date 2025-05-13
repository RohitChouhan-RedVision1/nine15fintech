import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { ConnectDB } from '@/lib/db/ConnectDB';
import cloudinary from '@/lib/cloudinary';
import PopupsModel from '@/lib/models/PopupsModel';
// Upload image to Cloudinary
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

// // Connect to the database
const LoadDB = async () => {
    await ConnectDB();
};

LoadDB();


export async function POST(req) {
    try {
        const formData = await req.formData();
        // const id = formData.get('id');
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
        await PopupsModel.create(
            {
                image: {
                    url: imageResult.secure_url,
                    public_id: imageResult.public_id,
                },
                title
            })
        return NextResponse.json({ message: 'Data Aded successfully' }, { status: 201 });
    }
    catch (error) {
        console.log(error)
        return NextResponse.json({ error: error }, { status: 500 });
    }

}

export async function GET(req, res) {
    try {
        await ConnectDB(); // Ensure DB connection
        const testimonial = await PopupsModel.find({}); // Fetch all blogs
        return NextResponse.json(testimonial, { status: 200 });
    } catch (error) {
        console.error('Error fetching blogs:', error);
        return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
    }
}