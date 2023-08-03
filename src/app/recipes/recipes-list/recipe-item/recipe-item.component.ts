import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../recipe.module';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit{
  //getting data from outside: use Input
  @Input() recipe: Recipe;
  //lsiten to this event from the outside, to be used outside this component
  //@Output() recipeSelected = new EventEmitter<void>();
  constructor(private recipeService: RecipeService){}

  ngOnInit(){
    
  }

  //on clicking the list items the details of the selected list to be displayed.
  onSelected(){
    //this.recipeSelected.emit();
    this.recipeService.recipeSelected.emit(this.recipe);
  }

}
