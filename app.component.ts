import { Component, OnInit } from '@angular/core';
import { Car } from './car';
import { ApiService } from './shared/api.service';
import { CoreService } from './shared/core.service';
import { Users } from './users';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'practice';

  cars:Car[]=[];
  user: Users[] = [];
  constructor( private core:CoreService, private api:ApiService){}

  ngOnInit(): void {
    this.getAllCar()
    this. getAllUser()
  }


  getAllCar(){
    this.core.getcar().subscribe((res)=>{
      this.cars = res;
    })
  }
  getAllUser() {
    this.api.getuser().subscribe((res) => {
      this.user = res;
    });
  }

  svb:boolean=false;
  showsavebtn(){
this.svb=true
  }

  sab:boolean=false;
  showassignbtn(){
    this.sab=true
  }
}
