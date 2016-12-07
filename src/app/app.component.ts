import {
  OnInit,
  Component,
  Input,
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/core';
declare let myUtils: any;
declare let $: any;
import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl:'app.component.html'
})
export class AppComponent implements  OnInit{
  ngOnInit(){
　　$.ajaxSetup({
// 　　　　timeout: 3000,
// 　　　　dataType: 'html',
// 　　　　//请求成功后触发
// 　　　　success: function (data) { show.append('success invoke!' + data + '<br/>'); },
// 　　　　//请求失败遇到异常触发
 　　//　　error: function (xhr, status, e) { myUtils.myLoadingToast("错误！"); },
// 　　　　//完成请求后触发。即在success或error触发后触发
// 　　　　complete: function (xhr, status) { show.append('complete invoke! status:' + status+'<br/>'); },
　　　　//发送请求前触发
 　　　　beforeSend: function (xhr) {
// 　　　　//可以设置自定义标头
// 　　　　xhr.setRequestHeader('Content-Type', 'application/xml;charset=utf-8');
myUtils.myLoadingToast("加载中...");
 　　　　},
      //  beforeSend: function(xhr) {
      //           xhr.withCredentials = true;
      //       }
      xhrFields: {
                withCredentials: true
            }
　　});
  }
 }
