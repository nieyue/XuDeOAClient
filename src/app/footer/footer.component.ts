import {
  Component,
  Input,
  trigger,
  state,
  style,
  transition,
  animate,
  AfterViewInit, ViewChild,
  OnInit
} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
declare let myUtils:any;
declare let $:any;
@Component({
  selector: 'footer',
  templateUrl:'footer.component.html'
})
export class FooterComponent{
   data;
//   setData(){
//   $.get("http://localhost/admin/login?adminName=15111336587&password=123123",(d)=>{
//     console.log(d)
//   });
//   }
//   getData(){
//  $.get("http://localhost/admin/1000",(d)=>{
//     this.data=d;
//     console.log(d)
//   });
//   }


 }