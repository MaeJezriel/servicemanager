import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { inject } from '@angular/core/testing';
import { catchError, tap, map} from  'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'
})
};

const apiUrl = "https://randomuser.me/api/?results=10";

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(private http:HttpClient) { }

  private handlerError(error: HttpErrorResponse){
    if (error.error instanceof ErrorEvent) {
      console.error('An error occured:', error.error.message);

    } else {
      console.error(
        `Backend returned code ${error.status}, `+
        `body was: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  }

  private extractData(res: Response) {
  let body = res;
  return body || { };
  }



  getDataUser(): Observable<any>{
    return this.http.get(apiUrl, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handlerError));
    }
    

    

    
}