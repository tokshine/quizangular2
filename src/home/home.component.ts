import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from '../services/app.service';

//I do not know how to import javascript/jquery into angular project yet
// import {helper} from '../assets/scripts/helperService.js'




@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})
export class HomeComponent {
    pageTitle = 'C# and .Net Framework';
    currentPage :number;
    totalItems:number;
    filteredQuestions: any[];
    itemsPerPage:number;
    questions: any[];
    errorMessage: string;
    autoMove:boolean;
    quizName:string;
    allowBack:boolean;
    mode:string;


    constructor(private appService: AppService, private router: Router,
        private route: ActivatedRoute) { }

    ngOnInit() {
        this.quizName  =  'assets/data/csharp.json';
        var data = this.appService.getQuestionsByQuizName(this.quizName);
        this.currentPage = 1 ;
        this.autoMove = true;
        this.mode = 'quiz';
        data.subscribe(           
            item => {
                this.itemsPerPage = item.config.pageSize;               
                var begin = ((this.currentPage - 1) * this.itemsPerPage),
                end = begin + this.itemsPerPage;

                this.questions = item.questions.slice(begin, end);  
                this.pageTitle =item.quiz.name ; 
                this.filteredQuestions = item.questions;
                this.totalItems = item.questions.length ;  
                this.allowBack = item.config.allowBack ;        
                            
            },
            error => this.errorMessage = <any>error
        );  
      
    }
 
    loadQuiz(){

        console.log('quiz name' + this.quizName);
        var data = this.appService.getQuestionsByQuizName(this.quizName);
        this.currentPage = 1 ;
        this.autoMove = true;
       
        data.subscribe(           
            item => {
                this.itemsPerPage = item.config.pageSize;               
                var begin = ((this.currentPage - 1) * this.itemsPerPage),
                end = begin + this.itemsPerPage;

                this.questions = item.questions.slice(begin, end);  
                this.pageTitle =item.quiz.name ; 
                this.filteredQuestions = item.questions;
                this.totalItems = item.questions.length            
                            
            },
            error => this.errorMessage = <any>error
        );   


    }

    

    
    onSelect(question) {
        console.log(question);

        if (question.QuestionTypeId == 1) {        
            question.Options.forEach(function (option, index, array) {
                var val = option;
                //will love to use this approach but dont know how to 
                //use javascipt
                // if (helper.toBool(item.Selected)) {
                // }
                if (val.Selected == 'undefined' || val.Selected == null || val.Selected == '' || val.Selected == 'false' || val.Selected == 'False')
                console.log('unidentified');
                else if (val.Selected == true || val.Selected == 'true' || val.Selected == 'True')
                console.log('identified')
                 else
                 console.log('unidentified');
             
            });
        }
       
        //I dont want automove for now 
        // if (this.autoMove == true && this.currentPage < this.totalItems)
        // this.currentPage++;
        // var begin = ((this.currentPage- 1) * this.itemsPerPage),
        // end = begin + this.itemsPerPage ;    
        // this.questions = this.filteredQuestions.slice(begin, end);           
    }


    
    
    onSubmit(){
        this.mode = 'result';
    }

    goTo(position){
        console.log('position'+position)  ;
        if (position ==0 || position > this.totalItems) return;
        if (position<=this.totalItems){
            this.currentPage= position;
        }
        if (this.autoMove == true && this.currentPage <=this.totalItems)  {                
        var begin = ((position- 1) * this.itemsPerPage),
        end = begin + this.itemsPerPage ;    
        console.log('end'+end)  ;
        console.log('begin'+ begin)  ;
        }
        this.questions = this.filteredQuestions.slice(begin, end);  //slice= no of items to return= end - begin ,counting index  from 'begin'
    }
  


}
