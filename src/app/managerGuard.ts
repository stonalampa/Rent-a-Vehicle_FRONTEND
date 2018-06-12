import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()//This must be here, if we want to inject authService!
export class ManagerGuard implements CanActivate{
    
    private  role:string;

    constructor(){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        this.role=localStorage.getItem('role');

        if(this.role=="Manager"){
            return true;
        }
        
        return false;
    }
}


