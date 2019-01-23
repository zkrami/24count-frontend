import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from 'services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RepositoryGuard implements CanActivateChild {

  constructor(private authService : AuthService){

  }
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.user.repository();
  }
}
