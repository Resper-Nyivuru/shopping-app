import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  //option 1: Its makes this event listenable to the parent component using the Output.
  // @Output() featureSelected = new EventEmitter<string>();
  // onSelect(feature: string){
  //   this.featureSelected.emit(feature);
  // }
  constructor(private dataStorageService: DataStorageService){}

  ngOnInit(){
    //once the app loads, it fetches the recipes from the firebase database, it works but it's
    //commented out for now;
    //this.dataStorageService.fetchRecipes();
  }

  onSaveData(){
    this.dataStorageService.storeRecipes();
  }
  onFetchData(){
    this.dataStorageService.fetchRecipes();
  }
}
