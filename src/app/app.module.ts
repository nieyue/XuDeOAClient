import { NgModule ,Injectable }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule, JsonpModule ,BrowserXhr } from '@angular/http';
import { AppRoutingModule }    from './app-routing.module';
import { MycommonModule }    from './common/mycommon.module';

import { AppComponent }   from './app.component';//主组件
import { IndexComponent }   from './index/index.component';//首页组件

import { AuthLoginService }   from './service/authlogin.service';//是否登录服务
import { AuthJurisdictionService } from './service/authjurisdiction.service';//权限服务

@Injectable()  
export class CorsBrowserXhr extends BrowserXhr {  
    constructor() {  
        super();  
    }  
  
    build(): any {  
        let xhr:XMLHttpRequest = super.build();  
        xhr.withCredentials = true;  
        return <any>(xhr);  
    }  
} 

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
   { provide: BrowserXhr, useClass:CorsBrowserXhr },
AuthLoginService,
AuthJurisdictionService
    ],
  bootstrap: [
    AppComponent]
  
})
export class AppModule { 
   
}
