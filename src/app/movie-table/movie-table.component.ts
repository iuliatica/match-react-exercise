import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Movie } from '../data-type/movie';
import { LocalStorageService } from '../service/local-storage.service';

@Component({
  selector: 'app-movie-table',
  templateUrl: './movie-table.component.html',
  styleUrls: ['./movie-table.component.scss']
})
export class MovieTableComponent implements OnInit, AfterViewInit {
  pageSource: MatTableDataSource<Movie> = new MatTableDataSource<Movie>();
  @Input() movies: Movie[] = [];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private localStorage: LocalStorageService) { }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['movies'].currentValue !== []) {
      this.pageSource.data = changes['movies'].currentValue
    }
  }
  ngAfterViewInit() {
    this.pageSource.paginator = this.paginator;
    this.pageSource.sort = this.sort;
    this.pageSource.filterPredicate = function (data, filter: string): boolean {
      const releaseYear = new Date(data.release_date).getFullYear();
      return releaseYear.toString().includes(filter) || data.firstGenre?.toLowerCase().includes(filter);
    };
  }

  applyFilter(filteringEvent: any) {
    var filterValue = filteringEvent.value
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.pageSource.filter = filterValue;
  }

  checkIfFavorite(movieId: number) {
    return this.localStorage.checkIfFavorite(movieId);
  }

  addRemoveFavorite(movieId: number) {
    this.localStorage.addRemoveFavorite(movieId);
  }

}
