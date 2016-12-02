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
import {AuthLoginService } from '../service/authlogin.service';
import { Admin } from '../bean/admin';//账户
declare let myUtils:any;
declare let $:any;
@Component({
  selector: 'index',
  templateUrl:'index.component.html',
   animations: [
  trigger('flyInOut', [
    state('in', style({transform: 'translateX(0)'})),
    state('out', style({transform: 'translateX(-100%)'})),
    transition('in <=> out', [
      
      animate(100)
    ])
  ])
]
//   template:'index.component.html'
  
})
export class IndexComponent implements OnInit {
    //alreadyLogin=false;//没有登录
    alreadyLogin=this.authLoginService.isLoggedIn;;//没有登录
    adminLogin={adminName:'',password:''};
    admin:Admin;
  
    constructor(public authLoginService:AuthLoginService,public router:Router){

    }
ngOnInit(){
  this.alreadyLogin=this.authLoginService.checkLogin("/");
}

   
    loginValue="登录";
    backGray:string;
    loginDisabled:boolean=false;
   //登录
   login(){
    this.loginDisabled=true;
  this.loginValue="登录中...";
this.authLoginService.login(this.adminLogin.adminName,this.adminLogin.password).subscribe(
      response=>
      {this.admin=response,
        console.log(this.admin);
        if(this.admin && this.admin.admin_id){
       this.alreadyLogin = true;
     sessionStorage.setItem("alreadyLogin",JSON.stringify(this.alreadyLogin));
      this.loginDisabled=false;
      this.loginValue="登录";
       sessionStorage.setItem("admin",JSON.stringify(this.admin));
        $.get(myUtils.getDomain()+"/role/"+this.admin.role_id,(data)=>{
         sessionStorage.setItem("role",JSON.stringify(data));
         this.router.navigate(['/main/person']);//登陆成功
       });
     return;
        }
      this.loginDisabled=false;
      this.loginValue="登录";
     myUtils.myLoadingToast("账户或密码错误！");
     this.router.navigate(['/']);//登录失败
        }
    );
   }
   //直接进入后台
   goMain(){
     this.router.navigate(['/main/person']);
   }
   //退出
   loginOut(){
    myUtils.myConfirm("确认退出吗?",()=>{
    this.authLoginService.logout();
     //this.alreadyLogin=false;
     this.alreadyLogin=this.authLoginService.isLoggedIn;
      sessionStorage.removeItem("alreadyLogin");
      sessionStorage.removeItem("admin");
      sessionStorage.removeItem("role");
      this.router.navigate(['/index']);
    });
   }

 }