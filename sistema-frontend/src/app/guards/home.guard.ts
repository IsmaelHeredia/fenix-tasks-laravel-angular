import { Inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SecurityService } from '../services/auth/security.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanActivate {
  constructor(
    private securityService: SecurityService,
    private router: Router
  ) { }

  canActivate(): boolean {
    return this.checkAuth();
  }

  private checkAuth(): boolean {

    let isSessionStorageAvailable = typeof sessionStorage !== 'undefined';

    if (isSessionStorageAvailable) {

      const token = sessionStorage.getItem(environment.sessionName);

      if (!token) {
        return true;
      } else {

        if (token) {

          const datos = {
            token: token
          };

          if (this.securityService.validate(datos)) {
            this.router.navigate(['/dashboard/home']);
            return false;
          } else {
            return true;
          }

        } else {
          return true;
        }
      }
    } else {
      return true;
    }
  }
}