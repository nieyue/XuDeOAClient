import { NgModule }      from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { MainRoutingModule} from '../main/main-routing.module';
import { MycommonModule }    from '../common/mycommon.module';


import { MainComponent } from '../main/main.component';
import { LeftbarComponent }   from '../main/leftbar/leftbar.component';//主页左边组件
import { RightbarComponent }   from '../main/rightbar/rightbar.component';//主页右边组件
import { AdminComponent }   from '../main/rightbar/admin/admin.component';//主页右边员工组件
import { ListroleComponent }   from '../main/rightbar/admin/listrole/listrole.component';//主页右边角色组件
import { ListjurisdictionComponent}   from '../main/rightbar/admin/listjurisdiction/listjurisdiction.component';//主页右边权限组件
import { ListadminComponent ,UpdateadminComponent}   from '../main/rightbar/admin/listadmin/listadmin.component';//主页右边员工列表组件
import { PhoneComponent,UpdatephoneComponent}   from '../main/rightbar/phone/phone.component';//主页右边手机列表组件
import { PhonenumberComponent,UpdatephonenumberComponent}   from '../main/rightbar/phonenumber/phonenumber.component';//主页右边手机号码组件
import { ProblemComponent,UpdateproblemComponent}   from '../main/rightbar/problem/problem.component';//主页右边问题组件
import {  TaskComponent,UpdatetaskComponent}   from '../main/rightbar/task/task.component';//主页右边任务组件
import { TemporaryworkComponent,UpdatetemporaryworkComponent}   from '../main/rightbar/temporarywork/temporarywork.component';//主页右边临时工作组件
import {  WebstatisticsComponent,UpdatewebstatisticsComponent}   from '../main/rightbar/webstatistics/webstatistics.component';//主页右网站统计组件
import {  PromotionstatisticsComponent,UpdatepromotionstatisticsComponent}   from '../main/rightbar/promotionstatistics/promotionstatistics.component';//主页右推广统计组件
import {PersonComponent }   from '../main/rightbar/person/person.component';//主页右边个人信息组件


//import { RoleService } from '../service/role.service';//角色服务


import { RatioPipe } from '../pipe/ratio.pipe';//数值管道

@NgModule({
  imports: [
      CommonModule,
      FormsModule,
      HttpModule,
      JsonpModule,
      MainRoutingModule,
      MycommonModule
   ],
  declarations: [
       RatioPipe,
    MainComponent,
    LeftbarComponent,
    RightbarComponent,
    AdminComponent,
    ListroleComponent,
    ListjurisdictionComponent,
    ListadminComponent,
    UpdateadminComponent,
    PhoneComponent,
    UpdatephoneComponent,
    PhonenumberComponent,
    UpdatephonenumberComponent,
    ProblemComponent,
    UpdateproblemComponent,
    TaskComponent,
    UpdatetaskComponent,
    TemporaryworkComponent,
    UpdatetemporaryworkComponent,
    WebstatisticsComponent,
    UpdatewebstatisticsComponent,
    PromotionstatisticsComponent,
    UpdatepromotionstatisticsComponent,
    PersonComponent
    ]
    // , providers:[
    //   RoleService
    // ]
})
export class MainModule { 
  
}
