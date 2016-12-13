//手机号码
  export class Phonenumber{
    constructor(
   public phone_number_id:string,//id
   public number:string,//手机号
   public operating_equipment:string,//运营设备
   public robot_equipment:string,//操作设备
   public ip_address:string,//ip地址
   public wechat_number:string,//微信号
   public wechat_type:string,//微信号类型
   public wechat_password:string,//微信密码
   public wechat_reg_date:string,//微信注册日期
   public qq_number:string,//qq号
   public qq_type:string,//qq号类型
   public qq_password:string,//qq密码
   public qq_reg_date:string,//qq注册日期
   public momo_number:string,//陌陌号
   public momo_type:string,//陌陌号类型
   public momo_password:string,//陌陌密码
   public momo_reg_date:string,//陌陌注册日期
   public microblog_number:string,//微博号
   public microblog_type:string,//微博号类型
   public microblog_password:string,//微博密码
   public microblog_reg_date:string,//微博注册日期
   public create_date:string,//手机号码创建时间
   public update_date:string,//手机号码更新时间
   public remark:string//备注
    ){}
}