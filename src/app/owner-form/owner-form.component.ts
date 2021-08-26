import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Owner } from '../interfaces/owner';

@Component({
  selector: 'ownerform',
  templateUrl: './owner-form.component.html',
  styleUrls: ['./owner-form.component.css']
})
export class OwnerFormComponent implements OnInit {

  @Input() fullName:string;  
  @Input() carCompany:string;
  @Input() carModel:string;
  @Input() carYear:number;
  @Input() carId:number;      
  @Input() id:string; 
  @Input() formType:string;
  @Output() update = new EventEmitter<Owner>();
  @Output() closeEdit = new EventEmitter<null>();


  updateParent(){
    let owner:Owner = {id:this.id, fullName:this.fullName, carId:this.carId, carCompany:this.carCompany, carModel:this.carModel,
      carYear:this.carYear};
    this.update.emit(owner); 
    if(this.formType == "Add owner"){
      this.fullName  = null;
      this.carId  = null;
      this.carCompany  = null;
      this.carModel  = null;
      this.carYear  = null;
    }
  }

  tellParentToClose(){
    this.closeEdit.emit(); 
  }



  constructor() { }

  ngOnInit(): void {
  }

}
