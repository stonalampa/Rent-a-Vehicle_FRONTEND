import { Injectable } from "@angular/core"
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {AppUrl} from "app/appservice/AppUrl.services";
import { Router } from '@angular/router';

@Injectable()
export class HttpAuthenticationService{
    
    public loggedIn:boolean;

    constructor (private http: Http,
                 private appUrl:AppUrl,
                 private router:Router){
                    this.loggedIn=false;
    }

    login(username:string,password:string){
        return this.http.post(this.appUrl.RootLocation+'oauth/token',`username=${username}&password=${password}&grant_type=password`)
    }

    logout(){
        const headers: Headers = new Headers();
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('id_token'));
        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;

        return this.http.post(this.appUrl.RootLocation + 'Account/Logout', null,opts);
    }

}