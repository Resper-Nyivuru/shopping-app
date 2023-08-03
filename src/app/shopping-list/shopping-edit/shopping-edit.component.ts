import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Ingredients } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit{
  //using the local reference
  @ViewChild('nameInput') nameInputRef: ElementRef;
  @ViewChild('amountInput') amountInputRef: ElementRef;
  //emitting a child event, listen to it from outside
  //@Output() ingredientAdded =  new EventEmitter<Ingredients>();

  //this is like calling an instance of a class in this constructor
  constructor(private shoppingListService: ShoppingListService){}

  ngOnInit(){
    
  }

  onAddItem(){
    const ingName =  this.nameInputRef.nativeElement.value;
    const ingAmount = this.amountInputRef.nativeElement.value;
    const newIngredient = new Ingredients(ingName, ingAmount);
    //this.ingredientAdded.emit(newIngredient);
    this.shoppingListService.addIngredients(newIngredient);
  }
}
