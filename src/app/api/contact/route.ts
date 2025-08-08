import { NextRequest,NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function POST(req:NextRequest){
    try {
        const body= await req.json();
        const {name,email,subject,message}=body;

        if(!name || !email  || !message){
            return NextResponse.json({message:"All fields are required"},{status:400});
    }

    //email verification
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)){
        return NextResponse.json({message:"Please enter a valid email address"},{status:400});
    }
    const contactMessage=await prisma.contactMessage.create({
        data:{
            name:name.trim(),
            email:email.trim().toLowerCase(),
            subject:subject?.trim()||null,
            message:message.trim()
        }

    })
    return NextResponse.json(
      {
        success: true,
        message: 'Contact message saved successfully',
        id: contactMessage.id,
      },
      { status: 201 }
    );

    } catch (error) {
        console.log(error);
    }
}