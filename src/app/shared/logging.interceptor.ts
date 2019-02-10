import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { Injectable } from "@angular/core";
import { tap } from "rxjs/operators";

export class LogInterceptor implements HttpInterceptor{


    intercept(req:HttpRequest<any>,next:HttpHandler):Observable<HttpEvent<any>>{
        console.log("Response Intercepted!");
        //const copiedReq = req.clone({ params : req.params.set('token',this.authService.getToken()) })
        return next.handle(req).pipe(tap(
            event=>{
                console.log("Logging Intercpetor ",event);
            }
        ));
    }
}