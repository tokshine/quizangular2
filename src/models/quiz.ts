import { Question } from "./question";
import { QuizConfig } from "./quiz-config";

export class Quiz {
    id:number;
    name:string;
    description:string;
    config:QuizConfig;
    questions:Question[];
    constructor(data:any){
        if (data){
            this.questions = [];
            this.id = data.id;
            this.name = data.name;
            this.config = new QuizConfig(data.config);
            this.description = data.description;
            data.questions.forEach(element => {
                this.questions.push(new Question(element))  ;
            });
        } 
     
    }
}