

import { Injectable } from "@angular/core";
import { Http , Response } from "@angular/http";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService{
    tokenId:number = null;

    constructor(private http:Http){

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
        return this.http.post('/register',usrObj);
    }

    signInUser(emailId,password){
        var usrObj = {
            username : emailId,
            password : password
        }
        return this.http.post('/login',usrObj)
        .pipe(
            map(
                (res:Response)=>{
                    return res.json();
                }
            )
        )   
    }

    signOut(){
        return this.http.get('/api/logout?token='+this.tokenId);
    }

    isAuthenticated(){
        if(this.tokenId)
            return true;
        else
            return false;
    }
}