import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from '../services/app.service';

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


    constructor(private appService: AppService, private router: Router,
        private route: ActivatedRoute) { }

    ngOnInit() {

        var data = this.appService.getQuestionsByQuizName();
        this.currentPage = 1 ;

        data.subscribe(           
            item => {
                this.itemsPerPage = item.config.pageSize;               
                var begin = ((this.currentPage - 1) * this.itemsPerPage),
                end = begin + this.itemsPerPage;

                this.questions = item.questions.slice(begin, end);  
                this.pageTitle =item.quiz.name ; 
                this.totalItems = item.questions.length            
                            
            },
            error => this.errorMessage = <any>error
        );  
      
    }

    //stopped here
    onSelect(question, option) {
        if (this.autoMove == true && this.currentPage < this.totalItems)
        this.currentPage++;
    }


}
