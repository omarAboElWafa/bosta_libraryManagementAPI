export interface IUser {
    id: string
    firstName: string
    lastName: string
    email: string
    password: string,
    phone?: string,
    type?: string
}


export interface IUserUpdate {
    firstName?: string
    lastName?: string
    email?: string
    password?: string,
    phone?: string,
    type?: string
}