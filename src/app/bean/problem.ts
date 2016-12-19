//问题
  export class Problem{
    constructor(
   public problem_id:string,//id
   public name:string,//问题号名称（手机、微信、qq、陌陌、微博）
   public number:string,//问题名称号码(手机号、微信号、qq号、陌陌号、微博号)可以根据number查询手机号信息
   public content:string,//问题内容
   public is_solve:string,//是否解决
   public create_date:string,//创建时间
   public admin_id:string//问题创建者 外键
    ){}
}