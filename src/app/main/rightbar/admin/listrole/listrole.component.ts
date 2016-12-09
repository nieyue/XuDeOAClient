import { Component,OnInit} from '@angular/core';
import { Role } from '../../../../bean/role';//
declare let myUtils: any;
declare let $: any;
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'main-rightbar-admin-listrole',
  templateUrl:'listrole.component.html'
})
export class ListroleComponent implements OnInit{
  roleList:Role[]=[];
  showRoleListIcon=true;//显示数据前的icon
  ngOnInit() {
   //初始化roleList
this.roleList=JSON.parse(sessionStorage.getItem("roleList"));
 this.showRoleListIcon=false;
  }
  constructor( public router:Router){}

 }