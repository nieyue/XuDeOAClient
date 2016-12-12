//临时工作
  export class Temporarywork{
    constructor(
   public temporary_work_id:string,//id
   public phone_number:string,//手机号
   public workers:string,//工作人
   public task:string,//工作任务
   public task_situation:string,//完成情况
   public create_date:string,//创建时间
   public update_date:string//更新时间
    ){}
}