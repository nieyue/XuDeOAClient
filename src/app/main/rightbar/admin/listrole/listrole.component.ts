import { Component,OnInit} from '@angular/core';
declare let myUtils: any;
declare let $: any;
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'main-rightbar-admin-listrole',
  templateUrl:'listrole.component.html'
})
export class ListroleComponent implements OnInit{
  
  ngOnInit() {
   
 
  }
  constructor( public router:Router){}

 }