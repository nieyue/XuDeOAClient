import { Component,OnInit } from '@angular/core';
import { Role } from '../bean/role';//
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
}  from '@angular/router';
declare let myUtils: any;
declare let $: any;
@Component({
  selector: 'seller-main',
  templateUrl:'main.component.html'
})
export class MainComponent implements OnInit {
      roleList:Role[]=[];

      constructor( private router: Router) {}
      ngOnInit(){
            //let _this=this;
     $.get(myUtils.getDomain()+"/role/list",(rld)=>{
           if(rld&&rld.code==40001){
                 myUtils.myLoadingToast("会话过期！重新登录");
                 sessionStorage.clear();
                 this.router.navigate(['/index']);
                 return ;
           }
         sessionStorage.setItem("roleList",JSON.stringify(rld));
           this.roleList=rld;

     });
        //初始化allAdminList
  $.get(myUtils.getDomain()+"/admin/list/all",(pld)=>{
         sessionStorage.setItem("allAdminList",JSON.stringify(pld));
               });

      }
 }