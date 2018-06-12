import { Injectable } from "@angular/core"
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Region} from "./region.model"
import {AppUrl} from "app/appservice/AppUrl.services"

@Injectable()
export class HttpRegionService{
    
    constructor (private http: Http,private appUrl:AppUrl){
    }

    getRequestOptions(){
        
        const headers: Headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');
        let access_token=localStorage.getItem('id_token');
        let token = `Bearer ${access_token}`;
        headers.append('Authorization', token);

        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;

        return opts;
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || [];
    }

    getRegions(): Observable<any> {
        return this.http.get(this.appUrl.RootLocation+"region/regions").map(this.extractData);        
    }

    getRegion(Id:number){
        return this.http.get(this.appUrl.RootLocation+'region/region/'+Id).map(this.extractData);
    }

    postRegion(region: Region): Observable<any>  {
        return this.http.post(this.appUrl.RootLocation+'region/region', region , this.getRequestOptions());
    }

    deleteRegion(Id:number) {
        return this.http.delete(this.appUrl.RootLocation + 'region/region/'+ Id, this.getRequestOptions());
    }

    editRegion(region:Region) {
        return this.http.put(this.appUrl.RootLocation+'region/region/'+region.Id, region, this.getRequestOptions());
    }
}