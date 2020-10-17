import nodemailer from 'nodemailer';


const email = 'proyecto.integrador2.2020@gmail.com';

export default nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: email,
        pass: 'integrador123'
    }
});

export const mailOptions = (user) => {
    return {
        from: email,
        to: user.email,
        subject: 'Gracias por registrarte!!',
        html: `<h4>Hola, ${user.names}!!<h4>
            <p>Tu registro se efectuó satisfactoriamente</p>
            <p>Tu código de acceso fue generado y es el siguiente: <strong>${user.accessCode}</strong></p><br>
            <p>Espera la aceptación de un administrador para que puedas ingresar</strong></p>
        `
    }
}