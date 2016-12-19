import { Component,OnInit,ViewChild} from '@angular/core';
import { Task } from '../../../bean/task';
import { Role } from '../../../bean/role';
import { Admin } from '../../../bean/admin';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PaginationService } from '../../../service/pagination.service';//分页服务
declare let myUtils: any;
declare let $: any;

@Component({
  selector: 'main-rightbar-task-update',
  templateUrl:'updatetask.component.html'
})
//更新页面组件
export class UpdatetaskComponent {

   task:Task=new Task('','','','','','','','','','','','','','','');//修改任务
   roleList:Role[]=[];
   sessionAdmin:Admin=new Admin('','','','','','','','');//当前登录的admin;
  
  updateTaskSubmit(){
     $.post(myUtils.getDomain()+"/task/update",
    {
      taskId:this.task.task_id,
      name:this.task.name,
      number:this.task.number,
      baseNumber:this.task.base_number,
      amNumber:this.task.am_number,
      amTotalNumber:this.task.am_total_number,
      pmNumber:this.task.pm_number,
      pmTotalNumber:this.task.pm_total_number,
      nightNumber:this.task.night_number,
      nightTotalNumber:this.task.night_total_number,
      dayTotalNumber:this.task.day_total_number,
      dayRetainNumber:this.task.day_retain_number,
      createDate:this.task.create_date,
      updateDate:this.task.update_date,
      adminId:this.task.admin_id
    },
    (data)=>{
      if(data&&data.code==200){
        myUtils.myLoadingToast("更新成功");
        $("#myModalClose").click();
      return;
      }
    });
  }

  getTaskDayTotalNumber(){

  }
}


@Component({
  selector: 'main-rightbar-task',
  templateUrl:'task.component.html'
})
export class TaskComponent implements OnInit{
  taskList:Task[]=[];
  roleList:Role[]=[];
   sessionAdmin:Admin;//当前管理员
   allAdminList:Admin[]=[];//所有admin
task:Task=new Task('','','','','','','','','','','','','','','');//添加任务的task 

totalNumber:number=0;//总管理员数目
 showPageNumberArray:number[]=[];//显示页面循环的数组 类似 1,2,3,4,5
 totalPage:number=0;//总页数

 currentPage:number=1;//当前页
 pageNumber:number=10;//每页显示数目
 mostShowPageNumber:number=5;//设定最多显示页码数目

  showTaskListIcon=true;//显示数据前的icon

@ViewChild(UpdatetaskComponent)
private updatetaskComponent :UpdatetaskComponent;
  constructor( public router:Router,private paginationService:PaginationService){}
  ngOnInit() {
 this.taskListInit();
 //初始化roleList
this.roleList=JSON.parse(sessionStorage.getItem("roleList"));
 this.sessionAdmin=JSON.parse(sessionStorage.getItem("admin"));
 this.allAdminList=JSON.parse(sessionStorage.getItem("allAdminList"));
  }
  //获取当日任务的总人数
getTaskDayTotalNumber(){
this.task.day_total_number=String(parseInt(this.task.night_total_number)-parseInt(this.task.base_number));
}
  taskListInit(){
       $.get(myUtils.getDomain()+"/task/count",(cd)=>{
           this.totalNumber=cd;             
           //页码初始化
          this.totalPage=this.paginationService.getTotalPage(this.totalNumber,this.pageNumber);//总页码数目     
          this.showPageNumberArray=this.paginationService.getShowPageNumber(this.totalPage,this.pageNumber,this.mostShowPageNumber,this.currentPage);//显示页码数目 

        //初始化taskList
  $.get(myUtils.getDomain()+"/task/list?pageNum="+((this.currentPage-1)*this.pageNumber+1)+"&pageSize="+this.pageNumber,(pld)=>{
           this.taskList=pld;
         sessionStorage.setItem("taskList",JSON.stringify(pld));
           this.showTaskListIcon=false;
               });
       });
  }

  //点击哪页显示哪页
toPage(content){
  if(this.paginationService.toPage(content,this.currentPage,this.totalPage)){
  this.showTaskListIcon=true;
  this.currentPage=this.paginationService.currentPage;
  this.taskListInit();
  }
}

toggleListTaskValue="添加任务";
 // 切换任务管理
  toggleListTask(){
   if(this.toggleListTaskValue=="添加任务"){
     this.toggleListTaskValue="任务列表";
   } else{
      this.taskListInit();
     this.toggleListTaskValue="添加任务";
   }
 }

  //新增任务
  saveTask(){
   $.post(myUtils.getDomain()+"/task/add",
   {
      name:this.task.name,
      number:this.task.number,
      baseNumber:this.task.base_number,
      amNumber:this.task.am_number,
      amTotalNumber:this.task.am_total_number,
      pmNumber:this.task.pm_number,
      pmTotalNumber:this.task.pm_total_number,
      nightNumber:this.task.night_number,
      nightTotalNumber:this.task.night_total_number,
      dayTotalNumber:this.task.day_total_number,
      dayRetainNumber:this.task.day_retain_number,
      adminId:this.sessionAdmin.admin_id
     },
   (data)=>{
           if(data&&data.code==200){
             this.task=new Task('','','','','','','','','','','','','','','');
             myUtils.myLoadingToast("添加成功");
           }    
       });
  }

   /**
   * 修改
   */
 
  updateTask(task){
  this.updatetaskComponent.task=task;
  this.updatetaskComponent.sessionAdmin=this.sessionAdmin;
  this.updatetaskComponent.roleList=this.roleList;
  this.updatetaskComponent.getTaskDayTotalNumber=this.getTaskDayTotalNumber;
    $("#modalClick").off().click();
  }
  /**
   * 删除
   */
  delTask(task){
     myUtils.myConfirm("确认删除吗?",()=>{
    $.get(myUtils.getDomain()+"/task/"+task.task_id+"/delete",(d)=>{
        if(d&&d.code==200){
          myUtils.myLoadingToast("删除成功");
              this.showTaskListIcon=true;
              this.currentPage=this.paginationService.currentPage;
              this.taskListInit();
        
          
        }
     });
     });
  }
 }