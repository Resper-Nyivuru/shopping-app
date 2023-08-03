export class Ingredients{
    //define how ingrediant should look like
    public name: string;
    public amount: number;

    constructor(name: string, amount: number){
        this.name = name;
        this.amount = amount;
    }

    /*the option of the code above is below
    constructor(public name: string, public amount: number){
    }
     So you don't need to define the variables, and assign with the arguments in the constructor.
    */
   
}