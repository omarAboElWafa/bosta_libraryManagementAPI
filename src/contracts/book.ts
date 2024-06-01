export interface IBook {
    id: number
    title: string
    author: string
    isbn: string
    available_quantity: number
    shelf_location: string
}

export interface IBookUpdate {
    title?: string
    author?: string
    isbn?: string
    available_quantity?: number
    shelf_location?: string
}

export type TBook = Omit<IBook, 'id'>;