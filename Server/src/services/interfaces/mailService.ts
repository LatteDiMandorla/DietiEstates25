export interface MailService {
    sendVerificationMail(email: string, verificationCallback: string): Promise<void>;
}