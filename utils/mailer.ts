import nodemailer from "nodemailer"
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
export const sendMail = async ({ email, emailType, userId }: any) => {
    try {
        const token = await bcrypt.hash(userId.toString(), 10);
        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, { verifyToken: token, verifyTokenExpiry: Date.now() + 3600000 })
        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId, { forgotPasswordToken: token, forgotPasswordTokenExpiry: Date.now() + 3600000 })
        }

        // Looking to send emails in production? Check out our Email API/SMTP product!
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "87f047f7407bb2",
                pass: "0e99a40ecfe6d6"
            }
        });

        const mailOptions = {
            from: 'cvsainath9866@gmail.com',
            to: email,
            subject: emailType === 'VERIFY' ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?Token=${token}"> here </a>  to ${emailType === "VERIFY" ? "Verify your email" : "Reset your password"}
             or copy and paste the link in your browser <br>${process.env.DOMAIN}/verifyemail?Token=${token} </p>` 
        }

        const mailResponse = await transport.sendMail(mailOptions)
        return mailResponse
    } catch (error: any) {
        throw new Error(error.message)
    }

}

