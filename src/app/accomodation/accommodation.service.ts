import { Injectable } from "@angular/core"
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Accommodation} from "./accommodation.model"
import {AppUrl} from "app/appservice/AppUrl.services"

@Injectable()
export class HttpAccommodationService{
    
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

    getAccommodations(): Observable<any> {
        return this.http.get(this.appUrl.RootLocation+"acc/accs").map(this.extractData);        
    }

    getManagerAccommodations(username:string): Observable<any>{
        return this.http.get(this.appUrl.RootLocation+"acc/accsmanager/"+username,this.getRequestOptions()).map(this.extractData);
    }

    getUserByUsername(username:string){
        return this.http.get(this.appUrl.RootLocation+'appUser/appUsers/'+ username).map(this.extractData);
    }

    getAccommodation(Id:number){
        return this.http.get(this.appUrl.RootLocation+'acc/acc/'+Id).map(this.extractData);
    }

    getImageUrlForAccommodation(id:number):Observable<Response> {
        return this.http.get(this.appUrl.RootLocation+'acc/acc/image/'+id , this.getRequestOptions());
    }

    postAccommodation(accommodation: Accommodation): Observable<any>  {
        return this.http.post(this.appUrl.RootLocation+'acc/acc', accommodation , this.getRequestOptions());
    }

    deleteAccommodation(Id:number){
        return this.http.delete(this.appUrl.RootLocation + 'acc/acc/'+ Id,this.getRequestOptions());
    }

    editAccommodation(accommodation:Accommodation) {
        return this.http.put(this.appUrl.RootLocation+'acc/acc/'+accommodation.Id, accommodation, this.getRequestOptions());
    }

     approveAccommodation(accomodation_id: number) {
        return this.http.put(this.appUrl.RootLocation + 'acc/approve/' + accomodation_id, {} , this.getRequestOptions());
    }

    banAccommodation(accomodation_id: number) {
        return this.http.put(this.appUrl.RootLocation + 'acc/ban/' + accomodation_id, {} ,this.getRequestOptions());
    }
}