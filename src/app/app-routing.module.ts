import { NgModule, inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, PreloadAllModules, Router, RouterModule, Routes, UrlTree } from '@angular/router';
import { Observable, take, tap } from 'rxjs';
import { AuthService } from './core/services/auth.service';
import { NavController } from '@ionic/angular';
import { SigninPage } from './auth/signin/signin.page';
import { SignupPage } from './auth/signup/signup.page';

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
    component: SigninPage
  },
  {
    path: 'signup',
    component: SignupPage
  },
  {
    path: '',
    redirectTo: 'tabs',
    pathMatch: 'full'
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'manage-transaction',
    loadChildren: () => import('./manage-transaction/manage-transaction.module').then( m => m.ManageTransactionPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
