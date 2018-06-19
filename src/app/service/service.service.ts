import { Injectable } from "@angular/core"
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Service} from "./service.model"
import {AppUrl} from "../appservice/AppUrl.services"

@Injectable()
export class HttpServiceService{
    
    constructor (private http: Http,private appUrl:AppUrl){
    }

    getServices(): Observable<any> {
        return this.http.get(this.appUrl.RootLocation+"service/services").map(this.extractData);        
    }


    private extractData(res: Response) {
        let body = res.json();
        return body || [];
    }

    getUserByUsername(username:string){
        return this.http.get(this.appUrl.RootLocation+'appUser/appUsers/'+ username).map(this.extractData);
    }

    getService(Id:number){
        return this.http.get(this.appUrl.RootLocation+'service/service/'+Id).map(this.extractData);
    }

    getLogoUrlForService(id:number):Observable<Response>{
        const headers: Headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');

        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;

        return this.http.get(this.appUrl.RootLocation+'service/service/logo/'+id , opts);
    }

    postService(service: Service): Observable<any>  {
        
        const headers: Headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('id_token'));
        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;

        return this.http.post(this.appUrl.RootLocation+'service/service', service , opts);
    }

    deleteService(Id:number){
        const headers: Headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('id_token'));
        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;

        return this.http.delete(this.appUrl.RootLocation + 'service/service/'+ Id,opts);
    }

    editService(service:Service){

        const headers: Headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('id_token'));

        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;

        return this.http.put(this.appUrl.RootLocation+'service/service/'+service.Id, service, opts);
    }

    
}