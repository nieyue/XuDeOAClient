import { Component,OnInit} from '@angular/core';
import { Validators,Validator,ValidatorFn} from '@angular/forms';
import { Channel} from '../../../bean/channel';
import { Approval} from '../../../bean/approval';
declare let myUtils: any;
declare let $: any;

@Component({
  selector: 'main-rightbar-person',
  templateUrl:'person.component.html'
})
export class PersonComponent implements OnInit{
  data='';
  //账户信息
 channel =new Channel('','','','','','','','','','','','','');
  // Channel:Object={
  //   name:'15111336587',//手机号码
  //   create_time:"1988-2-22 22:33",//创建时间
  //   money:'0.0',//金钱
  //   identityCards:'',//身份证
  //   qq:'',//qq
  //   mailBox:'',//邮箱
  //   cellPhone:'',//电话
  //   oldChannelPassword:'',//旧密码
  //   newChannelPassword:'',//新密码
  //   doubleChannelPassword:'',//密码确认
  //   payee:'',//收款人
  //   bank:'',//开户银行
  //   account:'',//银行账号
  //   address:'',//开户银行地址
  // };

  //更改渠道信息显示 默认不显示
showChannelInfoWrap:boolean=false;
    //提交按钮显示
channelInfoSubmitDisabled:boolean=false;
    //提交btn内容
channelInfoSubmitValue:string='保存更改';
//是否禁用channelinfo
isDisabledChannelInfo:boolean=false;
//审核转态 默认没
approvalStatusChannelInfo:string='';

 //初始化
 initChannelInfo (){
   console.log(this);
    this.channel.identityCards='';
    this.channel.qq='278076304';
    this.channel.mailBox='278076304@qq.com';
    this.channel.cellPhone='15111336587';
 if( this.channel.identityCards ||this.channel.qq || this.channel.mailBox || this.channel.cellPhone){
     this.isDisabledChannelInfo=true;
   }
   let approval=new Approval('','修改渠道信息','2016:11:11 11:11:11',"申请修改渠道信息",'驳回','33','');
   if(!(approval instanceof Approval)){
      return;
   }
   if(approval.status==""){
      this.approvalStatusChannelInfo="";
   }
   if(approval.status=="审核中"){
      this.approvalStatusChannelInfo="审核中";
   }
    if(approval.status=="同意"){
      this.isDisabledChannelInfo=false;
      this.approvalStatusChannelInfo="同意";
   
   }
    if(approval.status=="驳回"){
      this.approvalStatusChannelInfo="驳回";
      
   }
 
}

  //更改密码显示 默认不显示
showChannelPasswordWrap:boolean=false;
    //提交按钮显示
channelPasswordSubmitDisabled:boolean=false;
    //提交btn内容
channelPasswordSubmitValue:string='保存更改';

    //更改财务显示 默认不显示
showChannelFinancialWrap:boolean=false;
  //提交按钮显示
channelFinancialSubmitDisabled:boolean=false;
    //提交btn内容
channelFinancialSubmitValue:string='保存更改';
//是否禁用channelfinacile
isDisabledChannelFinancial:boolean=false;
//审核转态 默认没
approvalStatusChannelFinancial:string='';

 //初始化
 initChannelFinancial (){
    this.channel.payee='45r';
    this.channel.bank='';
    this.channel.account='';
    this.channel.address='';
 if( this.channel.payee ||this.channel.bank || this.channel.account || this.channel.address){
     this.isDisabledChannelFinancial=true;
   }
   let approval=new Approval('','修改渠道信息','2016:11:11 11:11:11',"申请修改渠道信息",'审核中','33','');
   if(!(approval instanceof Approval)){
      return;
   }
   if(approval.status==""){
      this.approvalStatusChannelFinancial="";
   }
   if(approval.status=="审核中"){
      this.approvalStatusChannelFinancial="审核中";
   }
    if(approval.status=="同意"){
      this.isDisabledChannelFinancial=false;
      this.approvalStatusChannelFinancial="同意";
   
   }
    if(approval.status=="驳回"){
      this.approvalStatusChannelFinancial="驳回";
      
   }
 
}

  ngOnInit() {
   $("[data-toggle='tooltip']").tooltip();
     this.initChannelInfo();
     this.initChannelFinancial();
  }
  //点击切换显示保存渠道信息
  showChannelInfo(){
    
      this.showChannelInfoWrap=!this.showChannelInfoWrap;
  }
  //点击切换显示修改密码
     changeChannelPassword( ){
     this.showChannelPasswordWrap=!this.showChannelPasswordWrap;
      }
  //点击切换显示财务信息
     saveChannelFinancial( ){
     this.showChannelFinancialWrap=!this.showChannelFinancialWrap;
      }

//申请修改渠道个人信息
applyUpdateChannelInfo(){
let approval=new Approval('','修改渠道信息','2016:11:11 11:11:11',"申请修改渠道信息",'审核中','33','');
this.approvalStatusChannelInfo=approval.status;
console.log(approval)
}
//重新申请修改渠道个人信息
reApplyUpdateChannelInfo(){
 this.approvalStatusChannelInfo="";
}
//申请修改渠道财务信息
applyUpdateChannelFinancial(){
let approval=new Approval('','修改渠道信息','2016:11:11 11:11:11',"申请修改渠道信息",'审核中','33','');
this.approvalStatusChannelFinancial=approval.status;
console.log(approval)
}
//重新申请修改渠道财务信息
reApplyUpdateChannelFinancial(){
 this.approvalStatusChannelFinancial="";
}


//修改渠道信息提交
  saveChannelInfo(){
    //this.identityCards
    this.channelInfoSubmitDisabled=true;
    this.channelInfoSubmitValue='保存中...';
    
  }
      //修改密码提交
    channelPasswordSubmit(){
  //  if(this.newChannelPassword!=this.doubleChannelPassword){
   // return  myUtils.myLoadingToast("两次密码不一致",null);
   // }
    this.channelPasswordSubmitDisabled=true;
    this.channelPasswordSubmitValue='保存中...';
   // console.log(this.oldChannelPassword)
   console.log(this)
    }  
      //修改密码提交
    channelFinancialSubmit(){
  //  if(this.newChannelPassword!=this.doubleChannelPassword){
   // return  myUtils.myLoadingToast("两次密码不一致",null);
   // }
    this.channelFinancialSubmitDisabled=true;
    this.channelFinancialSubmitValue='保存中...';
   // console.log(this.oldChannelPassword)
    }  

 }