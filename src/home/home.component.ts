import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from '../services/app.service';
import { Quiz, QuizConfig } from '../models';
//import { Option, Question, Quiz, QuizConfig } from '../models/index';

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
   // filteredQuestions: any[];
    itemsPerPage:number;
    questions: any[];
    config: QuizConfig = {  //same config = new QuizConfig(data)  in this case we are initializing with default settings
        'allowBack': true,
        'allowReview': true,
        'autoMove': false,  // if true, it will move to next question automatically when answered.
        'duration': 300,  // indicates the time (in secs) in which quiz needs to be completed. 0 means unlimited.
        'pageSize': 1,
        'requiredAll': false,  // indicates if you must answer all the questions before submitting.
        'richText': false,
        'shuffleQuestions': false,
        'shuffleOptions': false,
        'showClock': false,
        'showPager': true,
        'theme': 'none'
      };
    errorMessage: string;
    autoMove:boolean;
    quizName:string;
    allowBack:boolean;
    quiz:Quiz ;
    mode:string;
    quizes:any[]

    constructor(private quizService: AppService, private router: Router,
        private route: ActivatedRoute) { }

    ngOnInit() {
       
        this.quizes =this.quizService.getAll();
        this.quizName = this.quizes[0].id;              
       
        this.loadQuiz( this.quizName);
        
    }
 
    loadQuiz(quizName:string){
        this.mode = "quiz";
        console.log('quiz name' + this.quizName);
        //good practice
        this.currentPage = 1 ;
        this.autoMove = true;
         this.quizService.getQuestionsByQuizName(quizName).subscribe(           
            item => {  this.quiz = new Quiz(item);  
                this.itemsPerPage = item.config.pageSize;               
                // var begin = ((this.currentPage - 1) * this.itemsPerPage),
                // end = begin + this.itemsPerPage;

                // this.questions = item.questions.slice(begin, end);  
                this.pageTitle =item.quiz.name ; 
               // this.filteredQuestions = item.questions;
                this.totalItems = item.questions.length ;
                this.config = item.config;  //overriding the default settings        
            },
            error => this.errorMessage = <any>error
        );

        // this is not a good practice
      //  var data = this.quizService.getQuestionsByQuizName(quizName);    
       // data.subscribe(           
        //             item => {  this.quiz = new Quiz(item);  }
        // );

    }


    get filteredQuestions(){
        var begin = ((this.currentPage - 1) * this.itemsPerPage),
                end = begin + this.itemsPerPage;
           return     this.quiz.questions.slice(begin, end);  
    }

    isCorrect(question) {
       
        var result = 'wrong';
        var overallresult = '';
        question.options.forEach(function (option, index, array) {      
        var item = option;
       
        if (item.IsAnswer) {
            if (item.Selected == 'undefined' || item.Selected == null || item.Selected == '' || item.Selected == 'false' || item.Selected == 'False'){
                result = 'wrong';
                overallresult = 'wrong';                
            }            
            else if (item.Selected == true || item.Selected == 'true' || item.Selected == 'True'){

                if (overallresult == 'wrong') {
                    // alert('reseting ..' + overallresult);
                     result = overallresult;
                 } else {
                     result = 'correct';
                 }  
            }            
            else {
                console.log(item.Selected);
                result = 'wrong';
                overallresult = 'wrong';
            }        
        } 
    });
        return result;
    }
    

   isAnswered (index) {
        var answered = 'Not Answered';
        this.quiz.questions[index].options.forEach(function (element, index, array) {
            console.log(element.selected);
            if (element.selected == true) { //element.Selected  would be undefined if property does not exist|has not been clicked on
               
                answered = 'Answered';
                return false;
            }
        });
        return answered;
    };

    
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
        this.mode = 'quiz';
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
