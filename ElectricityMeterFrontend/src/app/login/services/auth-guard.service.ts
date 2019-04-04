import { Injectable } from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { AuthService } from './auth.service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthGuardService implements CanActivate {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }

  constructor(public auth: AuthService, public router: Router) { }

}
