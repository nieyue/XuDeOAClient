import { Component,OnInit,ViewChild} from '@angular/core';
import { Temporarywork } from '../../../bean/temporarywork';
import { Role } from '../../../bean/role';
import { Admin } from '../../../bean/admin';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PaginationService } from '../../../service/pagination.service';//分页服务
declare let myUtils: any;
declare let $: any;

@Component({
  selector: 'main-rightbar-temporarywork-update',
  templateUrl:'updatetemporarywork.component.html'
})
//更新页面组件
export class UpdatetemporaryworkComponent {

   temporarywork:Temporarywork=new Temporarywork('','','','','','','');//修改员工的手机
   roleList:Role[]=[];
   sessionAdmin:Admin=new Admin('','','','','','','','');//当前登录的admin;
    
  updateTemporaryworkSubmit(){
     $.post(myUtils.getDomain()+"/temporaryWork/update",
    {
      temporaryWorkId:this.temporarywork.temporary_work_id,
      phoneNumber:this.temporarywork.phone_number,
      workers:this.temporarywork.workers,
      task:this.temporarywork.task,
      taskSituation:this.temporarywork.task_situation,
      createDate:this.temporarywork.create_date,
      updateDate:this.temporarywork.update_date
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
  selector: 'main-rightbar-temporarywork',
  templateUrl:'temporarywork.component.html'
})
export class TemporaryworkComponent implements OnInit{
  temporaryworkList:Temporarywork[]=[];
  roleList:Role[]=[];
   sessionAdmin:Admin;//当前管理员

totalNumber:number=0;//总管理员数目
 showPageNumberArray:number[]=[];//显示页面循环的数组 类似 1,2,3,4,5
 totalPage:number=0;//总页数

 currentPage:number=1;//当前页
 pageNumber:number=10;//每页显示数目
 mostShowPageNumber:number=5;//设定最多显示页码数目

  showTemporaryworkListIcon=true;//显示数据前的icon

@ViewChild(UpdatetemporaryworkComponent)
private updatetemporaryworkComponent :UpdatetemporaryworkComponent;
  constructor( public router:Router,private paginationService:PaginationService){}
  ngOnInit() {
 this.temporaryworkListInit();
 //初始化roleList
this.roleList=JSON.parse(sessionStorage.getItem("roleList"));
 this.sessionAdmin=JSON.parse(sessionStorage.getItem("admin"));
  }

  temporaryworkListInit(){
       $.get(myUtils.getDomain()+"/temporaryWork/count",(cd)=>{
           this.totalNumber=cd;             
           //页码初始化
          this.totalPage=this.paginationService.getTotalPage(this.totalNumber,this.pageNumber);//总页码数目     
          this.showPageNumberArray=this.paginationService.getShowPageNumber(this.totalPage,this.pageNumber,this.mostShowPageNumber,this.currentPage);//显示页码数目 

        //初始化temporaryworkList
  $.get(myUtils.getDomain()+"/temporaryWork/list?pageNum="+((this.currentPage-1)*this.pageNumber+1)+"&pageSize="+this.pageNumber,(pld)=>{
           this.temporaryworkList=pld;
         sessionStorage.setItem("temporaryworkList",JSON.stringify(pld));
           this.showTemporaryworkListIcon=false;
               });
       });
  }

  //点击哪页显示哪页
toPage(content){
  if(this.paginationService.toPage(content,this.currentPage,this.totalPage)){
  this.showTemporaryworkListIcon=true;
  this.currentPage=this.paginationService.currentPage;
  this.temporaryworkListInit();
  }
}

toggleListTemporaryworkValue="添加临时工作";
temporarywork:Temporarywork=new Temporarywork('','','','','','','');//添加临时工作的temporarywork
 // 切换手机管理
  toggleListTemporarywork(){
   if(this.toggleListTemporaryworkValue=="添加临时工作"){
     this.toggleListTemporaryworkValue="临时工作列表";
   } else{
      this.temporaryworkListInit();
     this.toggleListTemporaryworkValue="添加临时工作";
   }
  }

  //新增手机
  saveTemporarywork(){
   $.post(myUtils.getDomain()+"/temporaryWork/add",
   {
     phoneNumber:this.temporarywork.phone_number,
     workers:this.temporarywork.workers,
     task:this.temporarywork.task,
     taskSituation:this.temporarywork.task_situation
     },
   (data)=>{
           if(data&&data.code==200){
             this.temporarywork=new Temporarywork('','','','','','','');
             myUtils.myLoadingToast("添加成功");
           }    
       });
  }

   /**
   * 修改
   */
 
  updateTemporarywork(temporarywork){
  this.updatetemporaryworkComponent.temporarywork=temporarywork;
  this.updatetemporaryworkComponent.sessionAdmin=this.sessionAdmin;
  this.updatetemporaryworkComponent.roleList=this.roleList;
    $("#modalClick").off().click();
  }
  /**
   * 删除
   */
  delTemporarywork(temporarywork){
     myUtils.myConfirm("确认删除吗?",()=>{
    $.get(myUtils.getDomain()+"/temporaryWork/"+temporarywork.temporary_work_id+"/delete",(d)=>{
        if(d&&d.code==200){
          myUtils.myLoadingToast("删除成功");
              this.showTemporaryworkListIcon=true;
              this.currentPage=this.paginationService.currentPage;
              this.temporaryworkListInit();
        
          
        }
     });
     });
  }
 }