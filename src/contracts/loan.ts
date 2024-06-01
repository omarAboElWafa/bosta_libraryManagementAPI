// "id" serial PRIMARY KEY,
//   "book_id" integer,
//   "identity_id" integer,
//   "checkout_date" timestamp,
//   "due_date" timestamp,
//   "returned_date" timestamp,
export interface ILoan {
    id?: number;
    book_id: number;
    identity_id: number;
    checkout_date: string;
    due_date: string;
    returned_date?: string;
}

export interface ILoanUpdate {
    book_id?: number;
    identity_id?: number;
    checkout_date?: string;
    due_date?: string;
    returned_date?: string;
}

export type TLoan = Omit<ILoan, "id">;
