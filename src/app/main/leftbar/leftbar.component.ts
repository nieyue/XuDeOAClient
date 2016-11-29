import { Component,OnInit} from '@angular/core';
declare let myUtils: any;
declare let $: any;
import { Router,Routes, RouterModule,PreloadAllModules } from '@angular/router';

@Component({
  selector: 'main-leftbar',
  templateUrl:'leftbar.component.html'
})
export class LeftbarComponent implements OnInit{
 leftbars:Object[]=[
   {menu:'个人信息',leftRouter:'/main/person'},
   {menu:'员工管理',leftRouter:'/main/admin'},
   {menu:'手机管理',leftRouter:'/main/phone'},
   {menu:'手机号码管理',leftRouter:'/main/phonenumber'},
   {menu:'问题管理',leftRouter:'/main/problem'},
   {menu:'任务管理',leftRouter:'/main/task'},
   {menu:'临时工作管理',leftRouter:'/main/temporarywork'}
   ];//后台左侧菜单数据/路由
 isClick:Object;//菜单点击按钮
  ngOnInit() {
    myUtils.myLoadingToast("加载中...",null);
    this.isClick=this.leftbars[0];
  }
  constructor(public router:Router){}
  admin:Object={role:"14"};
  checkLeftBar(leftbar){//点击菜单
    //个人管理
    if(leftbar==this.leftbars[0]){
    this.isClick=leftbar;
    this.router.navigate(['/main/person']);
    return;
    }  
    //员工管理
    if(leftbar==this.leftbars[1]){
      if(this.admin.role=="142"){
      myUtils.myLoadingToast("没有权限");
      return false;
      }
      this.isClick=leftbar;
      this.router.navigate(['/main/admin']);
      return;
    }
    //手机管理
    if(leftbar==this.leftbars[2]){
      this.isClick=leftbar;
      this.router.navigate(['/main/phone']);
      return;
    }
    //手机号码管理
    if(leftbar==this.leftbars[3]){
      this.isClick=leftbar;
      this.router.navigate(['/main/phonenumber']);
      return;
    }
    //问题管理
    if(leftbar==this.leftbars[4]){
this.isClick=leftbar;
this.router.navigate(['/main/problem']);
return;
    }  
    //任务管理
    if(leftbar==this.leftbars[5]){
this.isClick=leftbar;
this.router.navigate(['/main/task']);
return;
    }  
    //临时工作管理
    if(leftbar==this.leftbars[6]){
this.isClick=leftbar;
this.router.navigate(['/main/temporarywork']);
return;
    }  
  }
 }