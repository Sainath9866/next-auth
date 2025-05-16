import { connect } from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'
import { getDataFromToken } from '@/utils/getDataFromToken'
connect()
export async function POST(request : NextRequest) {
    const userId = getDataFromToken(request);

    const user = await User.findOne({_id : userId}).select("-password")
    if(!user) {
        return NextResponse.json({
            error : "User not found"
        })
    }
    return NextResponse.json({
        message : "User found",
        data : user
    })
}