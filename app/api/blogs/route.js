import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import BlogsModel from '@/lib/models/BlogModel';
import { ConnectDB } from '@/lib/db/ConnectDB';
import cloudinary from '@/lib/cloudinary';
import { slugify } from '@/lib/functions';
// Upload image to Cloudinary
const uploadImageToCloudinary = async (file) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder: "BlogsPost" },
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

// // Connect to the database
const LoadDB = async () => {
    await ConnectDB();
};

LoadDB();

// Ensure the upload directory exists
if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory, { recursive: true });
};

export async function POST(req) {
    try {
        const formData = await req.formData();
        const file = formData.get('image'); // Adjust according to your input name
        const posttitle = formData.get('posttitle');
        const metatitle = formData.get('metatitle');
        const description = formData.get('description');
        const content = formData.get('content');
        const category = formData.get('category');
        const keywords = formData.get('keywords');
        const a = await file.arrayBuffer();
        const buffer = Buffer.from(a)
        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        // Generate a unique filename
        const uniqueFilename = `${Date.now()}_${file.name}`;
        const filePath = path.join(uploadDirectory, uniqueFilename);
        // const buffer = Buffer.from(arrayBuffer);

        await fs.promises.writeFile(filePath, buffer);

        // Return the file path as a response
        const fileUrl = `public/images/${uniqueFilename}`
        const imageResult = await uploadImageToCloudinary(fileUrl);
        await BlogsModel.create({
            image: {
                url: imageResult.secure_url,
                public_id: imageResult.public_id,
            },
            slug: slugify(posttitle),
            posttitle,
            metatitle,
            description,
            content,
            keywords,
            category,
        })
        return NextResponse.json({ message: 'Data uploaded successfully' }, { status: 201 });
    }
    catch (error) {
        console.log(error)
        return NextResponse.json({ error: error }, { status: 500 });
    }

}

export async function GET(req, res) {
    try {
        await ConnectDB(); // Ensure DB connection
        const blogs = await BlogsModel.find({}); // Fetch all blogs
        return NextResponse.json(blogs, { status: 200 });
    } catch (error) {
        console.error('Error fetching blogs:', error);
        return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
    }
}