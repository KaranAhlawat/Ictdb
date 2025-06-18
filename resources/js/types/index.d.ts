import type { Config } from 'ziggy-js';

export interface Auth {
    user: User | undefined;
}

export interface SharedData {
    auth: Auth;
    ziggy: Config & { location: string };
    flash: {
        message: string | undefined;
        type: string | undefined;
    };
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}
