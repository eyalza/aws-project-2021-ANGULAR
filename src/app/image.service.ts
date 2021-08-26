import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private path:string = 'https://firebasestorage.googleapis.com/v0/b/project2021-e649b.appspot.com/o/'; 
  public images:string[] = [];
  constructor() {
    console.log(555);
    this.images[448] = this.path + '1.png' + '?alt=media&token=5b49f7d0-a2b2-47d5-bea9-09ce75ee2622';
    this.images[452] = this.path + '2.jpg' + '?alt=media&token=7dcfe74d-4fd6-49fc-b20d-1d0e4434649e';
    this.images[474] = this.path + '3.png' + '?alt=media&token=1cc50e58-3ff4-4158-b875-c7db2b339308'; 
    this.images[460] = this.path + '4.png' + '?alt=media&token=e602f04e-8463-4dfc-a42c-223c100b54e9';
    this.images[10702] = this.path + '5.png' + '?alt=media&token=9c512c09-109f-4e83-b145-b57cb9f5b984';
    this.images[478] = this.path + '6.png' + '?alt=media&token=9ae8ae31-ff92-4066-95dc-346230ded646';
    this.images[485] = this.path + '7.jpg' + '?alt=media&token=ad00d84e-08d3-4754-aee8-a0e865f51f69';
    this.images[483] = this.path + '8.png' + '?alt=media&token=669781f7-2743-47cc-a8fe-289e966653e9';
    this.images[460] = this.path + '9.png' + '?alt=media&token=44fe9880-792c-4ceb-b404-97f12a889c4b';
    this.images[509] = this.path + '10.png' + '?alt=media&token=3428047b-4a9b-4d87-a2db-ce50808bd9d7';
   }
}
