
import { Injectable, Inject } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
//import  questions from "../../../data/csharp.json";


@Injectable()
export class AppService {
    constructor(private http: HttpClient) {      

    }

    private questionBaseUrl = 'assets/data/csharp.json';


    public getQuestionsByQuizName(): Observable<any> {
        return this.http.get(this.questionBaseUrl);
    } 
   

    private handleError(error: any) {
        console.error(error);
        return Observable.throw(error.json().error || "Server error");
    }
}