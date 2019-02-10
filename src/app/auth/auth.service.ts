

import { Injectable } from "@angular/core";
import { HttpClient,HttpParams } from "@angular/common/http"
//import { Http , Response } from "@angular/http";

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService{
    tokenId:string = null;

    constructor(private HttpClient:HttpClient){

    }

    setToken(token){
        this.tokenId = token;
    }

    getToken(){
        return this.tokenId;
    }
    
    signUpUser(emailId,password){
        var usrObj = {
            username : emailId,
            password : password
        }
        return this.HttpClient.post('/register',usrObj);
    }

    signInUser(emailId,password){
        var usrObj = {
            username : emailId,
            password : password
        }
        return this.HttpClient.post('/login',usrObj)
        .pipe(
            map(
                (res)=>{
                    return res;
                }
            )
        )   
    }

    signOut(){
        return this.HttpClient.get('/api/logout',{ 
            observe : 'response', 
        //    params : new HttpParams().set('token',this.tokenId )
        });
    }

    isAuthenticated(){
        if(this.tokenId)
            return true;
        else
            return false;
    }
}