export interface Movie {
    id: number,
    title: string,
    release_date: Date,
    poster_path: string,
    genre_ids: number[],
    firstGenre: string;
}

export interface Genre {
    id: number,
    name: string
}

export interface APISerachingResponse {
    results: Movie[],
    total_pages: number,
    page: number
}
export interface APIMovieResponse extends Movie {
    genres: Genre[]
}
export interface APIGenderResponse {
    genres: Genre[];
}