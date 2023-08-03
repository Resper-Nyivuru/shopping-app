import { Component, OnInit } from '@angular/core';
import { Ingredients } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})

export class ShoppingListComponent implements OnInit{
  ingredients: Ingredients [];

  constructor(private shoppingListService: ShoppingListService){}

  ngOnInit(){
    //initializing the values to the ingredients array
    this.ingredients = this.shoppingListService.getIngredients();
    this.shoppingListService.ingredientsChanged.subscribe(
      (ingredients: Ingredients[]) => { 
        //adding the ingredients in the list.
        this.ingredients = ingredients;
      }
    );
  }

  // onIngredientAdded(ingredient: Ingredients){
  //   //adding items to an array
  //   this.ingredients.push(ingredient);
  // }

}
