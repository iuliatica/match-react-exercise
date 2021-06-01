import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  static FAVORITE_IDS = 'fav_movies'

  constructor() {}

  addRemoveFavorite(movieId: number): boolean {
    var favoriteMoviesIds = JSON.parse(this.getDataLocal(LocalStorageService.FAVORITE_IDS)) as number[];

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
    var favoriteMoviesIds = this.getDataLocal(LocalStorageService.FAVORITE_IDS) as number[];
    return favoriteMoviesIds?.includes(movieId)
  }

  private getDataLocal(key: string): any {
    return localStorage.getItem(key);
  }

  private setDataLocal(key: string, value: string): any {
    localStorage.setItem(key, value)
  }
}
