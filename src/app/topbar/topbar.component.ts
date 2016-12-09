import { Component ,OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {AuthLoginService } from '../service/authlogin.service';
import { Admin } from '../bean/admin';//账户
declare let myUtils:any;
@Component({
  selector: 'topbar',
  templateUrl:'topbar.component.html'
})
export class TopbarComponent implements OnInit{
     constructor(public router:Router,private authLoginService:AuthLoginService){}
    alreadyLogin=this.authLoginService.isLoggedIn;//没有登录
  admin:Admin;
     ngOnInit(){
    this.alreadyLogin=this.authLoginService.checkLogin("/");
    this.admin=JSON.parse(sessionStorage.getItem("admin"));
     }

   //退出成功
  loginOut(){
    myUtils.myLoginOut("确认退出吗?",()=>{
    this.authLoginService.logout();
    // sessionStorage.removeItem("alreadyLogin");
    //  sessionStorage.removeItem("admin");
    //  sessionStorage.removeItem("role");
     sessionStorage.clear();
    this.alreadyLogin=this.authLoginService.isLoggedIn;
    this.router.navigate(['/index']);
    });
  }
 }