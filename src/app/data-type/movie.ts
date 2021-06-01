export interface Movie {
    title: string,
    release_date: Date,
    genre_ids: number[],
    poster_path: string,
    firstGenre: string
}

export interface Genre {
    id: number,
    name: string
}

export interface APISerachingResponse {
    results: Movie[],
    total_pages:number,
    page:number
}

export interface APIGenderResponse{
    genres:Genre[];
}