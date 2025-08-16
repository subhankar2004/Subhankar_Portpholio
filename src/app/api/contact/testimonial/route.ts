// app/api/contact/testimonial/route.ts - Version with Prisma
import { NextRequest, NextResponse } from "next/server";

// Dynamic import to handle potential Prisma issues during build
async function getPrisma() {
  try {
    const { PrismaClient } = await import('@prisma/client');
    return new PrismaClient();
  } catch (error) {
    console.error('Failed to import Prisma:', error);
    return null;
  }
}

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

    // Try to save to database
    const prisma = await getPrisma();
    
    if (!prisma) {
      // Fallback: log the testimonial but still return success
      console.log('Prisma not available, logging testimonial:', {
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
      });
      
      return NextResponse.json(
        {
          success: true,
          message: 'Testimonial received (database temporarily unavailable)',
          id: 'temp-id'
        },
        { status: 201 }
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

    await prisma.$disconnect();

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
  }
}

export async function GET() {
  return NextResponse.json(
    { 
      success: true, 
      message: 'Testimonial API is working' 
    },
    { status: 200 }
  );
}


