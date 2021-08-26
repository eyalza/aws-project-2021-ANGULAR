import { Sales } from './interfaces/sales';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SalesRaw } from './interfaces/sales-raw';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SaleService {
  private URL = "https://vpic.nhtsa.dot.gov/api/vehicles/GetMakeForManufacturer/"; 
  private IMP = "?format=json"; 

  constructor(private http:HttpClient) { }

  searchMfrData(make:string):Observable<Sales>{
    console.log(1223);

    console.log(make);

    return this.http.get<SalesRaw>(`${this.URL}${make}?format=json`).pipe(
      map(data => this.transformSalesData(data)),
      catchError(this.handleError)
    )}


    private handleError(res:HttpErrorResponse){
      console.log(res.error);
      return throwError(res.error || 'Server erorr'); 
    }
    
    private transformSalesData(data:SalesRaw):Sales{
      console.log(data);



      return {
        mfrName:data.Results[0].Mfr_Name,
        makeid:data.Results[0].Make_ID
      } 
    }

}
