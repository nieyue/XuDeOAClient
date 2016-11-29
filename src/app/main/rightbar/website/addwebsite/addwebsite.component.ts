import { Component,OnInit} from '@angular/core';
declare let myUtils: any;
declare let $: any;
declare let UE: any;

@Component({
  selector: 'main-rightbar-website-addwebsite',
  templateUrl:'addwebsite.component.html'
})
export class AddwebsiteComponent implements OnInit{
  ngOnInit() {

  $("#mainModel").click(function(){
console.log($(this).text())
  });
   
 
  }
 }