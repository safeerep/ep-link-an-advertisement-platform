export type signUpCredentials = {
    userName: string,
    email: string,
    phone?: number | string,
    password: string
}

export type signUpCredentialsWithOtp = signUpCredentials & {
    otp: number
}

export type signInCredentials = {
    email: string,
    password: string
}

export interface UserState {
    loading: boolean;
    data: any | null;
    error: string | null | undefined;
}
