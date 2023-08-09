import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../recipe.module';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit{
  //getting data from outside: use Input
  @Input() recipe: Recipe;
  @Input() index: number; //we are getting the value of this index from recipeListComponent
  //in the for loop
  //lsiten to this event from the outside, to be used outside this component
  //@Output() recipeSelected = new EventEmitter<void>();
 // constructor(private recipeService: RecipeService){}

  ngOnInit(){
    
  }
  // option 1//on clicking the list items the details of the selected list to be displayed.
  // onSelected(){
  //   //this.recipeSelected.emit();
  //   this.recipeService.recipeSelected.emit(this.recipe);}


}
