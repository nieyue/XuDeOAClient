//推广统计
  export class Promotionstatistics{
    constructor(
   public promotion_statistics_id:string,//id
   public promotion_date:string,//推广时间
   public period:string,//推广时段
   public link:string,//链接
   public friend_circle:string,//朋友圈用户
   public wechat_group:string,//微信群用户
   public point:string,//点对点用户
   public qq_group:string,//QQ群
   public qq_point:string,//QQ点对点
   public momo:string,//陌陌用户
   public total:string,//推广用户合计
   public days_pv:string,//当日pv
   public days_uv:string,//当日uv
   public days_per_pv:string,//人均pv=当日pv/当日uv
   public days_per_pv_cost:string,//每个pv成本=推广用户合计/当日pv
   public create_date:string//创建时间
    ){}
}