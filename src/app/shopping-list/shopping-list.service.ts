
import { Ingredients } from "../shared/ingredient.model";
import { Subject } from "rxjs";

export class ShoppingListService{
    //ingredientsChanged = new EventEmitter<Ingredients[]>();
    ingredientsChanged = new Subject<Ingredients[]>();
    private ingredients: Ingredients [] = [
        new Ingredients('Apples', 5),
        new Ingredients('Tomatoes',10)
      ];

    getIngredients(){
        //return a copy of the ingredients with a slice method so that we can't get access to the original
        //array stored in the service
        return this.ingredients.slice();
    }

    addIngredients(ingredient: Ingredients){
        this.ingredients.push(ingredient);
        //this.ingredientsChanged.emit(this.ingredients.slice());
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    addIngredient(ingredients: Ingredients[]){
        // for(let ing of ingredients){
        //     this.addIngredients(ing)
        // }
        //spread operator "..."
        this.ingredients.push(...ingredients);
        //this.ingredientsChanged.emit(this.ingredients.slice());
        this.ingredientsChanged.next(this.ingredients.slice());
    }

}