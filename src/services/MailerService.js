import hbs from 'nodemailer-express-handlebars';
import { transporter } from '../helpers/mailer.js';
import { config } from 'dotenv';
import { __dirname } from '../helpers/utils.js';
import { buildLogger } from '../helpers/logger.js';

config();

const logger = buildLogger('mailerService');

const handlebarOptions = {
    viewEngine: {
        extName: '.hbs',
        partialsDir: __dirname + '/views/partials',
        layoutsDir: __dirname + '/views/emails',
        defaultLayout: '',
    },
    viewPath: __dirname + '/views/emails',
    extName: '.hbs',
};


transporter.use('compile', hbs(handlebarOptions));

const sendEmail = async (email, subject, template, context) => {
    const mailOptions = {
        from: 'no-reply@ecodercommerce.com',
        to: email,
        subject: subject,
        template: template,
        context: context
    }

    try {
        const info = await transporter.sendMail(mailOptions);
        logger.debug(`Email enviado: ${info.messageId}`);
        return info;
    } catch (error){
        console.log(error);
        logger.error('Error al enviar email', error);
    }
    
}

export default sendEmail;