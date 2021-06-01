import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  static FAVORITE_IDS = 'fav_movies'

  constructor() { }

  addRemoveFavorite(movieId: number): boolean {
    var favoriteMoviesIds = this.getFavoriteMovies();

    if (!favoriteMoviesIds) {
      favoriteMoviesIds = [];
    }

    if (this.checkIfFavorite(movieId)) {
      console.log(favoriteMoviesIds.indexOf(movieId))
      favoriteMoviesIds.splice(favoriteMoviesIds.indexOf(movieId), 1)
      this.setDataLocal(LocalStorageService.FAVORITE_IDS, JSON.stringify(favoriteMoviesIds));
      return false;
    }
    favoriteMoviesIds.push(movieId);
    this.setDataLocal(LocalStorageService.FAVORITE_IDS, JSON.stringify(favoriteMoviesIds));
    return true;

  }
  checkIfFavorite(movieId: number) {
    var favoriteMoviesIds = this.getFavoriteMovies();
    return favoriteMoviesIds?.includes(movieId)
  }

  getFavoriteMovies() {
    return JSON.parse(this.getDataLocal(LocalStorageService.FAVORITE_IDS)) as number[];
  }

  private getDataLocal(key: string): any {
    return localStorage.getItem(key);
  }

  private setDataLocal(key: string, value: string): any {
    localStorage.setItem(key, value)
  }
}
