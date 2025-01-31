export interface MailService {
    sendVerificationMail(email: string, verificationCallback: string): Promise<void>;
    // sendAgentAppointmentMail(email: string): Promise<void>;
    // sendUserAppointmentMail(email: string): Promise<void>;
}