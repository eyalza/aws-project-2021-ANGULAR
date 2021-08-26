import { Component, EventEmitter, OnInit } from '@angular/core';
import { PriceService } from '../price.service';

@Component({
  selector: 'app-price-form',
  templateUrl: './price-form.component.html',
  styleUrls: ['./price-form.component.css']
})
export class PriceFormComponent implements OnInit {

  averageMath=80;
  psychoGrade:number;
  completeTuition:boolean;
  tax = 130;
  mpg = 55.5;
  engineSize = 2;
  year:number;
  mileage:number;
  model:string;
  transmission:string;
  fuelType:string;
  model_1_Series:number=0;
  model_2_Series:number=0;
  model_3_Series:number=0;
  model_4_Series:number=0;
  model_5_Series:number=0;
  transmission_Automatic:number=0;
  transmission_Manual:number=0;
  transmission_Semi_Auto:number=0;
  fuelType_Diesel:number=0;
  fuelType_Petrol:number=0;
  res:number;
  useremail:string;
  id:string;
  arrPayed:Array<boolean> = [true, false];
  arrRes:Array<string> = ['Finish', 'Will not finish'];
  arrModel:string[] = ['model_1_Series', 'model_2_Series','model_3_Series','model_4_Series','model_5_Series'];
  arrTrans:string[] = ['transmission_Automatic', 'transmission_Manual','transmission_Semi-Auto'];
  arrFuel:string[] = ['fuelType_Diesel', 'fuelType_Petrol'];
  result:string;
  predictButton:boolean = true
  isError:boolean = false;
  years = [];

  predict(){
    if
    (this.model=='model_1_Series')
    {
      this.model_1_Series=1;
    }
    else if
    (this.model=='model_2_Series')
    {
      this.model_2_Series=1;
    }
    else if
    (this.model=='model_3_Series')
    {
      this.model_3_Series=1;
    }
    else if
    (this.model=='model_4_Series')
    {
      this.model_4_Series=1;
    }
    else if
    (this.model=='model_5_Series')
    {
      this.model_5_Series=1;
    }
    if (this.transmission=='transmission_Automatic'){
      this.transmission_Automatic==1
    }
    else if (this.transmission=='transmission_Manual'){
      this.transmission_Manual=1
    }
    else if (this.transmission=='transmission_Semi_Auto'){
      this.transmission_Semi_Auto=1
    }
    if (this.fuelType=='fuelType_Diesel'){
      this.fuelType_Diesel=1
    }
    if (this.fuelType=='fuelType_Petrol'){
      this.fuelType_Petrol=1
    }
    this.priceService.predict(this.year, this.mileage, this.tax, this.mpg, this.engineSize,this.model_1_Series,this.model_2_Series,this.model_3_Series,this.model_4_Series,this.model_5_Series,this.transmission_Automatic,this.transmission_Manual,this.transmission_Semi_Auto,this.fuelType_Diesel,this.fuelType_Petrol).subscribe(
      res => { 
        console.log(this.model);
        console.log(this.transmission);
        console.log(this.fuelType);
        console.log(res);
        this.res=res;
      ;}
    ); 
  }



  constructor(private priceService:PriceService) { }

  ngOnInit(): void {
    for(var i = 2021; i >= 1980; i--){
      this.years.push(i);
    }
  }

}