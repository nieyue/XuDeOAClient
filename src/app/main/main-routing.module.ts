import { NgModule }      from '@angular/core';
import { Routes, RouterModule,PreloadAllModules } from '@angular/router';

import { MainComponent } from '../main/main.component';
import { AdminComponent }   from '../main/rightbar/admin/admin.component';//主页右边员工组件
import { ListroleComponent }   from '../main/rightbar/admin/listrole/listrole.component';//主页右边角色组件
import { ListjurisdictionComponent }   from '../main/rightbar/admin/listjurisdiction/listjurisdiction.component';//主页右边权限组件
import { ListadminComponent }   from '../main/rightbar/admin/listadmin/listadmin.component';//主页右边员工列表组件
import { PhoneComponent}   from '../main/rightbar/phone/phone.component';//主页右边手机列表组件
import { WebsiteComponent }   from '../main/rightbar/website/website.component';//主页右边广告页面组件
import { AddwebsiteComponent }   from '../main/rightbar/website/addwebsite/addwebsite.component';//主页右边添加广告页面组件
import { ListwebsiteComponent }   from '../main/rightbar/website/listwebsite/listwebsite.component';//主页右边页面列表组件
import {PersonComponent }   from '../main/rightbar/person/person.component';//主页右边个人信息组件
import { AdvertisementComponent }   from '../main/rightbar/advertisement/advertisement.component';//主页右边广告组件

import { RoleService } from '../service/role.service';//权限服务

const mainRoutes: Routes = [ 
     { path: '' ,component: MainComponent,
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

{path:'phonenumber',component:PersonComponent},
{path:'problem',component:AdvertisementComponent},
{path:'task',component:AdvertisementComponent},
{path:'temporarywork',component:AdvertisementComponent},
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
