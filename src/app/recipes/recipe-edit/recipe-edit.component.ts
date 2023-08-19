import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id: number;
  editMode = false;
  recipeForm: FormGroup;

  //recipeForm.get('ingredients').controls;
  get controls() {
    return (this.recipeForm.get('ingredients') as FormArray).controls
  }

  constructor(private route: ActivatedRoute, private recipeService: RecipeService,
    private router: Router){
  }
  ngOnInit(){
    this.route.params.subscribe(
      (params: Params)=>{
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        //console.log(this.editMode);
        this.initForm();
      }
    );
  }
  onSubmit(){
    //console.log(this.recipeForm);
   /*  const newRecipe = new Recipe(
      this.recipeForm.value['name'],
      this.recipeForm.value['description'],
      this.recipeForm.value['imagePath'],
      this.recipeForm.value['ingredients'],
    ); */
    if(this.editMode){
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    }else{
      //this.recipeService.addRecipe(newRecipe);
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.onCancel();
  }
  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
       new FormGroup({
        'name': new FormControl(null, Validators.required,),
        'amount': new FormControl(null, [Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    );
  }
  onDeleteIngredient(index: number){
    //this deletes a sign item in an array
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
    //this deletes all items in an array
    //(<FormArray>this.recipeForm.get('ingredients')).clear;
  }
  onCancel(){
    //to navigate away or redirect to the desired component, takes 2 arguments an array and an object.
    this.router.navigate(['../'], {relativeTo: this.route});
  }
  private initForm(){
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      //setting default values for recipe ingredients
      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          );
        }
      }
    }
    //setting default vaules for recipes
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });

  }

}
