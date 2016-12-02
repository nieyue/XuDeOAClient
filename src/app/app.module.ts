import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { AppRoutingModule }    from './app-routing.module';
import { MycommonModule }    from './common/mycommon.module';

import { AppComponent }   from './app.component';//主组件
import { IndexComponent }   from './index/index.component';//首页组件

import { AuthLoginService }   from './service/authlogin.service';//是否登录服务
import { AuthJurisdictionService } from './service/authjurisdiction.service';//权限服务
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
AuthLoginService,
AuthJurisdictionService
    ],
  bootstrap: [
    AppComponent]
  
})
export class AppModule { 
  
}
