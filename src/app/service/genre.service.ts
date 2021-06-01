import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIGenderResponse, Genre } from '../data-type/movie';
import { environment } from './../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class GenreService {
  private apiKey = environment.apiKey;
  genres: Genre[];
  constructor(private http: HttpClient) {
    this.genres = [];
    this.getAllGenre().subscribe(
      response => {
        this.genres = response.genres;
      }
    )

  }

  private getAllGenre(): Observable<APIGenderResponse> {
    return this.http.get<APIGenderResponse>(`https://api.themoviedb.org/3/genre/movie/list?api_key=${this.apiKey}&language=en-US`);
  }

  getGenreById(id: number): Genre {
    return this.genres.find(genre => genre.id === id)!;
  }
}
