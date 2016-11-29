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
import {TopbarComponent } from '../topbar/topbar.component';
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
export class IndexComponent implements OnInit,AfterViewInit {
    alreadyLogin=false;//没有登录
    
    @ViewChild(TopbarComponent)
  private topbarComponent: TopbarComponent;
    ngAfterViewInit(){
      
    }
ngOnInit(){
  if(localStorage.getItem("alreadyLogin")){
  this.alreadyLogin=Boolean(localStorage.getItem("alreadyLogin"));
  }
}

   
    loginValue="登录";
    backGray:string;
    loginDisabled:boolean=false;
    constructor(public router:Router){}
   //登录成功
   login(){
     console.log(this)
    this.loginDisabled=true;
  this.loginValue="登录中...";
  var thisrouter=this.router;
  //this.dis=true;
   setTimeout(function(){
  thisrouter.navigate(['/main/person']);
     this.alreadyLogin=true;//已经登录
     localStorage.setItem("alreadyLogin",this.alreadyLogin);
   },1000);
   }
   //直接进入后台
   goMain(){
     this.router.navigate(['/main/person']);
   }
   //退出
   loginOut(){
     //var $this=this;
    myUtils.myConfirm("确认退出吗?",()=>{
    localStorage.removeItem("alreadyLogin");
     this.alreadyLogin=false;
      this.router.navigate(['/index']);
    });
   }

 }