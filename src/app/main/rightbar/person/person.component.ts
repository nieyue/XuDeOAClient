import { Component,OnInit} from '@angular/core';
import { Validators,Validator,ValidatorFn} from '@angular/forms';
import { Admin} from '../../../bean/admin';
import { Role} from '../../../bean/role';
declare let myUtils: any;
declare let $: any;

@Component({
  selector: 'main-rightbar-person',
  templateUrl:'person.component.html'
})
export class PersonComponent implements OnInit{
  adminPassword={
    oldPassword:'',
    newPassword:'',
    renewPassword:''
  };
  //账户信息
 admin:Admin =new Admin('','','','','','','','');
role:Role;
  //更改渠道信息显示 默认不显示
showAdminInfoWrap:boolean=false;
    //提交按钮显示
adminInfoSubmitDisabled:boolean=false;
    //提交btn内容
adminInfoSubmitValue:string='保存更改';
//是否禁用Admininfo
isDisabledAdminInfo:boolean=false;

 

  //更改密码显示 默认不显示
showPasswordWrap:boolean=false;
    //提交按钮显示
passwordSubmitDisabled:boolean=false;
    //提交btn内容
passwordSubmitValue:string='保存更改';


  ngOnInit() {
   $("[data-toggle='tooltip']").tooltip();
   this.admin=JSON.parse(sessionStorage.getItem("admin"));
   this.role=JSON.parse(sessionStorage.getItem("role"));
  }
  //点击切换显示保存渠道信息
  showAdminInfo(){
      this.showAdminInfoWrap=!this.showAdminInfoWrap;
  }
  //点击切换显示修改密码
     changePassword( ){
     this.showPasswordWrap=!this.showPasswordWrap;
      }


//修改渠道信息提交
  saveAdminInfo(){
    this.adminInfoSubmitDisabled=true;
    this.adminInfoSubmitValue='保存中...';
   myUtils.myPrevToast("保存中...",()=>{
    $.post(myUtils.getDomain()+"/admin/update",
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
      this.adminInfoSubmitDisabled=false;
       this.adminInfoSubmitValue='保存更改';
      if(data&&data.code==200){
        sessionStorage.setItem("admin",JSON.stringify(this.admin));
      myUtils.myPrevToast("保存成功",null,"remove");
      return;
      }
       myUtils.myPrevToast("保存失败",null,"remove");
    });

   },"add");
    
  }
      //修改密码提交
    passwordSubmit(){
    this.passwordSubmitDisabled=true;
    this.passwordSubmitValue='保存中...';
   myUtils.myPrevToast("保存中...",()=>{
    $.post(myUtils.getDomain()+"/admin/update/password",
    {
     
      adminId:this.admin.admin_id,
      password:this.adminPassword.oldPassword,
      newpassword:this.adminPassword.newPassword
    },
    (data)=>{
       this.passwordSubmitDisabled=false;
       this.passwordSubmitValue='保存更改';
      if(data&&data.code==200){
        this.admin.password=this.adminPassword.newPassword;
        sessionStorage.setItem("admin",JSON.stringify(this.admin));
        myUtils.myPrevToast("保存成功",null,"remove");
        this.adminPassword.oldPassword="";
        this.adminPassword.newPassword="";
        this.adminPassword.renewPassword="";
      return;
      }
      if(data&&data.code==40000){
        myUtils.myPrevToast("保存失败",null,"remove");
        return;
      }
    });

   },"add");
    }  

 }