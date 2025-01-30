import { MailService } from "./interfaces/mailService";
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

export class MailServiceGmail implements MailService {
    private transporter: ReturnType<typeof nodemailer.createTransport>;
    
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASSWORD
            }
        });
    }

    private generateVerifyToken(email: string) : string {
        const verifyToken = jwt.sign({email}, process.env.JWT_VERIFY_TOKEN_SECRET || "4321", {
            expiresIn: process.env.JWT_VERIFY_EXPIRES_IN || "30m",
        });
        console.log(verifyToken);

        return verifyToken;
    }

    public async sendVerificationMail(email: string, verificationCallback: string): Promise<void> {
        try {
            const token = this.generateVerifyToken(email);

            const info = await this.transporter.sendMail({
              from: `"DietiEstates" <${process.env.GMAIL_USER}>`, // mittente
              to: email, // destinatario (puoi usare un indirizzo a tua scelta per il test)
              subject: 'Verification Email', // oggetto
              text: "Questa è una email di conferma per l'account!", // corpo del messaggio
              html: `
                <h2>Ciao!</h2>
                <p>Per favore, clicca sul bottone qui sotto per completare la verifica del tuo account:</p>
                <button onclick="window.location.href='${verificationCallback}?code=${token}';"
                        style="padding: 10px 20px; background-color: #4CAF50; color: white; border: none; font-size: 16px; cursor: pointer; border-radius: 5px;">
                    Verifica il tuo account
                </button>
                <p>oppure incolla il seguente link direttamente nel tuo browser: </p>
                <p>${verificationCallback}?code=${token}</p>

                <p>Grazie per aver scelto il nostro servizio!</p>
                <footer>
                <p style="font-size: 12px; color: #888;">Questo è un messaggio automatico. Non rispondere a questa email.</p>
                </footer>
            `
            });
        
            console.log('Email inviata');
            return;
        } catch (error) {
            return Promise.reject(error);
        }
    }
}