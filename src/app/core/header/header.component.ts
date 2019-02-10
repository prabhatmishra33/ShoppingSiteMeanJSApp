import { Component } from '@angular/core';
import { DataStorageService } from '../../shared/data-storage.service';
import { error } from 'util';
import { Response } from '@angular/http';
import { RecipeService } from '../../recipes/recipe.service';
import { AuthService } from '../../auth/auth.service'
import { Router } from '@angular/router';
import { Recipe } from '../../recipes/recipes.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private dataService : DataStorageService,private recipeServ : RecipeService,private authServ:AuthService,private router : Router){

  }

  onSaveData(){
    this.dataService.storeRecipe()
      .subscribe(
        (res)=>{
            console.log(res);
        },
        (error)=>{
          console.log(error);
        }
      )
  }
  onClickData(){
    this.dataService.getRecipe()
      .subscribe(
        (res)=>{
          let recipeLsit = res['recipesList'];
          this.recipeServ.overWriteRecipe(recipeLsit);
        }
      )
  }

  logout(){
    this.authServ.signOut()
      .subscribe(
        (res)=>{
            console.log(res);
            this.authServ.setToken(null);
            this.router.navigate(['/']);
        }
      )
  }

  isAuthenticated(){
    return this.authServ.isAuthenticated();
  }

}
