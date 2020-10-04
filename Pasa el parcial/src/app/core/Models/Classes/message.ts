export interface Message {
    message: string;
    sentBy: string;
    sentAt: string;
}

export type Messages = Message[];

export interface ChatDB {
    messages: Messages;
}