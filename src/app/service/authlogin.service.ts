import { Injectable }     from '@angular/core';
import { Http, Response,RequestOptions ,ConnectionBackend,Headers} from '@angular/http';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
}  from '@angular/router';
import { Admin } from '../bean/admin';//账户
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
declare let myUtils:any;
//登录登出服务
@Injectable()
export class AuthLoginService implements CanActivate {
    isLoggedIn: boolean = false;
    admin:Admin;
constructor( private router: Router,private http:Http) {}
    // private loginAdmin=location.protocol+"//"+location.hostname+"/admin/login";

     private loginAdmin=myUtils.getDomain()+"/admin/login";
     private loginoutAdmin=myUtils.getDomain()+"/admin/loginout";
     private isloginAdmin=myUtils.getDomain()+"/admin/islogin";


  login(adminName:String,password:String): Observable< Admin>{
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
  let options = new RequestOptions({ headers: headers });
  return this.http.post(this.loginAdmin,"adminName="+adminName+"&password="+password ,options)
                    .map(response => response.json()||{});
  }
  logout() {
    this.isLoggedIn = false;
  this.http.get(this.loginoutAdmin);
  }


   checkLogin(url: string): boolean {
  if(JSON.parse(sessionStorage.getItem("alreadyLogin"))){
  this.isLoggedIn=Boolean(JSON.parse(sessionStorage.getItem("alreadyLogin")));
  }else{
    this.isLoggedIn=false;
  }
    if (this.isLoggedIn) { return true; }
  
    // Navigate to the login page with extras
    this.router.navigate([url]);
    return false;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;
    return this.checkLogin(url);
  }
}