import { Injectable } from "@angular/core";

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

///import { Http , Response } from "@angular/http";
import { RecipeService } from '../recipes/recipe.service'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Recipe } from "../recipes/recipes.model";
// import 'rxjs/Rx';
// import { map } from 'rxjs/operators';

@Injectable()
export class DataStorageService{

    constructor(private httpClient:HttpClient,private recipeSer:RecipeService,private authServ:AuthService){

    }
    storeRecipe(){

        //var headers = new HttpHeaders().set('authorize','');
       // var param = 

        var serList = {
            rcpList : this.recipeSer.getRecipe()
        }
        console.log(serList);
        return this.httpClient.post('/api/storeRecipes',serList,{
            observe:'body',
          //  params : new HttpParams().set('token',this.authServ.getToken())
           // headers:headers
        })
    }
    
    getRecipe(){
        // var serList = {
        //     rcpList : this.recipeSer.getRecipe()
        // }
        ///console.log(serList);
        return this.httpClient.get<Recipe[]>('/api/getRecipes',{ 
                observe:'body',
               // params : new HttpParams().set('token',this.authServ.getToken()) 
            })
            .pipe(
                map(
                    (res)=>{
                        // console.log('console of getRecipe');
                        // console.log(res)
                        return res;
                    }
                )
            )   
                
    }


}