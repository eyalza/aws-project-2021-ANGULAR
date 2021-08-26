import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { OwnersService } from '../owners.service';

@Component({
  selector: 'app-detector',
  templateUrl: './detector.component.html',
  styleUrls: ['./detector.component.css']
})
export class DetectorComponent implements OnInit {
  userId;
  orders$;
  images;
  res_text_arr=[];
  res_conf_arr=[];



  

  constructor(private ownersService:OwnersService, public authService:AuthService, 
    ) { }

    detectText(index){
      let url = this.images[index];
      console.log(url);
      this.orders$ = this.ownersService.detectText(url).subscribe(
        (res)=>{
          this.res_text_arr[index] = res['detected_text'];
          this.res_conf_arr[index] = res['confidence'];
          console.log(this.res_conf_arr[index]);


      }); 


    }

  ngOnInit(): void {
    this.authService.getUser().subscribe(
      user => {
        this.userId = user.uid;
        console.log(this.userId); 
        this.orders$ = this.ownersService.getMyOrders(this.userId); 
        this.orders$.subscribe( orders => {
          this.images = [];
          for (let order of orders){
            this.images.push(order['image_url']);
            }
          }
        )
      }
    )
  }


}
