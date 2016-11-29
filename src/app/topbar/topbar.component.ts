import { Component ,OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
declare let myUtils:any;
@Component({
  selector: 'topbar',
  templateUrl:'topbar.component.html'
})
export class TopbarComponent implements OnInit{
     constructor(public router:Router){}
    alreadyLogin=false;//没有登录

     ngOnInit(){
    this.alreadyLogin=Boolean(localStorage.getItem("alreadyLogin"));

     }

   //退出成功
  loginOut(){
      var thisRouter=this.router;
    myUtils.myLoginOut("确认退出吗?",function(){
    localStorage.removeItem("alreadyLogin");
    thisRouter.navigate(['/index']);
    });
  }

 }