//渠道账户信息
  export class Channel{
    constructor(
   public channel_id:string,//渠道账户id
   public name:string,//手机号码
   public password:string,//密码
   public create_time:string,//创建时间
   public money:string,//金钱
   public identityCards:string,//身份证
   public qq:string,//qq
   public mailBox:string,//邮箱
   public cellPhone:string,//电话
   public payee:string,//收款人
   public bank:string,//开户银行
   public account:string,//银行账号
   public address:string//开户银行地址
    ){}
}