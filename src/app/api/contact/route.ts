// app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';

// Initialize Prisma client
const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, email, subject, message } = body;

        // Validation
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

        // Save to database
        const contactMessage = await prisma.contactMessage.create({
            data: {
                name: name.trim(),
                email: email.trim().toLowerCase(),
                subject: subject?.trim() || null,
                message: message.trim()
            }
        });

        console.log('Contact message saved:', contactMessage.id);

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
    } finally {
        await prisma.$disconnect();
    }
}

export async function GET() {
    try {
        // Test database connection
        const count = await prisma.contactMessage.count();
        return NextResponse.json(
            { 
                success: true, 
                message: 'Contact API is working',
                totalMessages: count
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
