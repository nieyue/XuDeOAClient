import { Component,OnInit} from '@angular/core';
import { Daystask } from '../../../bean/daystask';
import { Weekstask } from '../../../bean/weekstask';
import { Monthstask } from '../../../bean/monthstask';
import { Role } from '../../../bean/role';
import { Admin } from '../../../bean/admin';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PaginationService } from '../../../service/pagination.service';//分页服务
declare let myUtils: any;
declare let $: any;

@Component({
  selector: 'main-rightbar-tdata',
  templateUrl:'tdata.component.html'
})
export class TdataComponent implements OnInit{
  daystaskList:Daystask[]=[];
  weekstaskList:Weekstask[]=[];
  monthstaskList:Monthstask[]=[];
  roleList:Role[]=[];
   sessionAdmin:Admin;//当前管理员
   allAdminList:Admin[]=[];//所有admin

   daysShow=true;
   weeksShow=false;
   monthsShow=false;

totalNumber:number=0;//总管理员数目
 showPageNumberArray:number[]=[];//显示页面循环的数组 类似 1,2,3,4,5
 totalPage:number=0;//总页数

 currentPage:number=1;//当前页
 pageNumber:number=10;//每页显示数目
 mostShowPageNumber:number=5;//设定最多显示页码数目

  showTdataListIcon=true;//显示数据前的icon

  ngOnInit() {
 this.tdataListInit({menu:'手机'});
 //初始化roleList
this.roleList=JSON.parse(sessionStorage.getItem("roleList"));
 this.sessionAdmin=JSON.parse(sessionStorage.getItem("admin"));
 this.allAdminList=JSON.parse(sessionStorage.getItem("allAdminList"));
  }

  tdataListInit(checktdata){
       $.get(myUtils.getDomain()+"/task/count?name="+checktdata.menu,(cd)=>{
           this.totalNumber=cd;             
           //页码初始化
          this.totalPage=this.paginationService.getTotalPage(this.totalNumber,this.pageNumber);//总页码数目     
          this.showPageNumberArray=this.paginationService.getShowPageNumber(this.totalPage,this.pageNumber,this.mostShowPageNumber,this.currentPage);//显示页码数目 

        //初始化dayplusList
  $.get(myUtils.getDomain()+"/task/list/days?name="+checktaskdata.menu+"&pageNum="+((this.currentPage-1)*this.pageNumber+1)+"&pageSize="+this.pageNumber,(pld)=>{
           this.taskdataList=pld;
         sessionStorage.setItem("tdataList",JSON.stringify(pld));
           this.showTdataListIcon=false;
               });
       });
  }

  //点击哪页显示哪页
toPage(content){
  if(this.paginationService.toPage(content,this.currentPage,this.totalPage)){
  this.showTdataListIcon=true;
  this.currentPage=this.paginationService.currentPage;
  this.tdataListInit();
  }
}
//选择什么视图
 checktdataList=[
   {menu:'手机'},
   {menu:'微信'},
   {menu:'QQ'},
   {menu:'陌陌'},
   {menu:'微博'}
 ];
 // 切换任务数据管理
toggleListTdata(checktdata){
 this.tdataListInit(checktdata);
}
  
 }