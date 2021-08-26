import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PriceService {

  private url = "https://rhmjqolgv2.execute-api.us-east-1.amazonaws.com/beta";

  predict(year: number, mileage: number, tax: number,mpg:number,engineSize:number,model_1_Series:number,model_2_Series:number,model_3_Series:number,model_4_Series:number,model_5_Series:number,transmission_Automatic:number,transmission_Manual:number,transmission_Semi_Auto:number,fuelType_Diesel:number,fuelType_Petrol:number):Observable<any>{
    let json = {
      "data":`${year},${mileage},${tax},${mpg},${engineSize},${model_1_Series},${model_2_Series},${model_3_Series},${model_4_Series},${model_5_Series},${transmission_Automatic},${transmission_Manual},${transmission_Semi_Auto},${fuelType_Diesel},${fuelType_Petrol}`
    }
    console.log(json);
    let body  = JSON.stringify(json);
    return this.http.post<any>(this.url,body).pipe(
      map(res => {
        return res.body;       
      })
    );      
  }



  constructor(private http:HttpClient) { }
}
