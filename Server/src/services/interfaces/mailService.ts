export interface MailService {
    sendVerificationMail(email: string, token: string, callback: string): Promise<void>;
    sendChangePasswordMail(email: string, token: string, callback: string): Promise<void>;
    sendAgentAppointmentMail(email: string): Promise<void>;
    // sendUserAppointmentMail(email: string): Promise<void>;
}