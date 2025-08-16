// app/api/contact/testimonial/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

// Initialize Prisma client
const prisma = new PrismaClient();

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

    // Validation
    if (!name || !title || !company || !email || !rating || !message || !category) {
      return NextResponse.json(
        { 
          success: false, 
          message: "Name, title, company, email, rating, message, and category are required" 
        },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { 
          success: false, 
          message: "Please enter a valid email address" 
        },
        { status: 400 }
      );
    }

    // Rating validation
    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { 
          success: false, 
          message: "Rating must be between 1 and 5" 
        },
        { status: 400 }
      );
    }

    // Save testimonial to database
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
        isApproved: isApproved ?? false,
        isPublished: isPublished ?? false,
      }
    });

    console.log('Testimonial saved:', testimonial.id);

    return NextResponse.json(
      {
        success: true,
        message: 'Testimonial saved successfully',
        id: testimonial.id
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("Error in creating testimonial:", error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal server error. Please try again later.' 
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET() {
  try {
    // Test database connection
    const count = await prisma.testimonial.count();
    return NextResponse.json(
      { 
        success: true, 
        message: 'Testimonial API is working',
        totalTestimonials: count
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Database connection error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Database connection failed' 
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}


