import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @ViewChild('frm') myform:NgForm;

  id:string;
  gender:string[];
  studentObj:object = {};

  constructor(private _http:HttpClient, private route:Router, private router:ActivatedRoute) { }

  register(frm){
    console.log(frm);
    this.studentObj = {
      name: frm.sname,
      email: frm.semail,
      password: frm.spwd,
      mobile: frm.scontact,
      gender: frm.sgender,
      edu: frm.sedu
    }

    // if(frm.user == "student"){
      this._http.post("http://localhost:3000/Student", this.studentObj).subscribe(
        () => {
          alert("Student added successfully");
        }
      );
    // }
    // else{
    //   this._http.post("http://localhost:3000/admin", this.studentObj).subscribe(
    //   () => {
    //     alert("Admin added successfully");
    //   }
    // );
    // }
    
    this.myform.reset();
    if(this.id == 'login'){
      this.route.navigate(['/']);
    }
    else
    {
      this.route.navigate(['/manage_user']);
    }
    
    
  }
  ngOnInit() {
    this.router.params.subscribe(
      params => {
        this.id = params['id'];
      }
    );
    this.gender = ["Male", "Female", "Transgender"];
  }

}
