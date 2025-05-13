import { Button } from "@/components/ui/button";
import {
    Form, FormControl, FormField, FormItem, FormLabel, FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import HCaptcha from '@hcaptcha/react-hcaptcha';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FormSchema = z.object({
    username: z.string().min(2, { message: "Username must be at least 2 characters." }),
    mobile: z.string().nonempty({ message: "Mobile number is required." }),
    email: z.string().email({ message: "Invalid email address." }),
    service: z.string().nonempty({ message: "Please select a service." }),
    message: z.string().optional(),
});

export function InputForm({ services, sitedata }) {
    const [hcaptchaToken, setHcaptchaToken] = useState(null);
    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            username: "",
            mobile: "",
            email: "",
            service: "",
            message: "",
        },
    });

    // Handle form submission
    const onSubmit = async (data) => {
        if (!hcaptchaToken) {
            alert("Please complete the CAPTCHA.");
            return;
        }

        const emaildata = {
            user: data?.username,
            to: data?.email,
            subject: 'Thank You for Your Enquiry!',
            text: `Dear ${data?.username}, We sincerely appreciate your interest and the time you took to fill out our enquiry form. We have received your details, and our team will be in touch with you soon.
            Regards, 
            Website Team`
            ,
        }
        const senderdata = {
            user: sitedata?.title,
            to: sitedata?.email,
            subject: 'New Enquiry',
            text: `New Enquiry \n
User Name : ${data?.username}, \n
Email : ${data?.email} \n
Mobile number : ${data?.mobile} \n
Message : ${data?.message}`,
        }
        try {
            const response = await axios.post('/api/leads/', data);
            const info = await axios.post('/api/email/', emaildata);
            const sender = await axios.post('/api/email/', senderdata);
            if (response.status === 201) {
                toast({
                    description: "Your message has been sent.",
                });
                form.reset();
                setHcaptchaToken(null); // Reset the token after submission
            } else {
                alert(response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
            alert("An unexpected error occurred.");
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 px-10 bg-white shadow-lg rounded-lg py-9">
                {/* Username Field */}
                <div className='grid grid-cols-2 gap-3'>
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="User Name" {...field} aria-label="User Name" className="border-2 border-gray-500" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Mobile Field */}
                    <FormField
                        control={form.control}
                        name="mobile"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Mobile</FormLabel>
                                <FormControl>
                                    <Input placeholder="Mobile" {...field} aria-label="Mobile Number" className="border-2 border-gray-500" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className='grid grid-cols-2 gap-3'>

                    {/* Email Field */}
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input type="email" placeholder="Email" {...field} aria-label="Email" className="border-2 border-gray-500" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* Service Dropdown */}
                    <FormField
                        control={form.control}
                        name="service"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Service</FormLabel>
                                <FormControl>
                                    <select {...field} className="w-full border-2 border-gray-500 rounded-lg p-1.5">
                                        <option value="" disabled>Select a service</option>
                                        {services?.map((option) => (
                                            <option key={option.name} value={option.name}>
                                                {option.name}
                                            </option>
                                        ))}
                                    </select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                {/* Message Field */}
                <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                                <textarea placeholder="Message" {...field} aria-label="Message" className="border-2 border-gray-500 w-full p-1 rounded" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* hCaptcha */}
                <HCaptcha
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}// Replace with your site key
                    onVerify={setHcaptchaToken} // Set the token on successful verification
                />

                {/* Submit Button */}
                <Button type="submit" className="bg-[var(--rv-bg-secondary)]">Submit</Button>
            </form>
            <ToastContainer />
        </Form>
    );
}