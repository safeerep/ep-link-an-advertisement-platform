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

export type User = {
    _id: string;
    userName: string;
    email: string;
    phone?: number;
    password: string;
    profilePhoto?: string;
    status: boolean;
    premiumMember: boolean;
    favouriteProducts?: string[];
    followers: string[];
    following: string[];
    blockedPersons: string[];
    subscription?: {
        policy: 'annual' | 'monthly';
        takenOn?: Date;
    };
    subscriptionAmount?: number;
    createdAt: Date;
    updatedAt: Date;
};

export type ReportedUser = {
    userId: string; 
    reports: {
        reportedBy: string; 
        reason: string;
    }[];
};