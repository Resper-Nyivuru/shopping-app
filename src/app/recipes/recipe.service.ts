import { Injectable } from "@angular/core";
import { Recipe } from "./recipe.module";
import { Ingredients } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";
@Injectable()
export class RecipeService{
    //recipeSelected = new EventEmitter<Recipe>();
    recipesChanged = new Subject<Recipe[]>();

   /*  private recipes: Recipe [] = [
        new Recipe('Chicken','Delicious Marinated Chicken',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHJKDEqpQnA2eu8nybuSM68uocZ3bYARG_8w&usqp=CAU',
        [new Ingredients('Chicken', 2), new Ingredients('Onions', 3)]),
        new Recipe('Irish Potatoes','Potatoes mixed with eggs',
        'https://th.bing.com/th/id/OIP.ibC0ZQ8poXAwutIsnog_YQHaGu?pid=ImgDet&w=182.1148825065274&h=180&c=7',
        [new Ingredients('Irish Potatoes', 10), new Ingredients('Eggs', 2)])
      ]; */
    
    private recipes: Recipe[] = [];
    
    constructor(private shoppingListService: ShoppingListService){
    }
    setRecipes(recipes: Recipe[]){
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }
    //getRecipes
    getRecipes(){
        return this.recipes.slice();
    }
    getRecipe(index: number){
        return this.recipes[index];
    }
    addIngredientsToShoppingList(ingredient: Ingredients[]){
        this.shoppingListService.addIngredient(ingredient);
    }
    addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }
    updateRecipe(index: number, newRecipe: Recipe){
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }
    deleteRecipes(index: number){
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }

}