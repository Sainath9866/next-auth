"use client"
import axios from "axios";
import { use, useEffect, useState } from "react";
import toast, { Toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function SignUpPage() {
    const router = useRouter()
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: ""
    })
    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [loading, setLoading] = useState(false)

    const onsignup = async () => {
        try {
            setLoading(true)
            const response = await axios.post("/api/users/signup", user);
            console.log("Signup success", response.data)
            router.push('/login')
        } catch (error: any) {
            toast.error(error.message)
        }
    }
    useEffect(() => {
        if (user.username.length > 0 && user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false)
        }
        else {
            setButtonDisabled(true);
        }
    }, [user])

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="p-6 rounded-lg shadow-md w-full max-w-sm bg-gray-900 ">
                <input
                    value={user.username}
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                    className="w-full px-4 py-3 mb-3 border border-gray-500 rounded"
                    type="text"
                    placeholder="username" />
                <input
                    type="text"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    className="w-full px-4 py-3 mb-3 border border-gray-500 rounded focus:outline-none focus:ring-2 focus:ring:blue-500"
                    placeholder="email" />
                <input
                    type="password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    className="w-full px-4 py-3 mb-3 border border-gray-500 rounded focus:outline-none focus:ring-2 focus:ring:blue-500"
                    placeholder="password" />
                <button onClick={onsignup} className="bg-green-600 hover:bg-green-700 cursor-pointer text-white font-semibold py-2.5 px-4 rounded mx-[120px] mt-[30px]" >
                    {buttonDisabled ? "No Signup" : "Signup"}
                </button>
                <Link
                    className="m-25"
                    href={"/login"}> visit login page</Link>
            </div>
        </div>
    )
}