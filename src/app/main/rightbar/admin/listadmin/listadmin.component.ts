import { Component,OnInit} from '@angular/core';
import { Admin } from '../../../../bean/admin';//账户
import { Role } from '../../../../bean/role';//
declare let myUtils: any;
declare let $: any;

@Component({
  selector: 'main-rightbar-admin-listadmin',
  templateUrl:'listadmin.component.html'
})
export class ListadminComponent implements OnInit{
   ngOnInit() {
 //this.roleList=JSON.parse(sessionStorage.getItem("role"));
  $.get(myUtils.getDomain()+"/role/list",(data)=>{
         sessionStorage.setItem("roleList",JSON.stringify(data));
           this.roleList=data;
       });
  }
  toggleListAdminValue="添加员工";
admin:Admin=new Admin('','','','','','','','');
roleList:Role[];
 // 切换员工管理
  toggleListAdmin(){
   if(this.toggleListAdminValue=="添加员工"){
     this.toggleListAdminValue="员工列表";
   } else{
     this.toggleListAdminValue="添加员工";
   }
  }
  //新增员工
  saveAdmin(){
  console.log(this.admin.role_id)
  }
 }