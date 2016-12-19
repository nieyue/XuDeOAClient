//网站统计
  export class Webstatistics{
    constructor(
   public web_statistics_id:string,//id
   public web_name:string,//网站名称
   public web_url:string,//网站url
   public uv:string,//uv
   public new_uv:string,//新uv
   public ip:string,//ip
   public pv:string,//pv
   public visit_number:string,//访问次数
   public average_number:string,//人均浏览页面
   public average_deep:string,//平均访问深度
   public bounce_rate:string,//跳出率
   public peak_period:string,//高峰时段
   public create_date:string//创建时间
    ){}
}