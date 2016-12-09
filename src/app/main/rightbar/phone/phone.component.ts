import { Component,OnInit,ViewChild} from '@angular/core';
import { Phone } from '../../../bean/phone';
import { Role } from '../../../bean/role';
import { Admin } from '../../../bean/admin';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PaginationService } from '../../../service/pagination.service';//分页服务
declare let myUtils: any;
declare let $: any;

@Component({
  selector: 'main-rightbar-phone-update',
  templateUrl:'updatephone.component.html'
})
//更新页面组件
export class UpdatephoneComponent {

   phone:Phone=new Phone('','','','','','','','');//修改员工的手机
   roleList:Role[]=[];
   sessionAdmin:Admin=new Admin('','','','','','','','');//当前登录的admin;
    
  updatePhoneSubmit(){
     $.post(myUtils.getDomain()+"/phone/update",
    {
      phoneId:this.phone.phone_id,
      type:this.phone.type,
      number:this.phone.number,
      iemi:this.phone.iemi,
      mac:this.phone.mac,
      inventorySituation:this.phone.inventory_situation,
      createDate:this.phone.create_date,
      updateDate:this.phone.update_date
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
  selector: 'main-rightbar-phone',
  templateUrl:'phone.component.html'
})
export class PhoneComponent implements OnInit{
  phoneList:Phone[]=[];
  roleList:Role[]=[];
   sessionAdmin:Admin;//当前管理员

totalNumber:number=0;//总管理员数目
 showPageNumberArray:number[]=[];//显示页面循环的数组 类似 1,2,3,4,5
 totalPage:number=0;//总页数

 currentPage:number=1;//当前页
 pageNumber:number=10;//每页显示数目
 mostShowPageNumber:number=5;//设定最多显示页码数目

  showPhoneListIcon=true;//显示数据前的icon

@ViewChild(UpdatephoneComponent)
private updatephoneComponent :UpdatephoneComponent;
  constructor( public router:Router,private paginationService:PaginationService){}
  ngOnInit() {
 this.phoneListInit();
 //初始化roleList
this.roleList=JSON.parse(sessionStorage.getItem("roleList"));
 this.sessionAdmin=JSON.parse(sessionStorage.getItem("admin"));
  }

  phoneListInit(){
       $.get(myUtils.getDomain()+"/phone/count",(cd)=>{
           this.totalNumber=cd;             
           //页码初始化
          this.totalPage=this.paginationService.getTotalPage(this.totalNumber,this.pageNumber);//总页码数目     
          this.showPageNumberArray=this.paginationService.getShowPageNumber(this.totalPage,this.pageNumber,this.mostShowPageNumber,this.currentPage);//显示页码数目 

        //初始化adminList
  $.get(myUtils.getDomain()+"/phone/list?pageNum="+((this.currentPage-1)*this.pageNumber+1)+"&pageSize="+this.pageNumber,(pld)=>{
         sessionStorage.setItem("phoneList",JSON.stringify(pld));
           this.phoneList=pld;
           this.showPhoneListIcon=false;
               });
       });
  }

  //点击哪页显示哪页
toPage(content){
  if(this.paginationService.toPage(content,this.currentPage,this.totalPage)){
  this.showPhoneListIcon=true;
  this.currentPage=this.paginationService.currentPage;
  this.phoneListInit();
  }
}

toggleListPhoneValue="添加手机";
phone:Phone=new Phone('','','','','','','','');//添加手机的Phone
 // 切换手机管理
  toggleListPhone(){
   if(this.toggleListPhoneValue=="添加手机"){
     this.toggleListPhoneValue="手机列表";
   } else{
      this.phoneListInit();
     this.toggleListPhoneValue="添加手机";
   }
  }

  //新增手机
  savePhone(){
   $.post(myUtils.getDomain()+"/phone/add",
   {
     type:this.phone.type,
     number:this.phone.number,
     iemi:this.phone.iemi,
     mac:this.phone.mac,
     inventory_situation:this.phone.inventory_situation
  
     },
   (data)=>{
           if(data&&data.code==200){
             this.phone=new Phone('','','','','','','','');
             myUtils.myLoadingToast("添加成功");
           }    
       });
  }

   /**
   * 修改
   */
 
  updatePhone(phone){
  this.updatephoneComponent.phone=phone;
   console.log(this.updatephoneComponent)
  this.updatephoneComponent.sessionAdmin=this.sessionAdmin;
  this.updatephoneComponent.roleList=this.roleList;
    $("#modalClick").off().click();
  }
  /**
   * 删除
   */
  delPhone(phone){
     myUtils.myConfirm("确认删除吗?",()=>{
    $.get(myUtils.getDomain()+"/phone/"+phone.phone_id+"/delete",(d)=>{
        if(d&&d.code==200){
          myUtils.myLoadingToast("删除成功");
              this.showPhoneListIcon=true;
              this.currentPage=this.paginationService.currentPage;
              this.phoneListInit();
        
          
        }
     });
     });
  }
 }