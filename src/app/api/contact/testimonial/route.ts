import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      title,
      company,
      email,
      rating,
      message,
      category,
      avatarUrl,
      allowPublic,
      isApproved,
      isPublished,
    } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

     //email verification
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)){
        return NextResponse.json({message:"Please enter a valid email address"},{status:400});
    }

    const testimonial = await prisma.testimonials.create({
        data: {
            name:name.trim(),
            title,
            company,
            email:email.trim().toLowerCase(),
            rating,
            message:message.trim(),
            category:category?.trim()||null,
            avatarUrl,
            allowPublic,
            isApproved,
            isPublished
        }
    });

    return NextResponse.json(
        {
            success: true,
            message: 'Testimonial saved successfully',
            id: testimonial.id
        },
        {
            status: 201
        }
    )




  } catch (error) {
    console.log("Error in creating testimonial",error);
  }
}
