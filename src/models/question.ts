import {Option} from "./option"
export class Question {
    id: number;
    name: string;
    questionTypeId: number;
    options: Option[];
    answered: boolean;

    constructor(data:any){
        data= data|| {};
        this.id = data.Id;
        this.name = data.Name;
        this.questionTypeId = data.QuestionTypeId;
        this.options = [];
        data.Options.forEach(element => {
            this.options.push(new Option(element));
        });

    }
}
