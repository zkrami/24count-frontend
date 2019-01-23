import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivateChild} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from 'services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PharmacistGuard implements CanActivateChild {

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.user.pharmacist();
  }
  constructor(private authService : AuthService){

  }
}
