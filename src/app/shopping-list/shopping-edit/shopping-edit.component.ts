import { Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredients } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy{
  @ViewChild('f') slform: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredients;
  //using the local reference
/*   @ViewChild('nameInput') nameInputRef: ElementRef;
  @ViewChild('amountInput') amountInputRef: ElementRef; */
  //emitting a child event, listen to it from outside
  //@Output() ingredientAdded =  new EventEmitter<Ingredients>();

  //this is like calling an instance of a class in this constructor
  constructor(private shoppingListService: ShoppingListService){}

  ngOnInit(){
    this.subscription = this.shoppingListService.startedEditting.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.shoppingListService.getIngredient(index);
        this.slform.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      }
    );
  }

  onSubmit(form: NgForm){
    const value = form.value;
    const newIngredient = new Ingredients(value.name, value.amount);
    //this.ingredientAdded.emit(newIngredient);
    //check if update mode or edit mode
    if(this.editMode)
    {
      this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
    }else
    {
      this.shoppingListService.addIngredients(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }

  onClear(){
    this.slform.reset();
    this.editMode = false;
  }

  onDelete(){
    this.shoppingListService.delete(this.editedItemIndex);
    this.onClear();
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
