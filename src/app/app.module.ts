import { NgModule ,Injectable }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule, JsonpModule,BrowserXhr  } from '@angular/http';
import { AppRoutingModule }    from './app-routing.module';
import { MycommonModule }    from './common/mycommon.module';

import { AppComponent }   from './app.component';//主组件
import { IndexComponent }   from './index/index.component';//首页组件

import { AuthLoginService }   from './service/authlogin.service';//是否登录服务
import { RoleService } from './service/role.service';//角色服务
import { PaginationService } from './service/pagination.service';//分页服务
import { CorsBrowserXhrService } from './service/corsbrowserxhr.service';//ajax服务


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    AppRoutingModule,
    MycommonModule
    ],
  declarations: [
    AppComponent,
    IndexComponent
    ],
    providers:[
        {provide: BrowserXhr,useClass:CorsBrowserXhrService},
   CorsBrowserXhrService,
  AuthLoginService,
  PaginationService,
  RoleService
    ],
  bootstrap: [
    AppComponent]
  
})
export class AppModule { 
   
}
