import { Component,OnInit} from '@angular/core';
declare let myUtils: any;
declare let $: any;
import { Router,Routes, RouterModule,PreloadAllModules } from '@angular/router';
import { Admin } from '../../bean/admin';
import { Role } from '../../bean/role';

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
 admin:Admin;
role:Role;
  ngOnInit() {
    myUtils.myLoadingToast("加载中...",null);
    this.isClick=this.leftbars[0];
    this.admin=JSON.parse(sessionStorage.getItem("admin"));
    this.role=JSON.parse(sessionStorage.getItem("role"));
  }
  constructor(public router:Router){}
  checkLeftBar(leftbar){//点击菜单
    this.isClick=leftbar;
    this.router.navigate([leftbar.leftRouter]);
  }
 }