import { Component ,OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from '../services/app.service';
import { Quiz, QuizConfig, Question ,Option} from '../models';
//import { Option, Question, Quiz, QuizConfig } from '../models/index';

//I do not know how to import javascript/jquery into angular project yet
// import {helper} from '../assets/scripts/helperService.js'




@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
    pageTitle = 'C# and .Net Framework';    
   // filteredQuestions: any[]; see below now defined as a property    
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
    quizes:any[];
    startTime:Date = new Date;
    elapsedTime:string  = '00:00';
    timer :any = null;
    duration :string;

    //type is inferred
    pager= {
        index:0,    
        itemsPerPage:1,  
        totalItems:1
    }

    constructor(private quizService: AppService, private router: Router,
        private route: ActivatedRoute) { }

    ngOnInit() {
       
        this.quizes =this.quizService.getAll();
        this.quizName = this.quizes[0].id;              
       
        this.loadQuiz( this.quizName);
        
    }

    tick(){
      const now = new Date();
      //now.getTime() - this.startTime.getTime() note this line return milliseconds 
      const diff = (now.getTime() - this.startTime.getTime())/1000; //diff and converting to secs
       if (diff > this.config.duration)
       {
         this.onSubmit();
       }
     this.elapsedTime = this.parseTime(diff);
    }
 

    parseTime(totalSeconds: number) {
        let mins: string | number = Math.floor(totalSeconds / 60); //this string | number not quite clear to me
        let secs: string | number = Math.round(totalSeconds % 60);
        mins = (mins < 10 ? '0' : '') + mins;
        secs = (secs < 10 ? '0' : '') + secs;
        return `${mins}:${secs}`;
      }

    loadQuiz(quizName:string){
        this.mode = "quiz";
        console.log('quiz name' + this.quizName);
        
        //good practice        
       
         this.quizService.getQuestionsByQuizName(quizName).subscribe(           
            item => {  this.quiz = new Quiz(item);  
                this.pager.itemsPerPage = item.config.pageSize;               
                this.pager.index = 0;
                this.pageTitle =item.quiz.name ;                         
                this.pager.totalItems = item.questions.length ;
               // this.config = item.config;  //overriding the default settings  
                this.duration = this.parseTime(this.config.duration);
                this.timer= setInterval(()=>this.tick(),1000);      
            },
            error => this.errorMessage = <any>error
        );

        // this is not a good practice
      //  var data = this.quizService.getQuestionsByQuizName(quizName);    
       // data.subscribe(           
        //             item => {  this.quiz = new Quiz(item);  }
        // );

    }





    //this is like watch in angularjs
    get filteredQuestions(){        
        var begin = ((this.pager.index) * this.pager.itemsPerPage),
                end = begin + this.pager.itemsPerPage;
               
           return     (this.quiz.questions)?  this.quiz.questions.slice(begin, end) :[];  
    }


    //old schoool
    // isCorrect(question) {
       
    //     var result = 'wrong';
    //     var overallresult = '';
    //     question.options.forEach(function (option, index, array) {      
    //     var item = option;
       
    //     if (item.isAnswer) {
           
    //         if (item.selected == 'undefined' || item.selected == null || item.selected == '' || item.selected == 'false' || item.selected == 'False'){
    //             result = 'wrong';
    //             overallresult = 'wrong';                
    //         }            
    //         else if (item.selected == true || item.selected == 'true' || item.selected == 'True'){

    //             if (overallresult == 'wrong') {
    //                 // alert('reseting ..' + overallresult);
    //                  result = overallresult;
    //              } else {
    //                  result = 'correct';
    //              }  
    //         }            
    //         else {
    //             console.log(item.selected);
    //             result = 'wrong';
    //             overallresult = 'wrong';
    //         }        
    //     } 
    // });
  
    //     return result;
    // }   



    isCorrect(question:Question){
        //this logic here is really powerful
        //note 'every' is more interested in the all items that meets condition
        //if one fails the condition then wrong is returned        
     
       return question.options.every(x => x.selected === x.isAnswer) ? 'correct' : 'wrong';       
    }



    isAnswered (question:Question) {
        //old school approach
        // var answered = 'Not Answered';
        //     question.options.forEach(function (element, index, array) {
        //             console.log(element.selected);
        //             if (element.selected == true) { //element.Selected  would be undefined if property does not exist|has not been clicked on
                       
        //                answered = 'Answered';
        //                return false;
        //             }
        //         });
        // return answered;
        //smarter way to do the above note find is more interested in the first item that means condition
        return question.options.find(x=>x.selected)? 'Answered' : 'Not Answered';

    };

    
    onSelect(question:Question,option:Option) {
        console.log(question);

        if (question.questionTypeId == 2) {  // questionTypeId as 2 implies supports multiple choices  
            //old school approach    
            // question.options.forEach(function (optionItem, index, array) {
            //     var val = optionItem;
            //     //will love to use this approach but dont know how to 
            //     //use javascipt
            //     // if (helper.toBool(item.Selected)) {
            //     // }
            //      if (val.selected == true )
            //         console.log('identified')
            //      else
            //         console.log('unidentified');
             
            // });
            
            //smart approach
            question.options.forEach((x) => { if (x.id !== option.id) x.selected = false;  console.log(x.selected) });
            
        }

        if (this.config.autoMove)
        {
            this.goTo(this.pager.index + 1);
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

    goTo(position:number){ 

        if (position >= 0 && position < this.pager.totalItems) {
            this.pager.index = position;
            this.mode = 'quiz'; // this.mode = 'quiz';//sort of good practice to set the page mode
        }
        // if (this.autoMove == true && this.currentPage <=this.totalItems)  {                
        //     var begin = ((position- 1) * this.itemsPerPage),
        //     end = begin + this.itemsPerPage ;    
        //     console.log('end'+end)  ;
        //     console.log('begin'+ begin)  ;
        // }        
    }
  


}
