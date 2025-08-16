// app/api/contact/route.ts - Version with Prisma
"use server";
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
        const { name, email, subject, message } = body;

        // Basic validation
        if (!name || !email || !message) {
            return NextResponse.json(
                { 
                    success: false, 
                    message: "Name, email, and message are required" 
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

        // Try to save to database
        const prisma = await getPrisma();
        
        if (!prisma) {
            // Fallback: log the message but still return success
            console.log('Prisma not available, logging message:', { name, email, subject, message });
            return NextResponse.json(
                {
                    success: true,
                    message: 'Message received (database temporarily unavailable)',
                    id: 'temp-id',
                },
                { status: 201 }
            );
        }

        const contactMessage = await prisma.contactMessage.create({
            data: {
                name: name.trim(),
                email: email.trim().toLowerCase(),
                subject: subject?.trim() || null,
                message: message.trim()
            }
        });

        await prisma.$disconnect();

        return NextResponse.json(
            {
                success: true,
                message: 'Contact message saved successfully',
                id: contactMessage.id,
            },
            { status: 201 }
        );

    } catch (error) {
        console.error('Contact API Error:', error);
        
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
            message: 'Contact API is working' 
        },
        { status: 200 }
    );
}
