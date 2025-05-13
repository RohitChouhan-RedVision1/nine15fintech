import { NextResponse } from 'next/server';
import { ConnectDB } from '@/lib/db/ConnectDB';
import SiteSettingsModel from '@/lib/models/SiteSetting';
import cloudinary from '@/lib/cloudinary';
import path from 'path';
import fs from 'fs';
const uploadImageToCloudinary = async (file) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder: "Video" },
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

export async function POST(req) {
  
    await ConnectDB();
    try {
        const {
            id, name,websiteName,email,alternateEmail,alternateMobile,mobile,whatsAppNo,address,iframe,mapurl,websiteDomain,image,callbackurl,siteurl
        } = await req.json();

        // console.log(whatsAppNo)
        let updatedImage = image;
        
        // console.log(title, email, arn, address, mapurl, euin, mobile, mobile2, logo, description, twitter, facebook, instagram, linkedin, youtube)
        const data = await SiteSettingsModel.find({});

           if (image && image.size > 0) {
                    // If there's a new image, handle the old image deletion
                    const publicId = data.image?.public_id;
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
                        folder: 'SiteSetting', // You can specify the folder in Cloudinary
                    });
        
                    // Update the testimonial with the new image data
                    updatedImage = {
                        url: uploadResult.secure_url,
                        public_id: uploadResult.public_id,
                    };
                }
        if (data.length !== 0) {
            
            await SiteSettingsModel.findByIdAndUpdate(
                { _id: id },
                {
                    name,
                    websiteName,
                    email,
                    alternateEmail,
                    mobile,
                    whatsAppNo,
                    address,
                    iframe,
                    mapurl,
                    websiteDomain,
                    image: updatedImage,
                    alternateMobile,
                    callbackurl,
                    siteurl
                }
            );
        } else {
            await SiteSettingsModel.create( {
                name,
                websiteName,
                email,
                alternateEmail,
                whatsAppNo,
                mobile,
                address,
                iframe,
                mapurl,
                websiteDomain,
                image: updatedImage,
                alternateMobile,
                callbackurl,
                siteurl
            });
        }
        return NextResponse.json({ message: 'Data uploaded successfully' }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function GET() {
    try {
        await ConnectDB(); // Ensure DB connection
        const data = await SiteSettingsModel.find({}); // Fetch all blogs
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error('Error fetching blogs:', error);
        return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
    }
}