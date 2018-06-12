import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Accommodation } from "app/accomodation/accommodation.model";
import {AppUrl} from "app/appservice/AppUrl.services"
@Injectable()
export class FilterService {
    constructor(private http: Http, private rootURL: AppUrl) { }

    filterAccommodations(filterString:string): Observable<any> {
        const headers: Headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');
        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;
        console.log(this.rootURL.RootLocation + filterString);
        return this.http.get(this.rootURL.RootLocation + filterString, opts).map(this.extractData);


    }

     private extractData(res: Response) {
        return res.json().value;
    }
}