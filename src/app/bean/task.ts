//每个工作任务
  export class Task{
    constructor(
   public task_id:string,//id
   public name:string,//任务名称（手机、微信、qq、陌陌、微博
   public number:string,//任务名称号码(手机号、微信号、qq号、陌陌号、微博号)
   public base_number:string,//当天基础人数
   public am_number:string,//上午加人数
   public am_total_number:string,//14:00总人数
   public pm_number:string,//下午加人数
   public pm_total_number:string,//17:30总人数
   public night_number:string,//晚上加人数
   public night_total_number:string,//20:00总人数
   public day_total_number:string,//当天通过总人数=20:00总人数-基础人数
   public day_retain_number:string,//当天存留总人数=第二天自己填
   public create_date:string,//创建日期
   public update_date:string,//更新时间
   public admin_id:string//填写人 外键
    ){}
}