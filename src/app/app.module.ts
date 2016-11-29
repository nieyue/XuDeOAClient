import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { AppRoutingModule }    from './app-routing.module';
import { MycommonModule }    from './common/mycommon.module';

import { AppComponent }   from './app.component';//主组件
import { IndexComponent }   from './index/index.component';//首页组件

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    MycommonModule
    ],
  declarations: [
    AppComponent,
    IndexComponent
    ],
  bootstrap: [
    AppComponent]
  
})
export class AppModule { 
  
}
