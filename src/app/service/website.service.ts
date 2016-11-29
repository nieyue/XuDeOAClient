import { Injectable} from '@angular/core';
import {Website } from '../bean/website';
import { DataDay } from '../bean/dataday';
declare let myUtils: any;
declare let $: any;
@Injectable()
export class WebsiteListService {
    dataDayList:DataDay[]=[];
    website:Website;
    haveWebsiteList:boolean=false;//是否有数据，默认没有
    haveMoreWebsiteList:boolean=false;//是否有更多数据，默认没有
    //获取初始数据
    getWebsiteList():Object[]{
        var websiteList:Object[]=[];
        for(let i=0;i<10;i++){
        
            websiteList.push(new Website(''+i,'天气好'+i,'生活','http://tg.tea18.cn/pos/index?channel_id='+(1000+i),new Date().toLocaleString(),"文章内容",'22'));
        }
        //判断数据是否有
        if(websiteList.length>0){
             this.haveMoreWebsiteList=true;
            this.haveWebsiteList=true;
        }
        return websiteList;//page数据
    }
    //加载更多
  websiteMore(websiteList:Object[]):Object[]{ 
        console.log(websiteList)
        var websiteLength=websiteList.length;
        if(websiteLength>30){
        this.haveMoreWebsiteList=false;
        console.log('nomore')
            return websiteList;
        }
        for(let i=websiteLength;i<(websiteLength+10);i++){
            websiteList.push(new Website(''+i,'天气好'+i,'生活',"http://tg.tea18.cn/pos/index?channel_id="+(1000+i),new Date().toLocaleString(),"文章内容",'22'));
        } 
    return websiteList;
  }
 //更新
  websiteUpdate(website){
      $("#myModalSubmit").show();
      $("#myModalTitle").text("更改网站");
      $("#myModalContent").html(
        "<div class='comment-input-margin '>"+
        "<label  class='text-primary'>※网站名称</label>"+
        "<input type='text' class='comment-input' style='width:100%;' value='"+website.name+"' id='updateName'   placeholder='输入页面名称'>"+
        "</div>"+
         "<div class='comment-input-margin '>"+
        "<label  class='text-primary'>※网站类型</label>"+
        "<input type='text' class='comment-input' style='width:100%;' value='"+website.type+"' id='updateType'   placeholder='输入页面类型'>"+
        "</div>"+
         "<div class='comment-input-margin '>"+
        "<label  class='text-primary'>※网站URL</label>"+
        "<input type='text' class='comment-input' style='width:100%;' value='"+website.url+"' id='updateURL' disabled=true  placeholder='输入页面URL'>"+
        "</div>"+
        "<div class='comment-input-margin '>"+
        "<label  class='text-primary'>※网站备注</label>"+
        "<input type='text' class='comment-input' style='width:100%;' value='"+website.remark+"' id='updateRemark'   placeholder='输入页面备注'>"+
        "</div>"
        );
      $("#modalClick").off().click();
         $("#myModalSubmit").off().click(()=>{
            //修改页面名称、类型
            website['name']=$('#updateName').val().trim();
            website['type']=$('#updateType').val().trim();
            website['url']=$('#updateURL').val().trim();
            website['remark']=$('#updateRemark').val().trim();
            
             $("#myModalClose").click();   
        });  
  }

   //删除
  websiteDel(website,websiteList){
      var websiteLength=websiteList.length;
       myUtils.myConfirm("确认删除吗?",()=>{
        for(let i=0;i< websiteLength;i++){
           if( websiteList[i]==website){
             websiteList.splice(i,1);
           }

        }
    });
  }

} 