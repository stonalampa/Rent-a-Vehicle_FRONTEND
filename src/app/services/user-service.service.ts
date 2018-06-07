import { Injectable } from '@angular/core';

import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpUserEvent } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { UserModel } from 'src/model/userModel.model';



@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http: Http, private httpClient: HttpClient) { }

  private parseData(res: Response)
  {
    return res.json() || [];
  }

  private handleError(error: Response | any) {
    let errorMessage: string;
    errorMessage = error.message ? error.message : error.toString();
    return Observable.throw(errorMessage);
  }

  getMethodDemo(): Observable<any> {
    return this.httpClient.get('http://localhost:51680/Read/ReadUser');
  }

  postMethodDemo(user):Observable<any>{
    return this.httpClient.post('http://localhost:51680/Write/WriteUser', user);
  }
}
