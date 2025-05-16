"use client"
import { useEffect, useState } from "react"
import axios from "axios";

export default function VerifyEmail() {
   
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false)

    const verifyUserEmail = async () => {
        try {
            await axios.post("/api/users/verifyemail", { token })
            setVerified(true)
        } catch (error: any) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1]
        setToken(urlToken || "")
    }, [])

    useEffect(() => {
        if (token.length > 0) {
            verifyUserEmail()
        }
    }, [token])

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="p-6 py-[10px] rounded-lg shadow-md w-full max-w-lg bg-gray-900 overflow-auto ">
                <h1 className="px-[100px]">verify email</h1>
                <h2 className=""> {token ? `${token}` : "no token"} </h2>
                <div> 
                    {
                        verified && (
                            <div>
                               <h2>Verified</h2>
                            </div>
                        )
                    }
                </div>

            </div>
        </div>
    )
}