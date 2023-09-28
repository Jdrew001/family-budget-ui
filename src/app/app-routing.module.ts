import { NgModule, inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, PreloadAllModules, Router, RouterModule, Routes, UrlTree } from '@angular/router';
import { Observable, take, tap } from 'rxjs';
import { AuthService } from './core/services/auth.service';
import { NavController } from '@ionic/angular';

const isAuthenticated = (): | boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> => {
  const authService = inject(AuthService);
  const navController = inject(NavController);
  return authService.isAuthenticated$.pipe(
      take(1),
      tap((isAuthenticated: boolean) => {
          if (!isAuthenticated) {
            navController.navigateRoot('/signin', { replaceUrl:true });
          }
      }),
  );
}

const canMatch:CanMatchFn = isAuthenticated;

const routes: Routes = [
  {
    path: 'signin',
    loadChildren: () => import('./auth/signin/signin.module').then( m => m.SigninPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./auth/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'summary',
    loadChildren: () => import('./summary/summary.module').then( m => m.SummaryPageModule),
    canLoad: [canMatch],
  },
  {
    path: '',
    redirectTo: 'summary',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
