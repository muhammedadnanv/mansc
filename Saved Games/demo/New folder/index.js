// SecureDispatch.js

const nodemailer = require('nodemailer');

/**
 * Generate a one-time 4-digit number
 * @returns {number} The generated OTP
 */
function generateOTP() {
    return Math.floor(1000 + Math.random() * 9000);
}

/**
 * Send a one-time code via email
 * @param {string} email - The recipient's email address
 * @param {string} senderEmail - The sender's email address
 * @param {string} senderPassword - The sender's email password
 * @returns {Promise<number>} A promise that resolves with the generated OTP
 * @throws {Error} If sending the OTP fails
 */
async function sendOTP(email, senderEmail, senderPassword) {
    try {
        // Create an SMTP transporter
        let transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: senderEmail,
                pass: senderPassword
            }
        });

        // Generate the one-time code
        const otp = generateOTP();

        // Email content
        let mailOptions = {
            from: senderEmail,
            to: email,
            subject: 'Your One-Time Code',
            text: `Your one-time code is: ${otp}`
        };

        // Send email
        let info = await transporter.sendMail(mailOptions);
        console.log("One-time code sent: %s", info.messageId);
        return otp;
    } catch (error) {
        console.error("Error sending email:", error);
        throw new Error("Failed to send OTP");
    }
}

module.exports = sendOTP;
