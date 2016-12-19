//问题解决
  export class Solve{
    constructor(
   public solve_id:string,//id
   public method:string,//解决方法
   public is_adopt:string,//是否被采纳
   public create_date:string,//创建日期
   public admin_id:string,//解决创建者 外键
   public problem_id:string//问题 外键
    ){}
}