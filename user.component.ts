import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Car } from '../car';
import { ApiService } from '../shared/api.service';
import { CoreService } from '../shared/core.service';
import { Users } from '../users';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  filter!: any;
  name!: any;
  formValue!: FormGroup
  
  showAdd!: boolean;
  showUpdate!: boolean;
  usermodelobj: Users = new Users();
  user: Users[] = [];
  user1: Users[] = [];
  id1:any
  name1:any
  mobile1:any
  address1:any
  salary1:any

  constructor(private fb: FormBuilder, private api: ApiService, private core:CoreService) {}

  ngOnInit(): void {
    this.formValue = this.fb.group({
      id: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{1}$")]],
      name: ['', [Validators.required, Validators.pattern("[a-zA-Z][a-zA-Z ]+")]],
      mobile: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      address: ['', [Validators.required, Validators.pattern("[a-zA-Z][a-zA-Z ]+")]],
      salary: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{5}$")]],
    });
    this.getAllUser();
  }

  onSearch() {
    if (this.name == '') {
      this.ngOnInit();
    }
    console.log(this.filter);

    if (this.filter == 'name') {
      var v: Users[] = this.user1;
      this.user = v.filter((res) => {
        return res.name
          .toLocaleLowerCase()
          .match(this.name.toLocaleLowerCase());
      });
    }
    if (this.filter == 'id') {
      var v: Users[] = this.user1;
      this.user = v.filter((res) => {
        return res.id.toString().match(this.name.toLocaleLowerCase());
      });
    }
    if (this.filter == 'mobile') {
      var v: Users[] = this.user1;
      this.user = v.filter((res) => {
        return res.mobile
          .toString()
          .toLocaleLowerCase()
          .match(this.name.toLocaleLowerCase());
      });
    }
    if (this.filter == 'address') {
      var v: Users[] = this.user1;
      this.user = v.filter((res) => {
        return res.address
          .toString()
          .toLocaleLowerCase()
          .match(this.name.toLocaleLowerCase());
      });
    }
  }

  Filter() {
    console.log(this.filter);
  }

  Add() {
    this.showAdd = true;
    this.showUpdate = false;
  }
  Update(row: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.usermodelobj.id = row.id;
    this.formValue.controls['id'].setValue(row.id);
    this.formValue.controls['name'].setValue(row.name);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['address'].setValue(row.address);
    this.formValue.controls['salary'].setValue(row.salary);
  }

  onEdit() {
    // // this.user.forEach((e) => {
    // //   this.user1.forEach((f)=>{
    // //     if(e.name == f.name){
    // //       alert('jnd')
    // //     }
    // //   })
      
    // });
    this.usermodelobj.id = this.formValue.value.id;
    this.usermodelobj.name = this.formValue.value.name;
    this.usermodelobj.mobile = this.formValue.value.mobile;
    this.usermodelobj.address = this.formValue.value.address;
    this.usermodelobj.salary = this.formValue.value.salary;

    this.api.updateuser(this.usermodelobj.id, this.usermodelobj).subscribe(
      (res) => {
        console.log(res);
        alert('updated');
        this.formValue.reset();
        let ref = document.getElementById('cancle');
        ref?.click();
        this.getAllUser();
      },
      (err) => {
        alert('wrong');
      }
    );
  }

  onDelete(row: any) {
    if (confirm('Are you sure you want to delete')) {
      this.api.deleteuser(row.id).subscribe((res) => {
        alert('delete');
        this.getAllUser();
      });
    }
  }

  onSubmit() {
    // this.user.forEach((e) => {
    //     this.user1.forEach((f)=>{
    //       if(e.name == f.name){
    //         alert('existing')
    //       }
    //     })
        
    //   });
    this.usermodelobj.id = this.formValue.value.id;
    this.usermodelobj.name = this.formValue.value.name;
    this.usermodelobj.mobile = this.formValue.value.mobile;
    this.usermodelobj.address = this.formValue.value.address;
    this.usermodelobj.salary = this.formValue.value.salary;

    this.api.postuser(this.usermodelobj).subscribe(
      (res) => {
        console.log(res);
        this.core.openSnackBar(
          'Employee detail updated!',
          'done'
        );
        this.formValue.reset();
        let ref = document.getElementById('cancle');
        ref?.click();
        this.getAllUser();
      },
      (err) => {
        alert('wrong');
      }
    );
  }

  getAllUser() {
    this.api.getuser().subscribe((res) => {
      this.user = res;
      this.user1 = res;
    });
  }
}
