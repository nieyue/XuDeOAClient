import { Component,OnInit,ViewChild} from '@angular/core';
import { Webstatistics } from '../../../bean/webstatistics';
import { Role } from '../../../bean/role';
import { Admin } from '../../../bean/admin';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PaginationService } from '../../../service/pagination.service';//分页服务
declare let myUtils: any;
declare let $: any;

@Component({
  selector: 'main-rightbar-webstatistics-update',
  templateUrl:'updatewebstatistics.component.html'
})
//更新页面组件
export class UpdatewebstatisticsComponent {

   webstatistics:Webstatistics=new Webstatistics('','','','','','','','','','','','','');//修改网站统计
   roleList:Role[]=[];
   sessionAdmin:Admin=new Admin('','','','','','','','');//当前登录的admin;
    
  updateWebstatisticsSubmit(){
     $.post(myUtils.getDomain()+"/webStatistics/update",
    {
      webStatisticsId:this.webstatistics.web_statistics_id,
      webName:this.webstatistics.web_name,
      webUrl:this.webstatistics.web_url,
      uv:this.webstatistics.uv,
      newUv:this.webstatistics.new_uv,
      ip:this.webstatistics.ip,
      pv:this.webstatistics.pv,
      visitNumber:this.webstatistics.visit_number,
      averageNumber:this.webstatistics.average_number,
      averageDeep:this.webstatistics.average_deep,
      bounceRate:this.webstatistics.bounce_rate,
      peakPeriod:this.webstatistics.peak_period,
      createDate:this.webstatistics.create_date
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
  selector: 'main-rightbar-webstatistics',
  templateUrl:'webstatistics.component.html'
})
export class WebstatisticsComponent implements OnInit{
  webstatisticsList:Webstatistics[]=[];
  roleList:Role[]=[];
   sessionAdmin:Admin;//当前管理员

totalNumber:number=0;//总管理员数目
 showPageNumberArray:number[]=[];//显示页面循环的数组 类似 1,2,3,4,5
 totalPage:number=0;//总页数

 currentPage:number=1;//当前页
 pageNumber:number=10;//每页显示数目
 mostShowPageNumber:number=5;//设定最多显示页码数目

  showWebstatisticsListIcon=true;//显示数据前的icon

@ViewChild(UpdatewebstatisticsComponent)
private updatewebstatisticsComponent :UpdatewebstatisticsComponent;
  constructor( public router:Router,private paginationService:PaginationService){}
  ngOnInit() {
 this.webstatisticsListInit();
 //初始化roleList
this.roleList=JSON.parse(sessionStorage.getItem("roleList"));
 this.sessionAdmin=JSON.parse(sessionStorage.getItem("admin"));
  }

  webstatisticsListInit(){
       $.get(myUtils.getDomain()+"/webStatistics/count",(cd)=>{
           this.totalNumber=cd;             
           //页码初始化
          this.totalPage=this.paginationService.getTotalPage(this.totalNumber,this.pageNumber);//总页码数目     
          this.showPageNumberArray=this.paginationService.getShowPageNumber(this.totalPage,this.pageNumber,this.mostShowPageNumber,this.currentPage);//显示页码数目 

        //初始化WebstatisticsList
  $.get(myUtils.getDomain()+"/webStatistics/list?pageNum="+((this.currentPage-1)*this.pageNumber+1)+"&pageSize="+this.pageNumber,(pld)=>{
           this.webstatisticsList=pld;
         sessionStorage.setItem("webstatisticsList",JSON.stringify(pld));
           this.showWebstatisticsListIcon=false;
               });
       });
  }

  //点击哪页显示哪页
toPage(content){
  if(this.paginationService.toPage(content,this.currentPage,this.totalPage)){
  this.showWebstatisticsListIcon=true;
  this.currentPage=this.paginationService.currentPage;
  this.webstatisticsListInit();
  }
}

toggleListWebstatisticsValue="添加网站统计";
webstatistics:Webstatistics=new Webstatistics('','','','','','','','','','','','','');//添加的webstatistics
 // 切换网站统计管理
  toggleListWebstatistics(){
   if(this.toggleListWebstatisticsValue=="添加网站统计"){
     this.toggleListWebstatisticsValue="网站统计列表";
   } else{
      this.webstatisticsListInit();
     this.toggleListWebstatisticsValue="添加网站统计";
   }
  }

  //新增
  saveWebstatistics(){
   $.post(myUtils.getDomain()+"/webStatistics/add",
   {
      webName:this.webstatistics.web_name,
      webUrl:this.webstatistics.web_url,
      uv:this.webstatistics.uv,
      newUv:this.webstatistics.new_uv,
      ip:this.webstatistics.ip,
      pv:this.webstatistics.pv,
      visitNumber:this.webstatistics.visit_number,
      averageNumber:this.webstatistics.average_number,
      averageDeep:this.webstatistics.average_deep,
      bounceRate:this.webstatistics.bounce_rate,
      peakPeriod:this.webstatistics.peak_period
     },
   (data)=>{
           if(data&&data.code==200){
             this.webstatistics=new Webstatistics('','','','','','','','','','','','','');
             myUtils.myLoadingToast("添加成功");
           }    
       });
  }

   /**
   * 修改
   */
 
  updateWebstatistics(webstatistics){
  this.updatewebstatisticsComponent.webstatistics=webstatistics;
  this.updatewebstatisticsComponent.sessionAdmin=this.sessionAdmin;
  this.updatewebstatisticsComponent.roleList=this.roleList;
    $("#modalClick").off().click();
  }
  /**
   * 删除
   */
  delWebstatistics(webstatistics){
     myUtils.myConfirm("确认删除吗?",()=>{
    $.get(myUtils.getDomain()+"/webStatistics/"+webstatistics.web_statistics_id+"/delete",(d)=>{
        if(d&&d.code==200){
          myUtils.myLoadingToast("删除成功");
              this.showWebstatisticsListIcon=true;
              this.currentPage=this.paginationService.currentPage;
              this.webstatisticsListInit();
        
          
        }
     });
     });
  }
 }