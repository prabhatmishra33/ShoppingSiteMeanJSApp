import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipes.model';
import { ShoppingService } from './../../shopping-list/shoppinglist.service';
import { Route, Router, ActivatedRoute, Params } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  itemSelected : Recipe;
  id:number;
  constructor(private shopListService : ShoppingService ,private route:ActivatedRoute,private recipeSer : RecipeService,
    private router:Router
  ) { }

  ngOnInit() {
    //console.log(this.itemSelected);
    //console.log(this.route.params);
    
    this.route.params
      .subscribe( 
        (params : Params)=>{
          this.id = params["id"];
          this.itemSelected = this.recipeSer.getRecipeItemFromId(this.id);
        }
       
       );
  }
  addRecipeItemsToShopList(){
    this.shopListService.addItemsToShop(this.itemSelected.Ingredient);
  }

  deleteRecipe(){
    console.log(this.id);
    this.recipeSer.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }



}
