//员工信息
  export class Admin{
    constructor(
   public admin_id:string,//id
   public name:string,//姓名
   public cell_phone:string,//手机号
   public email:string,//邮箱
   public password:string,//密码
   public create_date:string,//创建时间
   public last_login_date:string,//最后登录时间
   public role_id:string//角色id
    ){}
}