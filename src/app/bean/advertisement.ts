//广告位
export class Advertisement{
    constructor(
        public advertisement_id:string,//广告位id
        public name:string,//广告位名称
        public platform:string,//投放平台
        public type:string,//广告位类型
        public status:string,//状态
        public transition:boolean,//转态
        public location:string,//广告位置
        public update_time:string,//更新时间
        public channel_id:string//渠道id
    ){}
}