import { createTransport } from "../config/nodemailer.js";

export const sendVerificationEmail = async (userData) => {
    const transporter = createTransport(
        "sandbox.smtp.mailtrap.io",
        2525,
        "d0e16083c53773",
        "323db990eef951"
    );

    return await transporter.sendMail({
        from: '<producttraker@bitcoin.com>',
        to: userData.email,
        subject: "Verify your account ✔",
        text: "make a click to verify your account", // plain text body
        html: `
            <p>Please verify your account ${userData.email} so that you can enter to the control panel</p>
            <a href="http://localhost:4000/api/auth/verify/${userData.token}">Click to confirm account</a>
        `
    });
}