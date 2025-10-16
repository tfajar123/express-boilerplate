import nodemailer from 'nodemailer';
import config from '../../config/config';

const transporter = nodemailer.createTransport({
    host: config.nodemailerHost,
    port: 587,
    secure: false,
    auth: {
        user: config.nodemailerUser,
        pass: config.nodemailerPassword
    }
});

const sendEmail = async (
    to: string,
    subject: string,
    text: string,
    html: string
) => {
    try {
        const info = await transporter.sendMail({
            from: '"Admin" <admin@localhost>',
            to,
            subject,
            text,
            html
        });
        console.log('Message sent: %s', info.response);
    } catch (err) {
        console.log("Error: ", err);
    }
};

export { sendEmail };