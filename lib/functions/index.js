import { ConnectDB } from "../db/ConnectDB";
import ArnModel from "../models/ArnModel";
import BlogsModel from "../models/BlogModel";
import ServicesModel from "../models/ServicesModel";
import SiteSettingsModel from "../models/SiteSetting";
import SocialMediaModel from "../models/SocialMedia";
import TestimonialModel from "../models/TestimonialModel";
import VideoModel from "../models/VideoModel";

export async function getSiteData() {
    await ConnectDB();
    const data = await SiteSettingsModel?.findOne({}).select('-_id');
    return data ? data.toObject() : {};
}

export async function getSocialMedia() {
    await ConnectDB();
    const data = await SocialMediaModel?.find({}).select('-_id');
    return data ? data.map(service => service.toObject()) : [];
}

export async function getArn() {
    await ConnectDB();
    const data = await ArnModel?.find({}).select('-_id');
    return data ? data.map(service => service.toObject()) : [];
}

export async function getServiceData() {
    await ConnectDB();
    const data = await ServicesModel?.find({}).select('-_id');  // Use find() instead of findOne()
    return data ? data.map(service => service.toObject()) : [];
};

export async function getTestimonials() {
    await ConnectDB();
    const data = await TestimonialModel?.find({}).select('-_id');  // Use find() instead of findOne()
    return data ? data.map(service => service.toObject()) : [];
};
export async function getLatestBlogs() {
    await ConnectDB();

    const blogs = await BlogsModel.find({})
        .sort({ createdAt: -1 })   // Sort by newest first
        .limit(3)                  // Get only the latest 3
        .select('-_id');           // Exclude the MongoDB _id if not needed

    return blogs ? blogs.map(blog => blog.toObject()) : [];
}




export async function getBlogs() {
    await ConnectDB();
    const data = await BlogsModel?.find({}).select('-_id');  // Use find() instead of findOne()
    return data ? data.map(service => service.toObject()) : [];
};

export async function getVidios() {
    await ConnectDB();
    const data = await VideoModel?.find({}).select('-_id');  // Use find() instead of findOne()
    return data ? data.map(service => service.toObject()) : [];
};


export async function getBlogBySlug(slug) {
    // console.log(slug,"dnajkdnhasjlkdnaslk")
    await ConnectDB();
    const blog = await BlogsModel.findOne({slug});
    // console.log(blog,"ndjadn")
    return blog ? blog.toObject() : null;
  }



  export function slugify(text) {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')   // Replace non-alphanumeric with hyphens
      .replace(/^-+|-+$/g, '');      // Trim leading/trailing hyphens
  }