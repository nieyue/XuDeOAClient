import { Component,OnInit,ViewChild} from '@angular/core';
import { Problem } from '../../../bean/problem';
import { Role } from '../../../bean/role';
import { Admin } from '../../../bean/admin';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PaginationService } from '../../../service/pagination.service';//分页服务
declare let myUtils: any;
declare let $: any;

@Component({
  selector: 'main-rightbar-problem-update',
  templateUrl:'updateproblem.component.html'
})
//更新页面组件
export class UpdateproblemComponent {

   problem:Problem=new Problem('','','','','','','');//修改问题
   roleList:Role[]=[];
   sessionAdmin:Admin=new Admin('','','','','','','','');//当前登录的admin;
    
  updateProblemSubmit(){
     $.post(myUtils.getDomain()+"/problem/update",
    {
      problemId:this.problem.problem_id,
      name:this.problem.name,
      number:this.problem.number,
      content:this.problem.content,
      isSolve:this.problem.is_solve,
      createDate:this.problem.create_date,
      adminId:this.problem.admin_id
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
  selector: 'main-rightbar-problem',
  templateUrl:'problem.component.html'
})
export class ProblemComponent implements OnInit{
  problemList:Problem[]=[];
  roleList:Role[]=[];
   sessionAdmin:Admin;//当前管理员
   allAdminList:Admin[]=[];//所有admin

totalNumber:number=0;//总管理员数目
 showPageNumberArray:number[]=[];//显示页面循环的数组 类似 1,2,3,4,5
 totalPage:number=0;//总页数

 currentPage:number=1;//当前页
 pageNumber:number=10;//每页显示数目
 mostShowPageNumber:number=5;//设定最多显示页码数目

  showProblemListIcon=true;//显示数据前的icon

@ViewChild(UpdateproblemComponent)
private updateproblemComponent :UpdateproblemComponent;
  constructor( public router:Router,private paginationService:PaginationService){}
  ngOnInit() {
 this.problemListInit();
 //初始化roleList
this.roleList=JSON.parse(sessionStorage.getItem("roleList"));
 this.sessionAdmin=JSON.parse(sessionStorage.getItem("admin"));
 this.allAdminList=JSON.parse(sessionStorage.getItem("allAdminList"));
  }

  problemListInit(){
       $.get(myUtils.getDomain()+"/problem/count",(cd)=>{
           this.totalNumber=cd;             
           //页码初始化
          this.totalPage=this.paginationService.getTotalPage(this.totalNumber,this.pageNumber);//总页码数目     
          this.showPageNumberArray=this.paginationService.getShowPageNumber(this.totalPage,this.pageNumber,this.mostShowPageNumber,this.currentPage);//显示页码数目 

        //初始化problemList
  $.get(myUtils.getDomain()+"/problem/list?pageNum="+((this.currentPage-1)*this.pageNumber+1)+"&pageSize="+this.pageNumber,(pld)=>{
           this.problemList=pld;
         sessionStorage.setItem("problemList",JSON.stringify(pld));
           this.showProblemListIcon=false;
               });
       });
  }

  //点击哪页显示哪页
toPage(content){
  if(this.paginationService.toPage(content,this.currentPage,this.totalPage)){
  this.showProblemListIcon=true;
  this.currentPage=this.paginationService.currentPage;
  this.problemListInit();
  }
}

toggleListProblemValue="添加问题";
problem:Problem=new Problem('','','','','0','','');//添加问题的problem 0代表未解决
 // 切换问题管理
  toggleListProblem(){
   if(this.toggleListProblemValue=="添加问题"){
     this.toggleListProblemValue="问题列表";
   } else{
      this.problemListInit();
     this.toggleListProblemValue="添加问题";
   }
  }

  //新增问题
  saveProblem(){
   $.post(myUtils.getDomain()+"/problem/add",
   {
     name:this.problem.name,
     number:this.problem.number,
     content:this.problem.content,
     isSolve:this.problem.is_solve,
     //adminId:this.problem.admin_id
     adminId:this.sessionAdmin.admin_id
     },
   (data)=>{
           if(data&&data.code==200){
             this.problem=new Problem('','','','','','','');
             myUtils.myLoadingToast("添加成功");
           }    
       });
  }

   /**
   * 修改
   */
 
  updateProblem(problem){
  this.updateproblemComponent.problem=problem;
  this.updateproblemComponent.sessionAdmin=this.sessionAdmin;
  this.updateproblemComponent.roleList=this.roleList;
    $("#modalClick").off().click();
  }
  /**
   * 删除
   */
  delProblem(problem){
     myUtils.myConfirm("确认删除吗?",()=>{
    $.get(myUtils.getDomain()+"/problem/"+problem.problem_id+"/delete",(d)=>{
        if(d&&d.code==200){
          myUtils.myLoadingToast("删除成功");
              this.showProblemListIcon=true;
              this.currentPage=this.paginationService.currentPage;
              this.problemListInit();
        
          
        }
     });
     });
  }
 }