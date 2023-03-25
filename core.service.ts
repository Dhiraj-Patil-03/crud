import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CoreService {

  constructor(private http:HttpClient,private _snackBar: MatSnackBar) { }

  openSnackBar(message: string, action: string = 'OK') {
    this._snackBar.open(message, action, {
      duration: 3000,
      verticalPosition: 'bottom',
    });
  }
  getcar(){
    return this.http.get<any>("http://localhost:3000/car_data")
    .pipe(map((res:any)=>{
      return res;
    }))
  }
}
