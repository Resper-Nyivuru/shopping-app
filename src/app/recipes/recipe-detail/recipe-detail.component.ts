import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.module';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(private recipeService: RecipeService, private route: ActivatedRoute,
    private router: Router){}

  ngOnInit(){
    //using the arrow function ()=>{}
    this.route.params.subscribe(
      (params: Params)=>{
        this.id = +params['id'];
        this.recipe = this.recipeService.getRecipe(this.id);
      }
    );
  }

  onAddToShoppingList(){
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe(){
    //option 1
    this.router.navigate(['edit'], { relativeTo: this.route});
    //option 2
    //this.router.navigate(['../', this.id, 'edit'], { relativeTo: this.route});
  }
  onDeleteRecipe(){
    this.recipeService.deleteRecipes(this.id);
    //navigate away after the delete
    //this.router.navigate(['../'], {relativeTo: this.route});
    //navigate to recipes
    this.router.navigate(['/recipes']);
  }
}
