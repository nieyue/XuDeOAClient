import { Injectable }     from '@angular/core';
import { Http, Response,RequestOptions ,ConnectionBackend,Headers} from '@angular/http';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
}  from '@angular/router';
import { Admin } from '../bean/admin';
import { Role } from '../bean/role';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
declare let myUtils:any;
//角色服务
@Injectable()
export class RoleService implements CanActivate {
    isHaveJurisdiction: boolean = false;

    admin:Admin;
    role:Role=new Role('','','','');
  

constructor( private router: Router,private http: Http) {}
   
    getRole(){
      this.role=JSON.parse(sessionStorage.getItem("role"));
    }
    
   checkRole(url:string): boolean {

    this.getRole();
   if(this.role.name=="普通员工"){
    this.router.navigate([url]);
     return false;
   }
    
    return true;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;
    return this.checkRole(url);
  }
   canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }
}