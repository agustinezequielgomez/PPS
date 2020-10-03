import { Type } from '@angular/core';

export interface User {
    email: string;
    password: string;
    role: string;
}

export type Users = User[];
