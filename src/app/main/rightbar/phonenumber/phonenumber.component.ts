import { Component,OnInit,ViewChild} from '@angular/core';
import { Phonenumber } from '../../../bean/phonenumber';
import { Role } from '../../../bean/role';
import { Admin } from '../../../bean/admin';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PaginationService } from '../../../service/pagination.service';//分页服务
declare let myUtils: any;
declare let $: any;

@Component({
  selector: 'main-rightbar-phonenumber-update',
  templateUrl:'updatephonenumber.component.html'
})
//更新页面组件
export class UpdatephonenumberComponent implements OnInit{

   phonenumber:Phonenumber=new Phonenumber('','','','','','','','','','','','','','','','','','','','','','','','');//修改手机号码
   roleList:Role[]=[];
   sessionAdmin:Admin=new Admin('','','','','','','','');//当前登录的admin;
    
    ngOnInit(){
      $(".form_datetime").datetimepicker({format: 'yyyy-mm-dd hh:ii:ss',
   	autoclose: true
});
 this.getDateTime("input[name='wechat_reg_date']","phonenumber","wechat_reg_date");
this.getDateTime("input[name='qq_reg_date']","phonenumber","qq_reg_date");
this.getDateTime("input[name='momo_reg_date']","phonenumber","momo_reg_date");
this.getDateTime("input[name='microblog_reg_date']","phonenumber","microblog_reg_date");

    }
    //动态获取datetimepicker,注入model
getDateTime(element,clazz,name){
  var _this=this;
  $(element).on("change",function(){
   _this[clazz][name]=$(this).val();
   });
}
  updatePhonenumberSubmit(){
     $.post(myUtils.getDomain()+"/phoneNumber/update",
    {
      phoneNumberId:this.phonenumber.phone_number_id,
      number:this.phonenumber.number,
      operatingEquipment:this.phonenumber.operating_equipment,
      robotEquipment:this.phonenumber.robot_equipment,
      ipAddress:this.phonenumber.ip_address,
      wechatNumber:this.phonenumber.wechat_number,
      wechatType:this.phonenumber.wechat_type,
      wechatPassword:this.phonenumber.wechat_password,
      wechatRegDate:this.phonenumber.wechat_reg_date,
      qqNumber:this.phonenumber.qq_number,
      qqType:this.phonenumber.qq_type,
      qqPassword:this.phonenumber.qq_password,
      qqRegDate:this.phonenumber.qq_reg_date,
      momoNumber:this.phonenumber.momo_number,
      momoType:this.phonenumber.momo_type,
      momoPassword:this.phonenumber.momo_password,
      momoRegDate:this.phonenumber.momo_reg_date,
      microblogNumber:this.phonenumber.microblog_number,
      microblogType:this.phonenumber.microblog_type,
      microblogPassword:this.phonenumber.microblog_password,
      microblogRegDate:this.phonenumber.microblog_reg_date,
      createDate:this.phonenumber.create_date,
      updateDate:this.phonenumber.update_date,
      remark:this.phonenumber.remark
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
  selector: 'main-rightbar-phonenumber',
  templateUrl:'phonenumber.component.html'
})
export class PhonenumberComponent implements OnInit{
  phonenumberList:Phonenumber[]=[];
  roleList:Role[]=[];
   sessionAdmin:Admin;//当前管理员
phonenumber:Phonenumber=new Phonenumber('','','','','动态','','','','','','','','','','','','','','','','','','','');//增加手机号码

totalNumber:number=0;//总管理员数目
 showPageNumberArray:number[]=[];//显示页面循环的数组 类似 1,2,3,4,5
 totalPage:number=0;//总页数

 currentPage:number=1;//当前页
 pageNumber:number=10;//每页显示数目
 mostShowPageNumber:number=5;//设定最多显示页码数目

  showPhonenumberListIcon=true;//显示数据前的icon

@ViewChild(UpdatephonenumberComponent)
private updatephonenumberComponent :UpdatephonenumberComponent;
  constructor( public router:Router,private paginationService:PaginationService){}
  ngOnInit() {
 this.phonenumberListInit();
 //初始化roleList
this.roleList=JSON.parse(sessionStorage.getItem("roleList"));
 this.sessionAdmin=JSON.parse(sessionStorage.getItem("admin"));
     //初始化datetimepicker
 $(".form_datetime").datetimepicker({format: 'yyyy-mm-dd hh:ii:ss',
   	autoclose: true
});
this.getDateTime("input[name='wechat_reg_date']","phonenumber","wechat_reg_date");
this.getDateTime("input[name='qq_reg_date']","phonenumber","qq_reg_date");
this.getDateTime("input[name='momo_reg_date']","phonenumber","momo_reg_date");
this.getDateTime("input[name='microblog_reg_date']","phonenumber","microblog_reg_date");
  }

//动态获取datetimepicker,注入model
getDateTime(element,clazz,name){
  var _this=this;
  $(element).on("change",function(){
   _this[clazz][name]=$(this).val();
   });
}
//初始化
  phonenumberListInit(){
       $.get(myUtils.getDomain()+"/phoneNumber/count",(cd)=>{
           this.totalNumber=cd;             
           //页码初始化
          this.totalPage=this.paginationService.getTotalPage(this.totalNumber,this.pageNumber);//总页码数目     
          this.showPageNumberArray=this.paginationService.getShowPageNumber(this.totalPage,this.pageNumber,this.mostShowPageNumber,this.currentPage);//显示页码数目 

        //初始化phoneList
  $.get(myUtils.getDomain()+"/phoneNumber/list?pageNum="+((this.currentPage-1)*this.pageNumber+1)+"&pageSize="+this.pageNumber,(pld)=>{
         sessionStorage.setItem("phonenumberList",JSON.stringify(pld));
           this.phonenumberList=pld;
           this.showPhonenumberListIcon=false;
               });
       });
  }

  //点击哪页显示哪页
toPage(content){
  if(this.paginationService.toPage(content,this.currentPage,this.totalPage)){
  this.showPhonenumberListIcon=true;
  this.currentPage=this.paginationService.currentPage;
  this.phonenumberListInit();
  }
}

toggleListPhonenumberValue="添加手机号";
//添加手机的phonenumber
 // 切换手机管理
  toggleListPhonenumber(){
   if(this.toggleListPhonenumberValue=="添加手机号"){
     this.toggleListPhonenumberValue="手机号列表";
   } else{
      this.phonenumberListInit();
     this.toggleListPhonenumberValue="添加手机号";
   }
  }

  //新增手机
  savePhonenumber(){
   $.post(myUtils.getDomain()+"/phoneNumber/add",
   {
      number:this.phonenumber.number,
      operatingEquipment:this.phonenumber.operating_equipment,
      robotEquipment:this.phonenumber.robot_equipment,
      ipAddress:this.phonenumber.ip_address,
      wechatNumber:this.phonenumber.wechat_number,
      wechatType:this.phonenumber.wechat_type,
      wechatPassword:this.phonenumber.wechat_password,
      wechatRegDate:this.phonenumber.wechat_reg_date,
      qqNumber:this.phonenumber.qq_number,
      qqType:this.phonenumber.qq_type,
      qqPassword:this.phonenumber.qq_password,
      qqRegDate:this.phonenumber.qq_reg_date,
      momoNumber:this.phonenumber.momo_number,
      momoType:this.phonenumber.momo_type,
      momoPassword:this.phonenumber.momo_password,
      momoRegDate:this.phonenumber.momo_reg_date,
      microblogNumber:this.phonenumber.microblog_number,
      microblogType:this.phonenumber.microblog_type,
      microblogPassword:this.phonenumber.microblog_password,
      microblogRegDate:this.phonenumber.microblog_reg_date,
      remark:this.phonenumber.remark
  
     },
   (data)=>{
           if(data&&data.code==200){
             this.phonenumber=new Phonenumber('','','','','','','','','','','','','','','','','','','','','','','','');
             myUtils.myLoadingToast("添加成功");
           }    
       });
  }

   /**
   * 修改
   */
 
  updatePhonenumber(phonenumber){
    console.log(this.updatephonenumberComponent)
  this.updatephonenumberComponent.phonenumber=phonenumber;
  this.updatephonenumberComponent.sessionAdmin=this.sessionAdmin;
  this.updatephonenumberComponent.roleList=this.roleList;
    $("#modalClick").off().click();
  }
  /**
   * 删除
   */
  delPhonenumber(phonenumber){
     myUtils.myConfirm("确认删除吗?",()=>{
    $.get(myUtils.getDomain()+"/phoneNumber/"+phonenumber.phone_number_id+"/delete",(d)=>{
        if(d&&d.code==200){
          myUtils.myLoadingToast("删除成功");
              this.showPhonenumberListIcon=true;
              this.currentPage=this.paginationService.currentPage;
              this.phonenumberListInit();
        
          
        }
     });
     });
  }
 
 }