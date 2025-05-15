
import { connect } from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { sendMail } from '@/utils/mailer'

connect()

export async function POST(request: NextRequest) {
    try {

        const reqBody = await request.json()
        const { username, email, password } = reqBody
        console.log(reqBody)

        const existinguser = await User.findOne({ email })

        if (existinguser) {
            return NextResponse.json({
                message: "User already exists"
            }, { status: 400 })
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const savedUser = await User.create({
            username,
            email,
            password: hashedPassword
        })

        try {
            await sendMail({ email, emailType: "VERIFY", userId: savedUser._id });
        } catch (mailError) {
            console.error("Error sending mail:", mailError);
            // Optional: delete the savedUser if mail fails
        }

        return NextResponse.json({
            message: "User Registered Successfully",
            success: true,
            savedUser
        })


    } catch (error: any) {
        return NextResponse.json({
            message: error.message
        })
    }
}