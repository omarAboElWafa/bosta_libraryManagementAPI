export interface IUser {
    id: string
    name: string
    email: string
    password: string,
    phone?: string,
    type?: string
    registered_date: string
}


export interface IUserUpdate {
    name?: string
    email?: string
    password?: string,
    phone?: string,
    type?: string
    registered_date?: string
}