export type signInCredentials = {
    email: string,
    password: string
}

export interface AdminState {
    loading: boolean;
    data: any | null;
    error: string | null | undefined;
}

export type checkBoxData = {
    label: string;
    options: string[];
}

export type radioButtonData = checkBoxData;