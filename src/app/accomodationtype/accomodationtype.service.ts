import { Injectable } from "@angular/core"
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {AccomodationType} from "./accomodationtype.model"
import {AppUrl} from "app/appservice/AppUrl.services"

@Injectable()
export class HttpAccomodationTypeService{
    
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

    getAccomodationTypes(): Observable<any> {
        return this.http.get(this.appUrl.RootLocation+"accomodationType/accTypes").map(this.extractData);        
    }

    getAccomodationType(Id:number) {
        return this.http.get(this.appUrl.RootLocation+'accomodationType/accType/'+Id).map(this.extractData);
    }

    postAccomodationType(accomodationType: AccomodationType): Observable<any>  {
        return this.http.post(this.appUrl.RootLocation+'accomodationType/accType', accomodationType , this.getRequestOptions());
    }

    deleteAccomodationType(Id:number) {
        return this.http.delete(this.appUrl.RootLocation + 'accomodationType/accType/'+ Id, this.getRequestOptions());
    }

    editAccomodationType(accomodationType:AccomodationType) {
        return this.http.put(this.appUrl.RootLocation+'accomodationType/accType/'+accomodationType.Id, accomodationType, this.getRequestOptions());
    }
}