import { MailService } from "./interfaces/mailService";
import nodemailer from 'nodemailer';

export class MailServiceMailtrap implements MailService {
    private transporter: ReturnType<typeof nodemailer.createTransport>;
    
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: 'sandbox.smtp.mailtrap.io',
            port: 2525,
            auth: {
                user: process.env.MAILTRAP_USER,
                pass: process.env.MAILTRAP_PASSWORD
            }
        });
    }

    private generateRandomString(length: number): string {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let code = '';
        for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          code += characters[randomIndex];
        }
        return code;
    }

    public async sendVerificationMail(email: string, verificationCallback: string): Promise<void> {
        try {
            const token = this.generateRandomString(10);
            

            const info = await this.transporter.sendMail({
              from: '"Leo Cucurachi" <staff@dietiestates.com>', // mittente
              to: email, // destinatario (puoi usare un indirizzo a tua scelta per il test)
              subject: 'Test email', // oggetto
              text: 'Questa è una email di test inviata tramite Mailtrap!', // corpo del messaggio
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
        
            console.log('Email inviata: ', info.messageId);
            return;
        } catch (error) {
            return Promise.reject(error);
        }
    }
}