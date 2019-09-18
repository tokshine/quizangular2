
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

    public getAll() {
            return [
            {id:'assets/data/aspnet.json' ,name:'Asp.Net'},
            { id :'assets/data/csharp.json',name :'CSharp'},
            { id :'assets/data/designPatterns.json',name :'Design Patterns'}
        ]
    }

    //private questionBaseUrl = 'assets/data/csharp.json';


    public getQuestionsByQuizName(questionUrl:string): Observable<any> {
        return this.http.get(questionUrl);
    } 
   

    private handleError(error: any) {
        console.error(error);
        return Observable.throw(error.json().error || "Server error");
    }
}