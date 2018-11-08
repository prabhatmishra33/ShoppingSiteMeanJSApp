import { Injectable } from "@angular/core";
import { Http , Response } from "@angular/http";
import { RecipeService } from '../recipes/recipe.service'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
// import 'rxjs/Rx';
// import { map } from 'rxjs/operators';

@Injectable()
export class DataStorageService{

    constructor(private http:Http,private recipeSer:RecipeService,private authServ:AuthService){

    }
    storeRecipe(){
        var serList = {
            rcpList : this.recipeSer.getRecipe()
        }
        console.log(serList);
        return this.http.post('/api/storeRecipes?token='+this.authServ.getToken(),serList)
    }
    getRecipe(){
        // var serList = {
        //     rcpList : this.recipeSer.getRecipe()
        // }
        ///console.log(serList);
        return this.http.get('/api/getRecipes?token='+this.authServ.getToken(),)
            .pipe(
                map(
                    (res:Response)=>{
                        // console.log('console of getRecipe');
                        // console.log(res)
                        return res.json();
                    }
                )
            )   
                
    }


}