export class Website{
    constructor(
        public website_id:string,//网站id
        public name:string,//网站名称
        public type:string,//网站类型
        public url:string,//网站url
        public create_time:string,//创建时间
        public remark:string,//备注
        public channel_id:string//渠道id
    ){}
}