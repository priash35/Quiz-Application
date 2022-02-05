import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from '../question';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {

  id:string;
  data = [];
  ques = [];
  quizres = [];
  q:object[] = [];
  correct:number = 0;
  exist:boolean = true;
  exam_name:string;
  constructor(private _http:HttpClient, private route:ActivatedRoute, private router:Router) { }

  result(frm){
    console.log(frm);
    // this.q = frm;
    let i:number;
  //   var max = this.data.reduce(function(prev, current) {
  //     return (prev.y > current.y) ? prev : current
  // })
    //  console.log(Number(Math.max(...this.data.map(o => o.y), 0)));
    // console.log(len);
    var maxid = 0;

this.ques.map(function(obj){     
    if (obj.id > maxid) maxid = obj.id;    
});
console.log(maxid);
    console.log(this.q);
    console.log(this.data);
    for(i = 0; i <= Number(maxid); i++){
      //console.log(this.q[i+1]);
      if(this.ques[i].ans === this.q[i+1]){
        this.correct++;
      }
    }
    console.log(this.correct);
   
  }
  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.id = params['ecode'];
      }
    );
    this._http.get<Question[]>("http://localhost:3000/Questions").subscribe(
      (res) => {
        this.data = res;
        for(let i=0; i<this.data.length; i++){
          if(this.data[i].exam_code == this.id){
            this.exist = true;
            this.ques.push(this.data[i]);
            //this.ques[i] = this.data[i];
          }
          else{
            this.exist = false;
          }
        }
      }
      
    );
  }

}
