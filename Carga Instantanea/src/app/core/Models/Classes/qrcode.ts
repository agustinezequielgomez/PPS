export interface QRCode {
    code: string;
    value: number;
}

export interface DataBaseDocumentQR {
    redeemedCodes: QRCodes;
}

export type QRCodes = QRCode[];
