import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }


 

  postuser(data:any){
    return this.http.post<any>("http://localhost:3000/employee_data",data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  getuser(){
    return this.http.get<any>("http://localhost:3000/employee_data")
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  
  updateuser(id:number,data:any){
    return this.http.put<any>("http://localhost:3000/employee_data/"+id,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  deleteuser(id:number){
    return this.http.delete<any>("http://localhost:3000/employee_data/"+id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

 

 
}

