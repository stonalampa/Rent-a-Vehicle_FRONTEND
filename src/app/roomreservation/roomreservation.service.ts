import { Injectable } from "@angular/core"
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {RoomReservation} from "./roomreservation.model"
import {AppUrl} from "app/appservice/AppUrl.services"

@Injectable()
export class HttpRoomReservationService{
    
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

    getRoomsReservations(): Observable<any> {
        return this.http.get(this.appUrl.RootLocation+"roomReservation/roomReservations").map(this.extractData);        
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || [];
    }

    getRoomReservation(Id:number){
        return this.http.get(this.appUrl.RootLocation+'roomReservation/roomReservation/'+Id).map(this.extractData);
    }

    getRoomReservationsForRoom (Id:number):Observable<any>{
        return this.http.get(this.appUrl.RootLocation+'roomReservation/roomReservationForRoom/'+Id).map(this.extractData);
    }

    postRoomReservations(roomreservation: RoomReservation): Observable<any>  {
        return this.http.post(this.appUrl.RootLocation+'roomReservation/roomReservation', roomreservation , this.getRequestOptions());
    }

    deleteRoomReservation(Id:number){
        return this.http.delete(this.appUrl.RootLocation + 'roomReservation/roomReservation/'+ Id,this.getRequestOptions());
    }

    editRoomReservation(roomreservation:RoomReservation){
        return this.http.put(this.appUrl.RootLocation+'roomReservation/roomReservation/'+
        roomreservation.Id, roomreservation , this.getRequestOptions());
    }
}