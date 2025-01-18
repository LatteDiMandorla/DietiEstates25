export interface Filters {
    type: string[];
    price: [number | undefined, number | undefined] | [];
    size: [number | undefined, number | undefined] | [];
    locals: [number | undefined, number | undefined] | [];
    bathrooms: string;
    others: string[];
}