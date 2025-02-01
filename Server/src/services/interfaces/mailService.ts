export interface MailService {
    sendVerificationMail(email: string, verificationCallback: string): Promise<void>;
    sendChangePasswordMail(email: string, role: string, verificationCallback: string): Promise<void>;
    sendAgentAppointmentMail(email: string): Promise<void>;
    // sendUserAppointmentMail(email: string): Promise<void>;
}