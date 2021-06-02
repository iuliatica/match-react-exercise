import { Component, OnInit } from '@angular/core';
import { Movie } from '../data-type/movie';
import { GenreService } from '../service/genre.service';
import { LocalStorageService } from '../service/local-storage.service';
import { MovieService } from '../service/movie.service';

@Component({
  selector: 'app-favorite-movies',
  templateUrl: './favorite-movies.component.html',
  styleUrls: ['./favorite-movies.component.scss']
})
export class FavoriteMoviesComponent implements OnInit {
  public favoriteMovies: Movie[] = [];
  public dataLoaded: boolean = false;

  constructor(private localStorageService: LocalStorageService,
    private movieService: MovieService) { }

  ngOnInit(): void {
    this.getAllFavoriteMovies()
  }

  getAllFavoriteMovies() {
    this.favoriteMovies = []
    const favoriteMoviesIds = this.localStorageService.getFavoriteMovies();
    if(favoriteMoviesIds.length ===0){
      this.dataLoaded=true
    }
    favoriteMoviesIds?.forEach(
      movieId => {
        this.movieService.getMovieById(movieId).subscribe(
          movieResponse => {
            var movie = movieResponse as Movie;
            movie.firstGenre = movieResponse.genres[0].name;
            this.favoriteMovies.push(movie);
            this.dataLoaded = this.favoriteMovies.length === favoriteMoviesIds.length
          }
        )
      }
    )
  }
}
