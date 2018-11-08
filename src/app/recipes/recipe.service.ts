import { Recipe } from './recipes.model';
import { EventEmitter } from '@angular/core';
import { Ingredients } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class RecipeService{

    recipeChanged = new Subject<Recipe[]>();

    private recipe = [
        new Recipe('Vada Pav',
            'Tasty vadapav available in maharashtra',
            'assets/vada-pav.jpg',
            [ new Ingredients('pav','white in color',5),
                new Ingredients('vada','yellow in color',5),
                new Ingredients('chilli','green in color',5)
            ]
        ),
        new Recipe('Pizza',
            'tasty dominos pizza available in india',
            'assets/recipe-Image.jpg',
            [   new Ingredients('tomato','red in color',50),
                new Ingredients('onion','pink in color',50)
            ]
        ),
        ]
    
    getRecipe(){
        return this.recipe.slice();
    }

    getRecipeItemFromId(id:number){
        return this.recipe[id];
    }

    addRecipe(recipe:Recipe){
        this.recipe.push(recipe);
        this.recipeChanged.next(this.getRecipe());
    }

    updateRecipe(index:number,recipe:Recipe){
        this.recipe[index]=recipe;
        this.recipeChanged.next(this.getRecipe());
    }

    deleteRecipe(index:number){
        this.recipe.splice(index,1)
        this.recipeChanged.next(this.getRecipe());
    }
    overWriteRecipe(recipe:any[]){
        this.recipe = recipe;
        this.recipeChanged.next(this.getRecipe());
    }

    
}