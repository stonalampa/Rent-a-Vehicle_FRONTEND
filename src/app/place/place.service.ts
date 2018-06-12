import { Injectable } from "@angular/core"
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Place} from "./place.model"
import {AppUrl} from "app/appservice/AppUrl.services"

@Injectable()
export class HttpPlaceService{
    
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

    getPlaces(): Observable<any> {
        return this.http.get(this.appUrl.RootLocation+"place/places").map(this.extractData);        
    }

    getPlace(Id:number) {
        return this.http.get(this.appUrl.RootLocation+'place/place/'+Id).map(this.extractData);
    }

    postPlace(place: Place): Observable<any>  {
        return this.http.post(this.appUrl.RootLocation+'place/place', place , this.getRequestOptions());
    }

    deletePlace(Id:number) {
        return this.http.delete(this.appUrl.RootLocation + 'place/place/'+ Id, this.getRequestOptions());
    }

    editPlace(place:Place) {
        return this.http.put(this.appUrl.RootLocation+'place/place/'+place.Id, place, this.getRequestOptions());
    }
}