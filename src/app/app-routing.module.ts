import { NgModule }      from '@angular/core';
import { Routes, RouterModule,PreloadAllModules } from '@angular/router';
import { MainRoutingModule }   from './main/main-routing.module';//主路由模块

import { AppComponent }   from './app.component';//主组件
import { IndexComponent }   from './index/index.component';//首页组件

import { ErrorComponent }   from './error/error.component';//error页面

import { AuthLoginService }   from './service/authlogin.service';//是否登录服务

const appRoutes: Routes = [
  { path: 'index', component: IndexComponent },
  
  { path: 'main' ,
  loadChildren:'./main/main.module#MainModule',
  canActivate: [AuthLoginService]
  },
  { path: '', component: IndexComponent }
];
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes
,{useHash:true,preloadingStrategy: PreloadAllModules }
)
    ],
    exports:[
        RouterModule
    ]
  
})
export class AppRoutingModule { 
  
}
