import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavoriteMoviesComponent } from './favorite-movies/favorite-movies.component';
import { MovieComponent } from './movie/movie.component';

const routes: Routes = [
  { path: '', component: MovieComponent },
  { path: 'favorite', component: FavoriteMoviesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
