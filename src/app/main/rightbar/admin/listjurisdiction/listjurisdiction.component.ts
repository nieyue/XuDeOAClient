import { Component,OnInit} from '@angular/core';
declare let myUtils: any;
declare let $: any;
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'main-rightbar-admin-listjurisdiction',
  templateUrl:'listjurisdiction.component.html'
})
export class ListjurisdictionComponent implements OnInit{
 
  ngOnInit() {
   
 
  }
  constructor( public router:Router){}
  
 }