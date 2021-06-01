import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APIMovieResponse, APISerachingResponse, Movie } from '../data-type/movie';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiKey = environment.apiKey;
  constructor(private http: HttpClient) { }

  searchByTitle(searchInputTitle: string):Observable<APISerachingResponse> {
    searchInputTitle = encodeURIComponent(searchInputTitle);
    return this.http.get<APISerachingResponse>(`https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&language=en-US&query=${searchInputTitle}&include_adult=false`);
  }

  getMovieById(movieId: number): Observable<APIMovieResponse> {
    return this.http.get<APIMovieResponse>(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${this.apiKey}&language=en-US`)
  }
}
