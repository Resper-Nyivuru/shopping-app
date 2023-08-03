import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  //Its makes this event listenable to the parent component using the Output.
  @Output() featureSelected = new EventEmitter<string>();
  
  onSelect(feature: string){
    this.featureSelected.emit(feature);
  }
}
