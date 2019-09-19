export class Option {

    id:number;
    name :string ;
    isAnswer:boolean;
    selected:boolean;
    constructor(data:any)
    {
        data=data|| {};
        this.id =data.Id;
        this.name = data.Name;
        this.isAnswer = data.IsAnswer;
        this.selected = data.selected;

    }

}