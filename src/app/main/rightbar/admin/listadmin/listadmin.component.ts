import { Component,OnInit,ViewChild} from '@angular/core';
import { Admin } from '../../../../bean/admin';//账户
import { Role } from '../../../../bean/role';//
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
}  from '@angular/router';
import { PaginationService } from '../../../../service/pagination.service';//分页服务
declare let myUtils: any;
declare let $: any;

@Component({
  selector: 'main-rightbar-admin-listadmin-update',
  templateUrl:'updateadmin.component.html'
})
//更新页面组件
export class UpdateadminComponent {

   admin:Admin=new Admin('','','','','','','','');//修改员工的admin
   roleList:Role[]=[];
   sessionAdmin:Admin=new Admin('','','','','','','','');//当前登录的admin;

  updateAdminSubmit(admin){
     $.post(myUtils.getDomain()+"/admin/update/all",
    {
      adminId:this.admin.admin_id,
      name:this.admin.name,
      email:this.admin.email,
      cellPhone:this.admin.cell_phone,
      password:this.admin.password,
      createDate:this.admin.create_date,
      lastLoginDate:this.admin.last_login_date,
      roleId:this.admin.role_id
    },
    (data)=>{
      if(data&&data.code==200){
        myUtils.myLoadingToast("更新成功");
        $("#myModalClose").click();
      return;
      }
    });
  }
}

@Component({
  selector: 'main-rightbar-admin-listadmin',
  templateUrl:'listadmin.component.html'
})
//主组件
export class ListadminComponent implements OnInit{
  adminList:Admin[]=[];//管理员列表
  roleList:Role[]=[];//角色列表
 sessionAdmin:Admin;//当前管理员

 totalNumber:number=0;//总管理员数目
 showPageNumberArray:number[]=[];//显示页面循环的数组 类似 1,2,3,4,5
 totalPage:number=0;//总页数

 currentPage:number=1;//当前页
 pageNumber:number=10;//每页显示数目
 mostShowPageNumber:number=5;//设定最多显示页码数目

 showAdminListIcon=true;


@ViewChild(UpdateadminComponent)
private updateadminComponent :UpdateadminComponent;

constructor(private router :Router,private paginationService:PaginationService){}
   ngOnInit() {

 this.admiListInit();
//初始化roleList
this.roleList=JSON.parse(sessionStorage.getItem("roleList"));
this.sessionAdmin=JSON.parse(sessionStorage.getItem("admin"));

 }
 //点击哪页显示哪页
toPage(content){
  if(this.paginationService.toPage(content,this.currentPage,this.totalPage)){
  this.showAdminListIcon=true;
  this.currentPage=this.paginationService.currentPage;
  this.admiListInit();
  }
}
 admiListInit(){
    //初始化总条数
   $.get(myUtils.getDomain()+"/admin/count",(cd)=>{
          this.totalNumber=cd;             
           //页码初始化
          this.totalPage=this.paginationService.getTotalPage(this.totalNumber,this.pageNumber);//总页码数目     
          this.showPageNumberArray=this.paginationService.getShowPageNumber(this.totalPage,this.pageNumber,this.mostShowPageNumber,this.currentPage);//显示页码数目 
  //初始化adminList
  $.get(myUtils.getDomain()+"/admin/list?pageNum="+((this.currentPage-1)*this.pageNumber+1)+"&pageSize="+this.pageNumber,(ald)=>{
         sessionStorage.setItem("adminList",JSON.stringify(ald));
           this.adminList=ald;
           this.showAdminListIcon=false;
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
    admin.password="";//清空密码值
  this.updateadminComponent.admin=admin;
  this.updateadminComponent.sessionAdmin=this.sessionAdmin;
  this.updateadminComponent.roleList=this.roleList;
    $("#modalClick").off().click();
  }
  /**
   * 删除
   */
  delAdmin(admin){
     myUtils.myConfirm("确认删除吗?",()=>{
    $.get(myUtils.getDomain()+"/admin/"+admin.admin_id+"/delete",(d)=>{
        if(d&&d.code==200){
          myUtils.myLoadingToast("删除成功");      
              this.showAdminListIcon=true;
              this.currentPage=this.paginationService.currentPage;
              this.admiListInit();
        }
     });
     });
  }
 }