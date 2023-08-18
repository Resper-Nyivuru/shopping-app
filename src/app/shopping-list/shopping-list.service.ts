
import { Ingredients } from "../shared/ingredient.model";
import { Subject } from "rxjs";

export class ShoppingListService{
    //ingredientsChanged = new EventEmitter<Ingredients[]>();
    ingredientsChanged = new Subject<Ingredients[]>();
    startedEditting = new Subject<number>();
    
    private ingredients: Ingredients [] = [
        new Ingredients('Apples', 5),
        new Ingredients('Tomatoes',10)
      ];

    getIngredients(){
        //return a copy of the ingredients with a slice method so that we can't get access to the original
        //array stored in the service
        return this.ingredients.slice();
    }

    getIngredient(index: number){
        return this.ingredients[index];
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

    updateIngredient(index: number, newIngredient: Ingredients){
        this.ingredients[index] = newIngredient;
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    delete(index: number){
        //splice removes the element from the array
        this.ingredients.splice(index, 1);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

}