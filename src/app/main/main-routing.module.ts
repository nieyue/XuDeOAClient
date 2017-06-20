import { NgModule }      from '@angular/core';
import { Routes, RouterModule,PreloadAllModules } from '@angular/router';

import { MainComponent } from '../main/main.component';
import { AdminComponent }   from '../main/rightbar/admin/admin.component';//主页右边员工组件
import { ListroleComponent }   from '../main/rightbar/admin/listrole/listrole.component';//主页右边角色组件
import { ListjurisdictionComponent }   from '../main/rightbar/admin/listjurisdiction/listjurisdiction.component';//主页右边权限组件
import { ListadminComponent }   from '../main/rightbar/admin/listadmin/listadmin.component';//主页右边员工列表组件
import { PhoneComponent}   from '../main/rightbar/phone/phone.component';//主页右边手机列表组件
import { PhonenumberComponent}   from '../main/rightbar/phonenumber/phonenumber.component';//主页右边手机号码组件
import { ProblemComponent}   from '../main/rightbar/problem/problem.component';//主页右边问题组件
import {  TaskComponent}   from '../main/rightbar/task/task.component';//主页右边任务组件
import { TemporaryworkComponent}   from '../main/rightbar/temporarywork/temporarywork.component';//主页右边临时工作组件
import {PersonComponent }   from '../main/rightbar/person/person.component';//主页右边个人信息组件
import {  WebstatisticsComponent}   from '../main/rightbar/webstatistics/webstatistics.component';//主页右网站统计组件
import {  PromotionstatisticsComponent}   from '../main/rightbar/promotionstatistics/promotionstatistics.component';//主页右推广统计组件

import { RoleService } from '../service/role.service';//权限服务
import { AuthLoginService }   from '../service/authlogin.service';//是否登录服务

const mainRoutes: Routes = [ 
     { path: '' ,component: MainComponent,
  canActivate: [AuthLoginService],
  children:[
{path:'person',component:PersonComponent},
{path:'admin',component:AdminComponent
,canActivate:[RoleService]
,
    children:[
      {path:'listrole',component:ListroleComponent},
      {path:'listjurisdiction',component:ListjurisdictionComponent},
      {path:'listadmin',component:ListadminComponent},
      {path:'',component:ListadminComponent}
    ]
    },

{path:'phone',component:PhoneComponent},

{path:'phonenumber',component:PhonenumberComponent},
{path:'problem',component:ProblemComponent},
{path:'task',component:TaskComponent},
{path:'temporarywork',component:TemporaryworkComponent},
{path:'webstatistics',component:WebstatisticsComponent},
{path:'promotionstatistics',component:PromotionstatisticsComponent},
{path:'',component:AdminComponent}
  ]}
];

@NgModule({
  imports: [
    RouterModule.forChild(mainRoutes
)],
    exports:[
        RouterModule
    ]
})
export class MainRoutingModule { 
  
}
