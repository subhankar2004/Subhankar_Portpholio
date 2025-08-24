import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma"; // Use the new singleton instance
export const dynamic = "force-dynamic";
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
    } = body;

    // Validation
    if (
      !name ||
      !title ||
      !company ||
      !email ||
      !rating ||
      !message ||
      !category
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Name, title, company, email, rating, message, and category are required",
        },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid email address",
        },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        {
          success: false,
          message: "Rating must be between 1 and 5",
        },
        { status: 400 }
      );
    }

    const testimonial = await prisma.testimonial.create({
      data: {
        name: name.trim(),
        title: title.trim(),
        company: company.trim(),
        email: email.trim().toLowerCase(),
        rating: parseInt(rating),
        message: message.trim(),
        category: category.trim(),
        avatarUrl: avatarUrl?.trim() || null,
        allowPublic: allowPublic ?? true,
        isApproved: false, // Controlled by server for security
        isPublished: false, // Controlled by server for security
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Testimonial saved successfully",
        id: testimonial.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in creating testimonial:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error. Please try again later.",
      },
      { status: 500 }
    );
  }
}

//Getting all testimonial responses 
export async function GET(){
  const testimonial=await prisma.testimonial.findMany();
  return NextResponse.json({
    success:true,
    message:"Testimonial API is working",
    testimonial
  });
}
