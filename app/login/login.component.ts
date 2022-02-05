import { Component, OnInit,  ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Stud } from '../student';
import { DataService } from '../service/data.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('frm') myForm:NgForm
  exist:boolean = true;
  errorMsg:string = "Invalid username or password";
  data = [];
  constructor(private _http:HttpClient, private router:Router,private dataService:DataService) { }

  login(frm){
    console.log(frm);
    if(frm.user == "student"){
      this._http.get<Stud[]>("http://localhost:3000/Student").subscribe(
      (res) => {
      this.data = res;
      //console.log(this.data);
     for(var i = 0; i < this.data.length; i++){
           if(this.data[i].email == frm.uname && this.data[i].password == frm.upass){
          sessionStorage.setItem('uname',this.data[i].name);
          sessionStorage.setItem('user',frm.user);
           //this.router.navigate(['/exam_form']);
         this.dataService.isLogin(frm.user);
             this.exist = true;
            }
          else{
            this.exist = false;
             this.myForm.reset();
            }
         }
       }
     )
    }
    else{
      this._http.get<Stud[]>("http://localhost:3000/Admin").subscribe(
      (res) => {
      this.data = res;
      //console.log(this.data);
     for(var i = 0; i < this.data.length; i++){
           if(this.data[i].email == frm.uname && this.data[i].password == frm.upass){
         // localStorage.setItem('uname',frm.uname);
         sessionStorage.setItem('uname',this.data[i].name);
         sessionStorage.setItem('user',frm.user);
          //this.router.navigate(['/dashboard']);
         this.dataService.isLogin(frm.user);
             this.exist = true;
            }
          else{
            this.exist = false;
             this.myForm.reset();
            }
         }
       }
     )
    }
    
  }
  ngOnInit() {

    this.dataService.isLogout();
  }

}
