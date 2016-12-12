import { Injectable }     from '@angular/core';
import { BrowserXhr} from '@angular/http';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
}  from '@angular/router';


declare let myUtils:any;
//ajax服务
@Injectable()  
export class CorsBrowserXhrService extends BrowserXhr {  
    constructor(private router:Router) {  
        super();  
    }  
  
    build(): any {  
        let xhr:XMLHttpRequest = super.build();  
        xhr.withCredentials = true;  
        xhr.onreadystatechange=()=>
{
    if (xhr.readyState==4 && xhr.status==200)
    {
        console.log(xhr)
        if( xhr.response&& xhr.response.code==40001){
                 myUtils.myLoadingToast("会话过期！重新登录");
                 sessionStorage.clear();
                 this.router.navigate(['/']);
                 return ;
           }
    }
}
        return <any>(xhr);  
    }  
} 
