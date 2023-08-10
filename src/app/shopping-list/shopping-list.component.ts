import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredients } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})

export class ShoppingListComponent implements OnInit, OnDestroy{
  ingredients: Ingredients [];
  private subscription: Subscription;
  
  constructor(private shoppingListService: ShoppingListService){}

  ngOnInit(){
    //initializing the values to the ingredients array
    this.ingredients = this.shoppingListService.getIngredients();
    this.subscription = this.shoppingListService.ingredientsChanged.subscribe(
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

  ngOnDestroy(){
    //destroy the subscription
    this.subscription.unsubscribe();
  }

}
