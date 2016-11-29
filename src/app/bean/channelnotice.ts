//渠道消息通知通告
  export class ChannelNotice{
    constructor(
   public channel_notice_id:string,//渠道消息id
   public title:string,//标题
   public showContent:boolean,//是否显示内容
   public time:string,//创建时间
   public content:string,//内容
   public channel_id:string//渠道id
    ){}
}