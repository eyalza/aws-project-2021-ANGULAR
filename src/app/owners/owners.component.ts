import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { OwnersService } from '../owners.service';
import { Owner } from '../interfaces/owner';
import { SaleService } from '../sale.service';
import { ImageService } from '../image.service';
import { Sales } from './../interfaces/sales';
import { Observable } from 'rxjs';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router';
import { ViewChild} from '@angular/core';
import {MatAccordion} from '@angular/material/expansion';

@Component({
  selector: 'owners',
  templateUrl: './owners.component.html',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class OwnersComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;

  step = -2;
  add_btn1 = true;
  add_btn2= false;
  add_btnCANCEL3= false;


  name;
  city;
  email;
  phone;
  brand:string;  
  years = [];
  year;
  model;
  vin;
  edit_order;
  image_car;

  ex_panel= true;
  ex_pane2= true;
  ex_pane3= true;
  image_url= "https://shacknews-ugc.s3.us-east-2.amazonaws.com/user/9647/article-inline/2021-03/template.jpg?versionId=EPuOpjX7pGmrwxIxaF8BBrMfaK4X7f.S";
  manuf_show=false
  prgs=false;
  prgs_image=false;
  update_btn = false;
  add_btn = true;


  columnsToDisplay:string[] = ['Customer','City','Email','Phone','Brand','Year','Model','VIN', 'Manufacturer', 'image','actions'];




  brands:Object[] = [
    {id:1,name:'Toyota'},
    {id:3,name:'Honda'},
    {id:5,name:'Chevrolet'},
    {id:7,name:'Volvo'},
    {id:8,name:'Fiat'},
    {id:9,name:'Kia'},
    {id:10,name:'Suzuki'}
    ]
  

  manData$:Observable<Sales>;
  mfrName:string;
  makeid:number;
  
  makerImage;
  hasError;
  errorMessage;
  edit_order_id;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
  

  addBtnClose() {
    this.update_btn = false;
    this.add_btn1 = true;
    this.add_btn = true;

    this.step=-2;
    this.ex_panel=true;
    this.ex_pane2=true;
    this.ex_pane3=true;
    this.name = null;
    this.city = null;
    this.email = null;
    this.phone = null;
    this.vin = null;
    this.model = null;
    this.mfrName = null;
    this.year = 2021;
    this.brand = null;
    this.name = null;
    this.image_url =  "https://shacknews-ugc.s3.us-east-2.amazonaws.com/user/9647/article-inline/2021-03/template.jpg?versionId=EPuOpjX7pGmrwxIxaF8BBrMfaK4X7f.S";;


    }
  
  onBrandSelect() {
    this.manuf_show=false;
    this.prgs=true;

    this.manData$ = this.saleService.searchMfrData(this.brand); 
   
    this.manData$.subscribe(
      data => {
        console.log(data);
        this.mfrName = data.mfrName;
        this.makeid = data.makeid;
        console.log(data.makeid);
        console.log(data.mfrName);

        this.makerImage = this.imageService.images[data.makeid];
        console.log(this.makerImage);
        this.prgs=false;
        this.manuf_show=true;

      }, 
      error =>{
        console.log(error.message);
        this.hasError = true;
        this.errorMessage = error.message; 
      }
    )
  }





  orders = [];

  owners$; 
  owners:Owner[];
  userId:string; 
  editstate = [];
  addOwnerFormOPen = false;
  

  panelOpenState = false;
  constructor(private ownersService:OwnersService, 
              public authService:AuthService, 
              private saleService:SaleService,
              private imageService:ImageService,
              public router:Router) { }

  deleteOrder(order_id:string){
    console.log(order_id);
    this.ownersService.deleteOrder(order_id).subscribe(
      (res) => {
        console.log (res);
        this.router.navigateByUrl('/', {skipLocationChange: false}).then(()=>
        this.router.navigate(['owners']));

      }
    ); 
  }

updateOrder(){
  const order_id = this.edit_order_id
    console.log(order_id);


    for(let order of this.orders){
      if(order['order_id']== order_id){
        console.log(1);
        console.log(1)
        console.log(1)
        console.log(1)
        console.log(1)
        console.log(1)
        console.log(1)

        this.edit_order = order
        this.edit_order['Customer'] = this.name;
        this.edit_order['City'] = this.city;
        this.edit_order['Email'] = this.email;
        this.edit_order['Phone'] = this.phone;
        this.edit_order['VIN'] = this.vin;
        this.edit_order['Model'] = this.model;
        this.edit_order['Manufacturer'] = this.mfrName;
        this.edit_order['Year'] = this.year;
        this.edit_order['Brand'] = this.brand;
        this.edit_order['image_url'] = this.image_url;


        console.log(this.edit_order)

      }
    }
    this.ownersService.updateOrder(this.edit_order).subscribe(
      (res) => {
        console.log (res);
        this.router.navigateByUrl('/', {skipLocationChange: false}).then(()=>
        this.router.navigate(['owners']));

      }
    ); 
  } 


  editState(order_id){
    this.add_btn = false;
    this.update_btn = true;
    this.add_btnCANCEL3=true;
    this.add_btn2=true;


    console.log(this.update_btn);
    this.ex_panel= false;
    this.ex_pane2= false;
    this.ex_pane3= false;
    for(let order of this.orders){
      if(order['order_id']== order_id){
        console.log(order)
        this.edit_order_id = order_id;
        console.log(this.edit_order_id);
        this.edit_order = order
        this.name = this.edit_order['Customer'];
        this.city = this.edit_order['City'];
        this.email = this.edit_order['Email'];
        this.phone= this.edit_order['Phone'];
        this.vin = this.edit_order['VIN'];
        this.model = this.edit_order['Model'];
        this.mfrName = this.edit_order['Manufacturer'];
        this.year = this.edit_order['Year'];
        this.brand = this.edit_order['Brand'];
        this.image_url = this.edit_order['image_url'];

        console.log(this.brand)
        this.onBrandSelect();



        console.log(this.edit_order)
        console.log(this.name)


      }
    }

  }


  update(owner:Owner){
    this.ownersService.updateOwner(this.userId,owner.id,owner.fullName,owner.carId,owner.carCompany,owner.carModel,owner.carYear);
  }
  add(){
    console.log(this.mfrName);
    

    this.ownersService.AddOrders(this.userId,this.name,this.city, this.email, this.phone, this.brand, this.year, this.model, this.mfrName, this.vin, this.image_url).subscribe(
      (res) => {
        console.log (res);
        this.router.navigateByUrl('/', {skipLocationChange: false}).then(()=>
        this.router.navigate(['owners']));

      }
    ); 
  }



  uploadImage(file) {
    this.image_url = null;

    this.prgs_image = true;

    this.authService.getUser().subscribe(user => {
      this.userId = user.uid;
      console.log(file)
      this.image_car = file.target.files[0];
      console.log(this.image_car)

      this.ownersService.uploadImage(this.image_car).subscribe(
        (image_url) =>{
          console.log(image_url);
          this.prgs_image = false;
          this.image_url = image_url;
      

            });
    })
   

   


}









  ngOnInit(): void {

  for(var i = 2021; i >= 1980; i--){
      this.years.push(i);
    }

  
    this.authService.getUser().subscribe(
      user => {
        this.userId = user.uid;
        console.log(this.userId); 
        this.owners$ = this.ownersService.getMyOrders(this.userId); 
        this.owners$.subscribe( orders => {
            console.log(orders)
            this.orders =orders;
            
          }
        )}
    )
  }

}
