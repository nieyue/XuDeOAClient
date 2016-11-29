import { NgModule }      from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { MainRoutingModule} from '../main/main-routing.module';
import { MycommonModule }    from '../common/mycommon.module';


import { MainComponent } from '../main/main.component';
import { LeftbarComponent }   from '../main/leftbar/leftbar.component';//主页左边组件
import { RightbarComponent }   from '../main/rightbar/rightbar.component';//主页右边组件
import { AdminComponent }   from '../main/rightbar/admin/admin.component';//主页右边员工组件
import { ListroleComponent }   from '../main/rightbar/admin/listrole/listrole.component';//主页右边角色组件
import { ListjurisdictionComponent }   from '../main/rightbar/admin/listjurisdiction/listjurisdiction.component';//主页右边权限组件
import { ListadminComponent }   from '../main/rightbar/admin/listadmin/listadmin.component';//主页右边员工列表组件
import { WebsiteComponent }   from '../main/rightbar/website/website.component';//主页右边广告页面组件
import { AddwebsiteComponent }   from '../main/rightbar/website/addwebsite/addwebsite.component';//主页右边添加广告页面组件
import { ListwebsiteComponent }   from '../main/rightbar/website/listwebsite/listwebsite.component';//主页右边页面列表组件
import {PersonComponent }   from '../main/rightbar/person/person.component';//主页右边个人信息组件
import { AdvertisementComponent }   from '../main/rightbar/advertisement/advertisement.component';//主页右边广告组件


import { WebsiteListService } from '../service/website.service';//网站服务
import { AdvertisementListService } from '../service/advertisement.service';//广告位服务

@NgModule({
  imports: [
      CommonModule,
      FormsModule,
      MainRoutingModule,
      MycommonModule
   ],
  declarations: [
    MainComponent,
    LeftbarComponent,
    RightbarComponent,
    AdminComponent,
    ListroleComponent,
    ListjurisdictionComponent,
    ListadminComponent,
    WebsiteComponent,
    AddwebsiteComponent,
    ListwebsiteComponent,
    PersonComponent,
    AdvertisementComponent
    ],
    providers:[
      WebsiteListService,
      AdvertisementListService
    ]
})
export class MainModule { 
  
}
