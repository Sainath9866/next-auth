'use client'
import { useEffect, useState } from "react"
import axios from "axios"
export default function Profile() {
    const [data, setData] = useState<{ username: string, email: string } | null>(null);
    const [logouttrue, setLogouttrue] = useState(false)
    const userData = async () => {
       try {
         const res = await axios.post("/api/users/me");
         setData(res.data.data)
       } catch (error : any) {
         console.log(error.message)
       }
    }
    useEffect(() => {
        userData()
    }, [])

    const logout = async() => {
        try {
            await axios.get("api/users/logout")
            setLogouttrue(true)
            console.log("Logout successful")
        } catch (error : any) {
            console.log(error.message)
        }
    }
    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="p-6 rounded-lg shadow-md w-full max-w-sm bg-gray-900 ">
                {
                    data ? (
                        <>
                            <h2 className="text-xl font-bold mb-2">Profile</h2>
                            <p><strong>Username:</strong> {data.username}</p>
                            <p><strong>Email:</strong> {data.email}</p>
                            <button onClick={logout} className="bg-green-500 m-3 p-3 rounded cursor-pointer">Logout</button>
                             <div className=""> {logouttrue ? "Logout success" : ""}</div>
                        </>
                    ) : (
                        <p> Loading...</p>
                    )
                }
            </div>
        </div>
    )
}