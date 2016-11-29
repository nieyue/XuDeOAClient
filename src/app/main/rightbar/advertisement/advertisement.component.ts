import { Component } from '@angular/core';
import { Advertisement } from '../../../bean/advertisement';
import { DataDay } from '../../../bean/dataday';
import { AdvertisementListService } from '../../../service/advertisement.service';
declare  let echarts: any;
@Component({
  selector: 'main-rightbar-advertisement',
  templateUrl:'advertisement.component.html'
})
export class AdvertisementComponent {
      listadvertisement:boolean=true;//显示广告位列表
      addadvertisement:boolean=false;//显示增加广告位
   advertisementList:Object[]=this.advertisementListService.getAdvertisementList();//初始化数据
   haveAdvertisementList:boolean=this.advertisementListService.haveAdvertisementList;//是否有数据，默认没有
   haveMoreAdvertisementList:boolean=this.advertisementListService.haveMoreAdvertisementList;//是否有更多数据，默认没有
   newAdvertisementList:Object[]=[];
  advertisement:Advertisement=new Advertisement('','','PC端','内嵌','',false,'顶部','','');
   dataDayList:DataDay[];
       constructor(private advertisementListService:AdvertisementListService ) {
    
}

  //加载更多
  advertisementMore(){   
  this.advertisementListService.advertisementMore(this.advertisementList);//加载数据
  this.haveMoreAdvertisementList=this.advertisementListService.haveMoreAdvertisementList;//是否有更多数据，默认没有
  }
  newName:string='';
  //显示数据
  showAdvertisementData(advertisement){
      this.advertisementListService.showAdvertisementData(advertisement,echarts); 
  }
  //获取代码
  advertisementCode(advertisement){
      this.advertisementListService.advertisementCode(advertisement);

  }
  //停用
  advertisementStop(advertisement){
      this.advertisementListService.advertisementStop(advertisement,this.advertisementList);

  }
  //启动
  advertisementStart(advertisement){
      this.advertisementListService.advertisementStart(advertisement,this.advertisementList);

  }
  //修改
  advertisementUpdate(advertisement){
      this.advertisementListService.advertisementUpdate(advertisement);
  }
  //增加广告位表单提交
  saveAdvertisement(){
    console.log(this.advertisement)
  }
 }