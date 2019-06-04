import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log('DO WE HAVE TOKEN:', this.authService.isAuthenticated());
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/auth/signin']);
    }
    return this.authService.isAuthenticated();
  }

}

