import { Component,OnInit,ViewChild} from '@angular/core';
import { Promotionstatistics } from '../../../bean/promotionstatistics';
import { Role } from '../../../bean/role';
import { Admin } from '../../../bean/admin';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PaginationService } from '../../../service/pagination.service';//分页服务
declare let myUtils: any;
declare let $: any;

@Component({
  selector: 'main-rightbar-promotionstatistics-update',
  templateUrl:'updatepromotionstatistics.component.html'
})
//更新页面组件
export class UpdatepromotionstatisticsComponent implements OnInit{

   promotionstatistics:Promotionstatistics=new Promotionstatistics('','','','','','','','','','','','','','','','');//修改推广统计
   roleList:Role[]=[];
   sessionAdmin:Admin=new Admin('','','','','','','','');//当前登录的admin;
    

    ngOnInit(){
        $(".form_datetime").datetimepicker({format: 'yyyy-mm-dd hh:ii:ss',
   	autoclose: true
});
 this.getDateTime("input[name='promotion_date']","promotionstatistics","promotion_date");
    }
getDateTime(element,clazz,name){
  var _this=this;
  $(element).on("change",function(){
   _this[clazz][name]=$(this).val();
   });
}

  updatePromotionstatisticsSubmit(){
     $.post(myUtils.getDomain()+"/promotionStatistics/update",
    {
      promotionStatisticsId:this.promotionstatistics.promotion_statistics_id,
      promotionDate:this.promotionstatistics.promotion_date,
      period:this.promotionstatistics.period,
      link:this.promotionstatistics.link,
      friendCircle:this.promotionstatistics.friend_circle,
      wechatGroup:this.promotionstatistics.wechat_group,
      point:this.promotionstatistics.point,
      qqGroup:this.promotionstatistics.qq_group,
      qqPoint:this.promotionstatistics.qq_point,
      momo:this.promotionstatistics.momo,
      total:this.promotionstatistics.total,
      daysPv:this.promotionstatistics.days_pv,
      daysUv:this.promotionstatistics.days_uv,
      daysPerPv:String((parseFloat(this.promotionstatistics.days_pv)/parseFloat(this.promotionstatistics.days_uv)).toFixed(2)),//人均pv=当日pv/当日uv
      daysPerPvCost:String((parseFloat(this.promotionstatistics.total)/parseFloat(this.promotionstatistics.days_pv)).toFixed(2)),//每个pv成本=推广用户合计/当日pv
      createDate:this.promotionstatistics.create_date
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
  selector: 'main-rightbar-promotionstatistics',
  templateUrl:'promotionstatistics.component.html'
})
export class PromotionstatisticsComponent implements OnInit{
  promotionstatisticsList:Promotionstatistics[]=[];
  roleList:Role[]=[];
   sessionAdmin:Admin;//当前管理员
promotionstatistics:Promotionstatistics=new Promotionstatistics('','','','','','','','','','','','','','','','');//添加的Promotionstatistics

totalNumber:number=0;//总管理员数目
 showPageNumberArray:number[]=[];//显示页面循环的数组 类似 1,2,3,4,5
 totalPage:number=0;//总页数

 currentPage:number=1;//当前页
 pageNumber:number=10;//每页显示数目
 mostShowPageNumber:number=5;//设定最多显示页码数目

  showPromotionstatisticsListIcon=true;//显示数据前的icon

@ViewChild(UpdatepromotionstatisticsComponent)
private updatepromotionstatisticsComponent :UpdatepromotionstatisticsComponent;
  constructor( public router:Router,private paginationService:PaginationService){}
  ngOnInit() {
 this.promotionstatisticsListInit();
 //初始化roleList
this.roleList=JSON.parse(sessionStorage.getItem("roleList"));
 this.sessionAdmin=JSON.parse(sessionStorage.getItem("admin"));

        $(".form_datetime").datetimepicker({format: 'yyyy-mm-dd hh:ii:ss',
   	autoclose: true
});
 this.getDateTime("input[name='promotion_date']","promotionstatistics","promotion_date");
  }
 //动态获取datetimepicker,注入model
getDateTime(element,clazz,name){
  var _this=this;
  $(element).on("change",function(){
   _this[clazz][name]=$(this).val();
   });
}
  promotionstatisticsListInit(){
       $.get(myUtils.getDomain()+"/promotionStatistics/count",(cd)=>{
           this.totalNumber=cd;             
           //页码初始化
          this.totalPage=this.paginationService.getTotalPage(this.totalNumber,this.pageNumber);//总页码数目     
          this.showPageNumberArray=this.paginationService.getShowPageNumber(this.totalPage,this.pageNumber,this.mostShowPageNumber,this.currentPage);//显示页码数目 

        //初始化PromotionstatisticsList
  $.get(myUtils.getDomain()+"/promotionStatistics/list?pageNum="+((this.currentPage-1)*this.pageNumber+1)+"&pageSize="+this.pageNumber,(pld)=>{
           this.promotionstatisticsList=pld;
         sessionStorage.setItem("promotionstatisticsList",JSON.stringify(pld));
           this.showPromotionstatisticsListIcon=false;
               });
       });
  }

  //点击哪页显示哪页
toPage(content){
  if(this.paginationService.toPage(content,this.currentPage,this.totalPage)){
  this.showPromotionstatisticsListIcon=true;
  this.currentPage=this.paginationService.currentPage;
  this.promotionstatisticsListInit();
  }
}

toggleListPromotionstatisticsValue="添加推广统计";
 // 切换推广统计管理
  toggleListPromotionstatistics(){
   if(this.toggleListPromotionstatisticsValue=="添加推广统计"){
     this.toggleListPromotionstatisticsValue="推广统计列表";
   } else{
      this.promotionstatisticsListInit();
     this.toggleListPromotionstatisticsValue="添加推广统计";
   }
  }

  //新增
  savePromotionstatistics(){
   $.post(myUtils.getDomain()+"/promotionStatistics/add",
   {
      promotionDate:this.promotionstatistics.promotion_date,
      period:this.promotionstatistics.period,
      link:this.promotionstatistics.link,
      friendCircle:this.promotionstatistics.friend_circle,
      wechatGroup:this.promotionstatistics.wechat_group,
      point:this.promotionstatistics.point,
      qqGroup:this.promotionstatistics.qq_group,
      qqPoint:this.promotionstatistics.qq_point,
      momo:this.promotionstatistics.momo,
      total:this.promotionstatistics.total,
      daysPv:this.promotionstatistics.days_pv,
      daysUv:this.promotionstatistics.days_uv,
      daysPerPv:String((parseFloat(this.promotionstatistics.days_pv)/parseFloat(this.promotionstatistics.days_uv)).toFixed(2)),//人均pv=当日pv/当日uv
      daysPerPvCost:String((parseFloat(this.promotionstatistics.total)/parseFloat(this.promotionstatistics.days_pv)).toFixed(2))//每个pv成本=推广用户合计/当日pv
           },
   (data)=>{
           if(data&&data.code==200){
             this.promotionstatistics=new Promotionstatistics('','','','','','','','','','','','','','','','');
             myUtils.myLoadingToast("添加成功");
           }    
       });
  }

   /**
   * 修改
   */
 
  updatePromotionstatistics(promotionstatistics){
  this.updatepromotionstatisticsComponent.promotionstatistics=promotionstatistics;
  this.updatepromotionstatisticsComponent.sessionAdmin=this.sessionAdmin;
  this.updatepromotionstatisticsComponent.roleList=this.roleList;
    $("#modalClick").off().click();
  }
  /**
   * 删除
   */
  delPromotionstatistics(promotionstatistics){
     myUtils.myConfirm("确认删除吗?",()=>{
    $.get(myUtils.getDomain()+"/promotionStatistics/"+promotionstatistics.promotion_statistics_id+"/delete",(d)=>{
        if(d&&d.code==200){
          myUtils.myLoadingToast("删除成功");
              this.showPromotionstatisticsListIcon=true;
              this.currentPage=this.paginationService.currentPage;
              this.promotionstatisticsListInit();
        
          
        }
     });
     });
  }
 }