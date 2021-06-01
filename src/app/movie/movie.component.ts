import { Component, OnInit } from '@angular/core';
import { Movie } from '../data-type/movie';
import { GenreService } from '../service/genre.service';
import { MovieService } from '../service/movie.service';
import { TranslationService } from '../service/translation.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
  searchInputTitle: string = '';
  movies!: Movie[];
  errorMessage: string = '';

  constructor(private movieService: MovieService,
    private genreService: GenreService,
    private translationService: TranslationService) { }

  ngOnInit(): void {}

  searchMovieByTitle() {
    this.movieService.searchByTitle(this.searchInputTitle).subscribe(
      filteringResponse => {
        this.movies = filteringResponse.results;
        this.movies.forEach(movie => {
          movie.firstGenre = this.genreService.getGenreById(movie.genre_ids[0])?.name
        })
      },
      () => {
        this.errorMessage = this.translationService.getTranslation('movie.error.search_fail')
        setTimeout(() => {
          this.errorMessage = '';
        }, 3500);

      }
    );
  }

}
