import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, email, subject, message } = body;

        // Validation
        if (!name || !email || !message) {
            return NextResponse.json(
                { success: false, message: "Name, email, and message are required" },
                { status: 400 }
            );
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { success: false, message: "Please enter a valid email address" },
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