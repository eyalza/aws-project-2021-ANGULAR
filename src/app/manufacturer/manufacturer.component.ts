import { Component, OnInit } from '@angular/core';
import { Sales } from './../interfaces/sales';
import { SaleService } from './../sale.service';
import { ImageService } from './../image.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-manufacturer',
  templateUrl: './manufacturer.component.html',
  styleUrls: ['./manufacturer.component.css']
})
export class ManufacturerComponent implements OnInit {
  make:string;
  mfrName:string;
  makeid:number;
  salesData$:Observable<Sales>;
  hasError:Boolean = false;
  errorMessage:string;
  makerImage:string; 

  constructor(private route:ActivatedRoute, private saleService:SaleService, private imageService:ImageService ) { }

  ngOnInit(): void {
    this.make = this.route.snapshot.params.make; 
    this.salesData$ = this.saleService.searchMfrData(this.make); 
    //this.makerImage = this.imageService.images[]
//this.categoryImage = this.imageService.images[res];
    this.salesData$.subscribe(
      data => {
        this.mfrName = data.mfrName;
        this.makeid = data.makeid;
        console.log(data.makeid);
        this.makerImage = this.imageService.images[data.makeid];
      }, 
      error =>{
        console.log(error.message);
        this.hasError = true;
        this.errorMessage = error.message; 
      }
    )
  }

}
