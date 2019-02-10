import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { Injectable } from "@angular/core";


@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(private authService:AuthService){

    }

    intercept(req:HttpRequest<any>,next:HttpHandler):Observable<HttpEvent<any>>{
        console.log("Request Intercepted!");
        const copiedReq = req.clone({ params : req.params.set('token',this.authService.getToken()) })
        return next.handle(copiedReq);
    }
}