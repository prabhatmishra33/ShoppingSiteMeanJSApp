import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../recipes.model';
import { RecipeService } from './../recipe.service';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit,OnDestroy {

  recipe : Recipe[] ;
  recipeSub:Subscription;

  constructor(private recipeSer:RecipeService ,private router:Router ,private route:ActivatedRoute) { }

  ngOnInit() {
    this.recipeSub = this.recipeSer.recipeChanged
      .subscribe(
        (recipe:Recipe[])=>{
          this.recipe = recipe;
        }
      )
    this.recipe  = this.recipeSer.getRecipe();
  }

  listItemClicked(index : number){
   // console.log(index);
    this.router.navigate([index],{ relativeTo : this.route});
  }
  addNewRecipe(){
    this.router.navigate(['new'],{ relativeTo : this.route});
  }

  ngOnDestroy(){
    this.recipeSub.unsubscribe();
  }
  
}
