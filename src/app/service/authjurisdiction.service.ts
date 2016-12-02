import { Injectable }     from '@angular/core';
import { Http, Response,RequestOptions ,ConnectionBackend,Headers} from '@angular/http';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
}  from '@angular/router';
import { Admin } from '../bean/admin';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {AuthLoginService } from '../service/authlogin.service';
declare let myUtils:any;
@Injectable()
export class AuthJurisdictionService implements CanActivate {
    isHaveJurisdiction: boolean = false;

    admin:Admin;
    role={role_id:11,name:"普通员工"};
    jurisdiction={jurisdiction_id:22,name:"员工管理",addtion:0,deletion:0,updation:0,queried:1,role_id:11};

constructor( private router: Router,private http: Http,private authLoginService:AuthLoginService) {}
    
    getAdmin(adminName:String,password:String):Admin{
  this.authLoginService.login(adminName,password).subscribe(
      response=>
      {
        this.admin=response
        }
    );
    return this.admin;
                         
    }
    getRole(){
      
    }
    getJurisdiction(){

    }
   checkJurisdiction(url:string,message: string): boolean {

    //if (this.admin.role_id==this.jurisdiction.role_id) {
        if(this.jurisdiction.queried==0){
        myUtils.myLoadingToast("没有权限");
        return false;
        }
      //   }
    
    this.router.navigate([url]);
    return true;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;
    return this.checkJurisdiction(url,"加载中。。。");
  }
   canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }
}