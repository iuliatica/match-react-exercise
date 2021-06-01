import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Movie } from '../data-type/movie';
import { GenreService } from '../service/genre.service';
import { MovieService } from '../service/movie.service';
import { TranslationService } from '../service/translation.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit, AfterViewInit {
  searchInputTitle: string = '';
  pageSource: MatTableDataSource<Movie> = new MatTableDataSource<Movie>();

  errorMessage: string = '';

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private movieService: MovieService, private genreService: GenreService, private translationService: TranslationService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.pageSource.paginator = this.paginator;
    this.pageSource.sort = this.sort;
    this.pageSource.filterPredicate = function (data, filter: string): boolean {
      const releaseYear = new Date(data.release_date).getFullYear();
      return releaseYear.toString().includes(filter) || data.firstGenre?.toLowerCase().includes(filter);
    };

  }

  searchMovieByTitle() {
    this.movieService.searchByTitle(this.searchInputTitle).subscribe(
      filteringResponse => {
        var movies = filteringResponse.results;
        movies.forEach(movie => {
          movie.firstGenre = this.genreService.getGenreById(movie.genre_ids[0])?.name
        })
        this.pageSource.data = movies
      },
      err => {
        this.errorMessage = this.translationService.getTranslation('movie.error.search_fail')
        setTimeout(() => {
          this.errorMessage = '';
        }, 3500);

      }
    );
  }

  applyFilter(filteringEvent: any) {
    var filterValue = filteringEvent.value
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.pageSource.filter = filterValue;
  }

}
