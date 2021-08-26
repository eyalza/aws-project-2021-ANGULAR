import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OwnersService {
  edit_order
  API_GET_ORDERS :string = "http://ec2-34-201-25-81.compute-1.amazonaws.com/get_orders";
  API_ADD_ORDER :string = "http://ec2-34-201-25-81.compute-1.amazonaws.com/add_order";
  API_DELETE_ORDER :string = "http://ec2-34-201-25-81.compute-1.amazonaws.com/delete_order";
  API_UPDATE_ORDER :string = "http://ec2-34-201-25-81.compute-1.amazonaws.com/edit_order";
  API_IMAGE_UPLOAD:string = "http://ec2-34-201-25-81.compute-1.amazonaws.com/upload_image";
  API_ANALYZE_IMAGE:string = "  http://ec2-34-201-25-81.compute-1.amazonaws.com/analyze_image";

  constructor(private db:AngularFirestore, private http:HttpClient) { }

  ownerCollection:AngularFirestoreCollection;
  userCollection:AngularFirestoreCollection = this.db.collection('users'); 


  
  getMyOrders(uid:string){
    return this.http.post<any>(`${this.API_GET_ORDERS}`, {"uid": uid}).pipe(map(result =>{
      console.log(result);
      return result;
      }
     )
    )
  }

  deleteOrder(order_id:string){
    return this.http.post<any>(`${this.API_DELETE_ORDER}`, {"order_id": order_id}).pipe(map(result =>{
      console.log(result);
      return result;
      }
     )
    )
  }

  detectText(url:string){
    return this.http.post<any>(`${this.API_ANALYZE_IMAGE}`, {"image_url": url}).pipe(map(result =>{
      console.log(result);
      return result;
      }
     )
    )
  }

  updateOrder(edit_order){
    console.log(edit_order);

    return this.http.post<any>(`${this.API_UPDATE_ORDER}`, edit_order).pipe(map(result =>{
      console.log(result);
      return result;
      }
     )
    )
  }


  
  uploadImage(image){
    console.log(image)
    let fd:FormData = new FormData();
    fd.append('image_car', image, image.name);
    console.log(fd)
     return this.http.post<any>(this.API_IMAGE_UPLOAD,fd).pipe(map(result =>{
       const img = result['img_url']
       console.log(result['img_url']);
       
             return img
 
       }
      )
     )
   }


  AddOrders(uid:string, name, city, email, phone, brand, year, model, mfrName, vin, image_url){
    console.log(mfrName)
    const order = {
      "uid": uid,
      "Customer": name,
      "City": city,
      "Email": email,
      "Phone": phone,
      "Brand": brand,
      "Year": year,
      "Model": model,
      "VIN": vin,
      "Manufacturer": mfrName,
      "image_url" : image_url
    } 

console.log(order);
    return this.http.post<any>(`${this.API_ADD_ORDER}`, order).pipe(map(result =>{
      console.log(result);
      return result;
      }
     )
    )
  }

  deleteOwner(Userid:string, id:string){
    this.db.doc(`users/${Userid}/owners/${id}`).delete(); 
  } 

  addOwner(userId:string, fullName:string, carId:number, carCompany:string, carModel:string, carYear:number){
    const owner = {fullName:fullName, carId:carId,carCompany:carCompany, carModel:carModel,carYear:carYear}; 
    this.userCollection.doc(userId).collection('owners').add(owner);
  }

  updateOwner(userId:string,id:string, fullName:string, carId:number, carCompany:string, carModel:string, carYear:number){
    this.db.doc(`users/${userId}/owners/${id}`).update(
      {
        fullName:fullName, 
        carId:carId,
        carCompany:carCompany, 
        carModel:carModel,
        carYear:carYear
      }
    )
  }

}
