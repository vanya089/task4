export type UserType = {
    _id: string,
    username: string,
    email: string,
    password: string,
    registrationDate: string,
    lastLoginDate: string,
    status: string,
}

export interface UsersState {
    users: UserType[],
    status: Status,
    error: string | null,
}

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error',
}
