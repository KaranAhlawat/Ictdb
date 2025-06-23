import type { Config } from 'ziggy-js';

export interface Auth {
    user: User | undefined;
}

interface Ziggy extends Config {
    location: string;
}

export interface SharedData {
    auth: Auth;
    ziggy: Ziggy;
    flash: {
        message: string | undefined;
        type: string | undefined;
    };
    url: string;

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

export interface Link {
    active: boolean;
    label: string;
    url: string | null;
}

export interface PaginationInfo {
    links: Link[];
    next_page_url: string | null;
    prev_page_url: string | null;
}

export interface PaginationData<T> extends PaginationInfo {
    data: T[];
}
