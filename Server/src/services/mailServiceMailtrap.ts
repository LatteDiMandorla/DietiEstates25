import { MailService } from "./interfaces/mailService";
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

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

    public async sendChangePasswordMail(email: string, token: string, callback: string) {
        try {
            const info = await this.transporter.sendMail({
              from: `"DietiEstates" <${process.env.GMAIL_USER}>`, // mittente
              to: email, // destinatario (puoi usare un indirizzo a tua scelta per il test)
              subject: 'Change Password', // oggetto
              text: "Questa è una email per cambiare la password", // corpo del messaggio
              html: `
                <h2>Ciao!</h2>
                <p>Per favore, clicca sul bottone qui sotto per cambiare la tua password:</p>
                <button onclick="window.location.href='${callback}?code=${token}';"
                        style="padding: 10px 20px; background-color: #4CAF50; color: white; border: none; font-size: 16px; cursor: pointer; border-radius: 5px;">
                    Verifica il tuo account
                </button>
                <p>oppure incolla il seguente link direttamente nel tuo browser: </p>
                <p>${callback}?code=${token}</p>

                <p>Grazie per aver scelto il nostro servizio!</p>
                <p>Se non hai richiesto il cambio della password, ignora la seguente email</p>
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

    public async sendVerificationMail(email: string, token: string, callback: string): Promise<void> {
        try {
            const info = await this.transporter.sendMail({
              from: `"DietiEstates" <${process.env.GMAIL_USER}>`, // mittente
              to: email, // destinatario (puoi usare un indirizzo a tua scelta per il test)
              subject: 'Verification Email', // oggetto
              text: "Questa è una email di conferma per l'account!", // corpo del messaggio
              html: `
                <h2>Ciao!</h2>
                <p>Per favore, clicca sul bottone qui sotto per completare la verifica del tuo account:</p>
                <button onclick="window.location.href='${callback}?code=${token}';"
                        style="padding: 10px 20px; background-color: #4CAF50; color: white; border: none; font-size: 16px; cursor: pointer; border-radius: 5px;">
                    Verifica il tuo account
                </button>
                <p>oppure incolla il seguente link direttamente nel tuo browser: </p>
                <p>${callback}?code=${token}</p>

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

    public async sendAgentAppointmentMail(email: string): Promise<void> {
        try {
            const info = await this.transporter.sendMail({
            from: `"DietiEstates" <${process.env.GMAIL_USER}>`, // mittente
            to: email, // destinatario (puoi usare un indirizzo a tua scelta per il test)
            subject: 'Appuntamento prenotato', // oggetto
            text: "Un utente ha prenotato un appuntamento di vistia per un tuo immobile", // corpo del messaggio
            html: `
                <h2>Ciao!</h2>
                <p>Un utente ha appena prenotato un appuntamento il ... per una visita al tuo appartamento</p>

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