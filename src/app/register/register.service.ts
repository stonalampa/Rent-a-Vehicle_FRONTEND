import { Injectable } from "@angular/core"
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {User} from "./user.model"
import {AppUrl} from "app/appservice/AppUrl.services"

@Injectable()
export class HttpRegisterService{
    
    constructor (private http: Http,private appUrl:AppUrl){
    }

    registerUser( user:any):Observable<any> {
    
        const headers: Headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');

        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;

        return this.http.post(this.appUrl.RootLocation+'account/Register', user , opts);
                    
    }
}