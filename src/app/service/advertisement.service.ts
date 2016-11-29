import { Injectable} from '@angular/core';
import {Advertisement } from '../bean/advertisement';
import { DataDay } from '../bean/dataday';
declare let myUtils: any;
declare let $: any;
@Injectable()
export class AdvertisementListService {
    dataDayList:DataDay[]=[];
    advertisement:Advertisement;
    haveAdvertisementList:boolean=false;//是否有数据，默认没有
    haveMoreAdvertisementList:boolean=false;//是否有更多数据，默认没有
    //获取初始数据
    getAdvertisementList():Object[]{
        var advertisementList:Object[]=[];
        for(let i=0;i<10;i++){
        
            advertisementList.push(
               new Advertisement(i+1+'','大小','PC端','内嵌','正常',false,'底部',new Date().toLocaleString(),'22'));
        }
        //判断数据是否有
        if(advertisementList.length>0){
             this.haveMoreAdvertisementList=true;
            this.haveAdvertisementList=true;
        }
        return advertisementList;//advertisement数据
    }
    //加载更多
  advertisementMore(advertisementList:Object[]):Object[]{ 
        console.log(Advertisement)
        var advertisementLength=advertisementList.length;
        if(advertisementLength>30){
        this.haveMoreAdvertisementList=false;
        console.log('nomore')
            return advertisementList;
        }
        for(let i=advertisementLength;i<(advertisementLength+10);i++){
            advertisementList.push(
                new Advertisement(i+1+'','大小','移动端','悬浮','正常',false,'顶部',new Date().toLocaleString(),'22'));
        } 
    return advertisementList;
  }
 //更新
  advertisementUpdate(advertisement){
       $("#myModalSubmit").show();
      $("#myModalTitle").text("更改广告位");
      $("#myModalContent").html(
        "<div class='comment-input-margin '>"+
        "<label  class='text-primary'>※广告位ID</label>"+
        "<input type='text' class='comment-input' style='width:100%;' value='"+advertisement.advertisement_id+"'  disabled='true'>"+
        "</div>"+
        "<div class='comment-input-margin '>"+
        "<label  class='text-primary'>※广告位名称</label>"+
        "<input type='text' class='comment-input' style='width:100%;' [(ngModel)]='aabb' value='"+advertisement.name+"' id='updateName'   placeholder='输入广告位名称'>"+
        "</div>"+
        "<div class='comment-input-margin '>"+
        "<label  class='text-primary'>※投放平台</label>"+
        "<span id='advertisementPlatformPC' class='btn btn-default'>PC端</span>"+
        "<span id='advertisementPlatformMobile' class='btn btn-default'>移动端</span>"+
        "</div>"+
         "<div class='comment-input-margin '>"+
        "<label  class='text-primary'>※广告位类型</label>"+
        "<input type='radio' style='margin-left: 10px;' name='advertisementType'  id='advertisementTypeInner'/>内嵌"+
        "<input type='radio' style='margin-left:10px;' name='advertisementType'    id='advertisementTypeFloat'  />悬浮"+
        "</div>"+
         "<div class='comment-input-margin '>"+
        "<label  class='text-primary'>※广告位位置</label>"+
        "<input type='radio' style='margin-left: 10px;' name='advertisementLocation'  id='advertisementLocationTop'/>顶部"+
        "<input type='radio' style='margin-left:10px;' name='advertisementLocation'    id='advertisementLocationBottom'  />底部"+
        "</div>"
        );
         if(advertisement.platform=='PC端'){
            $('#advertisementPlatformPC').addClass("btn-primary");
             $('#advertisementPlatformMobile').removeClass("btn-primary");
            }
            if(advertisement.platform=='移动端'){
            $('#advertisementPlatformMobile').addClass("btn-primary");
             $('#advertisementPlatformPC').removeClass("btn-primary");
            }
             $("#advertisementPlatformPC").click(function(){
            $('#advertisementPlatformPC').addClass("btn-primary");
             $('#advertisementPlatformMobile').removeClass("btn-primary");
             });
            $("#advertisementPlatformMobile").click(function(){
            $('#advertisementPlatformMobile').addClass("btn-primary");
             $('#advertisementPlatformPC').removeClass("btn-primary");
           });

         if(advertisement.type=='内嵌'){
            $('#advertisementTypeInner').prop("checked",true);
            }
            if(advertisement.type=='悬浮'){
            $('#advertisementTypeFloat').prop("checked",true);
            }
         if(advertisement.location=='顶部'){
            $('#advertisementLocationTop').prop("checked",true);
            }
            if(advertisement.location=='底部'){
            $('#advertisementLocationBottom').prop("checked",true);
            }

      $("#modalClick").off().click();
         $("#myModalSubmit").off().click(()=>{
            //修改广告位名称、类型
            advertisement['name']=$('#updateName').val().trim();
           // advertisement['platform']=$('#updatePlatform').val().trim();

              if($('#advertisementPlatformPC').hasClass("btn-primary")){
            advertisement['platform']='PC端';
            }
            if($('#advertisementPlatformMobile').hasClass("btn-primary")){
            advertisement['platform']='移动端';
            }

             if($('#advertisementTypeInner').prop("checked")==true){
            advertisement['type']='内嵌';
            }
            if($('#advertisementTypeFloat').prop("checked")==true){
            advertisement['type']='悬浮';
            }
             if($('#advertisementLocationTop').prop("checked")==true){
            advertisement['location']='顶部';
            }
            if($('#advertisementLocationBottom').prop("checked")==true){
            advertisement['location']='底部';
            }

            console.log(advertisement['type'])
             $("#myModalClose").click();   
        });  
  }

   //获取代码
  advertisementCode(advertisement){
       $("#myModalTitle").text("广告位代码");
      $("#myModalContent").html(
        "<div class='comment-input-margin '>"+
        "<label  class='text-default'>"+
        "&lt;script type='text/javascript'&gt;"+
         "var advertisement_id='"+advertisement.advertisement_id+"'&lt;/script&gt;"+
         "&lt;script type='text/javascript' src='"+location.protocol+"//"+location.host+"/resources/js/yayaoadvertisement.js"+"'&gt;&lt;/script&gt;"+
         "</label>"+
        "</div>"
        );
        $("#modalClick").off().click();
        $("#myModalSubmit").hide();
  }
   //广告位停用
  advertisementStop(advertisement,advertisementList){
      var advertisementLength=advertisementList.length;
       myUtils.myConfirm("确认停用吗?",()=>{
        for(let i=0;i< advertisementLength;i++){
           if( advertisementList[i]==advertisement){
             //advertisementList.splice(i,1);
             advertisement.transition=true;
             advertisement.status='停止';
           }
        }
    });
  }
   //广告位启动
  advertisementStart(advertisement,advertisementList){
      var advertisementLength=advertisementList.length;
       myUtils.myConfirm("确认启动吗?",()=>{
        for(let i=0;i< advertisementLength;i++){
           if( advertisementList[i]==advertisement){
             //advertisementList.splice(i,1);
             advertisement.transition=false;
             advertisement.status='正常';
           }
        }
    });
  }

  
  //显示数据
  showAdvertisementData(advertisement,echarts){
    
     $("#myModalTitle").html("<div class='text-center text-info'>"+advertisement.name+"的数据</div>");
     $("#myModalContent").parent().css("width","866px");
      $("#myModalContent").html(
        "<ul class='list-group' style='margin-top:20px;'>"+
            "<li class='list-group-item text-center'>"+
           " <div class='btn-group'>"+
               " <button type='button' id='todayData' class='btn btn-default'>今日数据</button>"+
               " <button type='button' id='sevendayData' class='btn btn-default'>七日数据</button>"+
               " <button type='button' id='thirtydayData' class='btn btn-default'>三十日数据</button>"+
            "</div></li>"+
            "<li class='list-group-item'><div id='main' style='width:800px;height:400px;border:1px dashed #ccc;'></div></li>"+
            "<li class='list-group-item'>"+
                "<table class='table text-center table-striped' style='border:2px solid #999;box-shadow:0 0 10px #999;' >"+
                
                 "<thead>"+
                      "<tr class='myactive row'> "+
                        " <th class='text-center col-xs-4'>日期</th>"+
                        " <th class='text-center col-xs-2'>浏览次数(PV)</th>"+
                         "<th class='text-center col-xs-2'>独立访客(UV)</th>"+
                         "<th class='text-center col-xs-2'>IP</th>"+
                         "<th class='text-center col-xs-2'>转发</th>"+
                     " </tr>"+
                  " </thead>"+
                  " <tbody *ngIf='havePageList' id='dataDayTbody'>"+
                      
                 "  </tbody>"+
               " </table>"+
            
            "</li>"+
        "</ul>"
        );
      $("#modalClick").off().click();
      $("#myModalSubmit").hide();
            
            var num=7;//默认为7
            var _this=this;
            $("#todayData").click(function(){
                 $("#sevendayData").removeClass("btn-success");
                 $("#thirtydayData").removeClass("btn-success");
                $(this).addClass("btn-success");
                num=1;
                _this.getEchartsInit(num,advertisement,echarts);
            });
            $("#sevendayData").click(function(){
                $("#todayData").removeClass("btn-success");
                 $("#thirtydayData").removeClass("btn-success");
                $(this).addClass("btn-success");
                num=7;
               _this. getEchartsInit(num,advertisement,echarts);
            });
            $("#thirtydayData").click(function(){
                $("#sevendayData").removeClass("btn-success");
                 $("#todayData").removeClass("btn-success");
                $(this).addClass("btn-success");
                num=30;
               _this. getEchartsInit(num,advertisement,echarts);
            });
             $("#sevendayData").addClass("btn-success");
           this.getEchartsInit(num,advertisement,echarts);
          
  }
   getEchartsInit (num,advertisement,echarts){
            var pvData=[];
            var uvData=[];
            var ipData=[];
            var forwardData=[];
            var daily_dayData=[];
            this.dataDayList=[];
            $("#dataDayTbody").html("");
     for(var i=0;i<num;i++){
         var dddd=new Date();
        dddd.setTime(new Date().getTime()-1000*60*60*24*(num-1-i));
        this.dataDayList.push(new DataDay(i+'',4499+i+'',55+i+'',22+i+'',21+i+'',dddd.toLocaleDateString(),advertisement.advertisement_id));

         pvData[i]=this.dataDayList[i].pvs; 
         uvData[i]=this.dataDayList[i].uvs; 
         ipData[i]=this.dataDayList[i].ips; 
         forwardData[i]=this.dataDayList[i].forward; 
         daily_dayData[i]=this.dataDayList[i].daily_day; 
      $("#dataDayTbody").append(
                      "<tr class='myactive row'>"+
                      "<td class='text-center col-xs-4'>"+daily_dayData[i]+"</td>"+
                      "<td class='text-center col-xs-2'>"+pvData[i]+"</td>"+
                      "<td class='text-center col-xs-2'>"+ uvData[i]+"</td>"+
                      "<td class='text-center col-xs-2'>"+ipData[i]+"</td>"+
                      "<td class='text-center col-xs-2'>"+forwardData[i]+"</td>"+
                     " </tr>");
                   
            
      }
         
            // $("#myModalClose").click();  
          // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init($('#main')[0]);

        // 指定图表的配置项和数据
        var option = {
    title: {
        text: advertisement.name
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data:['浏览次数(PV)','独立访客(UV)','IP','转发']
    },
    // grid: {
    //     left: '3%',
    //     right: '4%',
    //     bottom: '3%',
    //     containLabel: true
    // },
    toolbox: {
        feature: {
              dataView: {readOnly: false},
            magicType: {type: ['line', 'bar']},
            restore: {},
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap:  false,
        data:
        //  (function (){
        //         var res = [];
        //         for(let i=0;i<7;i++){
        //         var now = myUtils.timeStampToSimpleDate(new Date());
        //        res.push(now)
        //         }
        //         return res;
        //     })()
        //  (function (){
        //         var now = new Date();
        //         var res = [];
        //         var len = 10;
        //         while (len--) {
        //             res.unshift(now.toLocaleTimeString().replace(/^\D*/,''));
        //             now = new Date(now.getTime() - 2000);
        //         }
        //         return res;
        //     })()
          //['10.1','10.2','10.3','10.4','10.5','10.6','10.7']
            daily_dayData    
    },
     yAxis: [
        {
            type: 'value',
            // scale: true,
            name: '数量'
            ,min: 0,
            boundaryGap: [0.2, 0.2]
        }
    ],
    series: [
        {
            name:'浏览次数(PV)',
            type:'line',
            data: pvData
        },
        {
            name:'独立访客(UV)',
            type:'line',
            data:uvData
        },
        {
            name:'IP',
            type:'line',
            data:ipData
        },
        {
            name:'转发',
            type:'line',
            data:forwardData
        }
    ]
};

    myChart.setOption(option);
    }
} 