import { Injectable } from "@angular/core"
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Vehicle} from './vehicle.model'
import {AppUrl} from "../appservice/AppUrl.services"

@Injectable()
export class HttpVehicleService{
    
    constructor (private http: Http,private appUrl:AppUrl){
    }

    getVehicles(): Observable<any> {
        return this.http.get(this.appUrl.RootLocation+"vehicle/vehicles").map(this.extractData);        
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || [];
    }

    getVehicle(Id:number){
        return this.http.get(this.appUrl.RootLocation+'vehicle/vehicle/'+Id).map(this.extractData);
    }

    postVehicle(vehicle: Vehicle): Observable<any>  {
        
        const headers: Headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('id_token'));


        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;

        return this.http.post(this.appUrl.RootLocation+'vehicle/vehicle', vehicle , opts);
    }

    deleteVehicle(Id:number){
        const headers: Headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('id_token'));


        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;

        return this.http.delete(this.appUrl.RootLocation + 'vehicle/vehicle/'+ Id,opts);
    }

    editVehicle(vehicle:Vehicle){

        const headers: Headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('id_token'));


        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;

        return this.http.put(this.appUrl.RootLocation+'vehicle/vehicle/'+vehicle.Id, vehicle , opts);
    }
    
    getLogoUrlForService(id:number):Observable<Response>{
        const headers: Headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-type', 'application/json');

        const opts: RequestOptions = new RequestOptions();
        opts.headers = headers;

        return this.http.get(this.appUrl.RootLocation+'vehicle/vehicle/logo/'+id , opts);
    }
}