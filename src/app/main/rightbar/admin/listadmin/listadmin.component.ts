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
  adminList:Admin[]=[];
roleList:Role[]=[];
   ngOnInit() {
 this.admiListInit();
  }
 
 admiListInit(){
//初始化roleList
  $.get(myUtils.getDomain()+"/role/list",(rld)=>{
         sessionStorage.setItem("roleList",JSON.stringify(rld));
           this.roleList=rld;
  //初始化adminList
  $.get(myUtils.getDomain()+"/admin/list",(ald)=>{
         sessionStorage.setItem("adminList",JSON.stringify(ald));
           this.adminList=ald;

     });
       });
 }
  
  toggleListAdminValue="添加员工";
admin:Admin=new Admin('','','','','','','','');//添加员工的admin
 // 切换员工管理
  toggleListAdmin(){
   if(this.toggleListAdminValue=="添加员工"){
     this.toggleListAdminValue="员工列表";
   } else{
      this.admiListInit();
     this.toggleListAdminValue="添加员工";
   }
  }
  //新增员工
  saveAdmin(){
  console.log(this.admin.role_id)
   $.post(myUtils.getDomain()+"/admin/add",
   {
     name:this.admin.name,
     cellPhone:this.admin.cell_phone,
     password:this.admin.password,
     roleId:this.admin.role_id,
     email:this.admin.email
     },
   (data)=>{
           if(data&&data.code==200){
             this.admin=new Admin('','','','','','','','');
             myUtils.myLoadingToast("添加成功");
           }    
       });
  }
  /**
   * 修改
   */
  updateAdmin(admin){

  }
  /**
   * 删除
   */
  delAdmin(admin){
     myUtils.myConfirm("确认删除吗?",()=>{
    $.get(myUtils.getDomain()+"/admin/"+admin.admin_id+"/delete",(d)=>{
        if(d&&d.code==200){
          this.adminList.forEach(element => {
            if(element.admin_id==admin.admin_id){
              this.adminList.splice(this.adminList.indexOf(admin),1);
              sessionStorage.setItem("adminList",JSON.stringify(this.adminList));
            }
          });
        }
     });
     });
  }
 }