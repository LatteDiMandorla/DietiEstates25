export interface Immobile {
    title: string;
    street: string;
    size: string;
    bathrooms: string;
    locals: string;
    agentImage: string; 
    price: string;
    images: string[];
    lat: number;
    lon: number;
    tags?: string[];
}

export interface Filters {
    type: string[];
    price: [number | undefined, number | undefined] | [];
    size: [number | undefined, number | undefined] | [];
    locals: [number | undefined, number | undefined] | [];
    bathrooms: string;
    others: string[];
}

export interface ReviewComponents
{
    UserImage?: string;
    TotalPoint: number;
    NameAndSurname: string;
    ReviewTitle: string;
    Text: string;
}