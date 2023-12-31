import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.module';
import { map, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class DataStorageService{
    //recipe service has the data that we want to push to firebase database
    constructor(private http: HttpClient, private recipeService: RecipeService ){
    }
    storeRecipes(){
        const recipes = this.recipeService.getRecipes();
        /*we are using the put insteads of post because we want to overide all the data in the recipe
         folder in firebase. Folders in firebase are acting like tables, we can have many folders
         for different data groups */
        this.http.put('https://shopping-app-71720-default-rtdb.firebaseio.com/recipes.json', recipes).
        subscribe(response => {
            console.log(response);
        });
    }
    fetchRecipes(){
        return this.http.get<Recipe[]>('https://shopping-app-71720-default-rtdb.firebaseio.com/recipes.json').
        pipe(map(recipes => {
            return recipes.map(
                recipe => {
                    //checking whether recipe ingredients is true-ish an arry with 0 or more elements
                    //else return an empty array...
                    return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
                }
            );
        }), tap(recipes => {
            this.recipeService.setRecipes(recipes);
        }));
    }
}