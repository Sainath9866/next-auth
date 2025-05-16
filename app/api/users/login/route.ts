import { connect } from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"
connect()
export async function POST(request : NextRequest) {
    try {
        
        const reqBody = await request.json();
        const {email , password} = reqBody

        const user = await User.findOne({email : email})
        if(!user){
            return NextResponse.json({error : "User doesn't exists"})
        }
        const hashedPassword = user.password
        const isMatch = await bcrypt.compare(password, hashedPassword);

        if (!isMatch) {
            console.log("❌ Invalid password");
            return NextResponse.json({error : "Invalid password"})
        }

        const tokenData = {
            id : user._id,
            username : user.username,
            email : user.email
        }

        const jwt_token = jwt.sign(tokenData, process.env.JWT_CODE!, {expiresIn : '1d'})
        
        const response = NextResponse.json({
            message : "Signed in successfully",
            jwt_token : jwt_token
        })

        response.cookies.set("token" , jwt_token, {
            httpOnly : true
        })

        return response

    } catch (error : any) {
        return NextResponse.json({
            error : error.message
        })
    }

   
}