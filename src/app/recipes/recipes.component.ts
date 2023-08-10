import { Component, OnInit } from "@angular/core";
import { RecipeService } from "./recipe.service";

@Component({
    selector: 'receipes-component',
    templateUrl: '../recipes/recipes.component.html',
    providers: [RecipeService]
})

export class RecipesComponent implements OnInit{
    //selectedRecipe: Recipe;

    constructor(){

    }

    ngOnInit(){
        // this.recipeService.recipeSelected.subscribe(
        //     (recipe: Recipe) => {
        //         //this line displays the selected recipe
        //         this.selectedRecipe = recipe;
        //     }
        // );

    }

}