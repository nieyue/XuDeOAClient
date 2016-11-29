import { NgModule }      from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { TopbarComponent }   from '../topbar/topbar.component';//头部组件
import { FooterComponent }   from '../footer/footer.component';//footer页面
import { ErrorComponent }   from '../error/error.component';//error页面
@NgModule({
  imports: [
    CommonModule,
    FormsModule
    ],
  declarations: [
    TopbarComponent,
    FooterComponent,
    ErrorComponent
    ],
    exports:[ 
    TopbarComponent,
    FooterComponent,
    ErrorComponent 
      ]
  
})
export class MycommonModule { 
  
}
