import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-maker-form',
  templateUrl: './maker-form.component.html',
  styleUrls: ['./maker-form.component.css']
})
export class MakerFormComponent implements OnInit {
  
  makers:Object[] = [
    {id:1,name:'Toyota'},
    {id:3,name:'Honda'},
    {id:4,name:'Ford'},
    {id:5,name:'Chevrolet'},
    {id:7,name:'Volvo'},
    {id:8,name:'Fiat'},
    {id:9,name:'Kia'},
    {id:10,name:'Suzuki'}
    ]
  
    make:string;

    onSubmit(){
      this.router.navigate(['/manufacturer',this.make]); 
    }
    

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

}
