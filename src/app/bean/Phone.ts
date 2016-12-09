//手机信息
  export class Phone{
    constructor(
   public phone_id:string,//id
   public type:string,//类型
   public number:string,//手机信息编号
   public iemi:string,//手机信息国际移动设备身份码
   public mac:string,//手机信息物理地址
   public inventory_situation:string,//在库情况
   public create_date:string,//创建时间
   public update_date:string,//更新时间
    ){}
}