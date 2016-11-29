import { Component,OnInit} from '@angular/core';
import { WebsiteListService } from '../../../../service/website.service';
declare let myUtils: any;
declare let $: any;

@Component({
  selector: 'main-rightbar-website-listwebsite',
  templateUrl:'listwebsite.component.html'
})
export class ListwebsiteComponent implements OnInit{
   websiteList:Object[]=this.websiteListService.getWebsiteList();//初始化数据
   haveWebsiteList:boolean=this.websiteListService.haveWebsiteList;//是否有数据，默认没有
   haveMoreWebsiteList:boolean=this.websiteListService.haveMoreWebsiteList;//是否有更多数据，默认没有
   newWebsiteList:Object[]=[];
       constructor(private websiteListService:WebsiteListService ) {
    
}
  ngOnInit() {
//  //myCanvas
//  let ctx=$("#myCanvas")[0].getContext('2d');
//  ctx.moveTo(0,100);
// ctx.lineTo(100,0);
// 	ctx.lineTo(200,100);
// 	 ctx.strokeText("KingDZ原创", 50,80); 
// ctx.stroke();
  }
  //加载更多
  websiteMore(){   
  this.websiteListService.websiteMore(this.websiteList);//加载数据
  this.haveMoreWebsiteList=this.websiteListService.haveMoreWebsiteList;//是否有更多数据，默认没有
  }
  newName:string='';
  //更新
  websiteUpdate(website){
      this.websiteListService.websiteUpdate(website);
  }
  //删除
  websiteDel(website){
      this.websiteListService.websiteDel(website,this.websiteList);
  }
  

 }