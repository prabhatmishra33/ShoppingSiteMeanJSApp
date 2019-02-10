import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipes.model'; 
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id : number;
  itemSelected : Recipe;
  RecipeForm:FormGroup;
  editMode=false;
  constructor(private route:ActivatedRoute,private recipeSer : RecipeService,private router:Router) { }

  ngOnInit() {
    this.route.params
      .subscribe( 
        (params : Params)=>{
          this.id = +params["id"];
          if(params["id"]!=null){
            this.editMode=true
            this.itemSelected = this.recipeSer.getRecipeItemFromId(this.id);
            console.log(this.itemSelected);
            console.log("edit this item");
            this.initForm();
          }
          else{
            this.editMode=false;
            console.log("It's a new item call");
            this.initForm();
          }
          
        }
       
       );
  }

  private initForm(){

    let name='';
    let image='';
    let descp='';
    let recipeIndg= new FormArray([]);

    if(this.editMode){
      name = this.itemSelected.name,
      image = this.itemSelected.imgPath,
      descp = this.itemSelected.description
      if(this.itemSelected.Ingredient){
        for(let ind of this.itemSelected.Ingredient){
          recipeIndg.push(
            new FormGroup
            ({
                'itemName' : new FormControl(ind.itemName,[Validators.required]),
                'itemDescp' : new FormControl(ind.itemDescp,[Validators.required]),
            'itemPrice': new FormControl(ind.itemPrice,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)]),
            })
          )
        }
      }
    }

    this.RecipeForm = new FormGroup({
      'name' : new FormControl(name,Validators.required),
      'imgPath': new FormControl(image,Validators.required),
      'description' : new FormControl(descp,Validators.required),
      'Ingredient' : recipeIndg
    });
  }

  onSubmit(){
    console.log("submit");
    console.log(this.RecipeForm);
    if(this.editMode){
      this.recipeSer.updateRecipe(this.id,this.RecipeForm.value);
    }
    else{
      this.recipeSer.addRecipe(this.RecipeForm.value);
    }
    this.router.navigate(['/recipes']);

  }
  onIndgDelete(indgIndex:number){
    console.log("delete indg : "+indgIndex);
    (<FormArray>this.RecipeForm.get('Ingredient')).removeAt(indgIndex);
  }
  onAddIndg(){
    console.log("add Indg");
    (<FormArray>this.RecipeForm.get('Ingredient')).push(
      new FormGroup({
        'itemName' : new FormControl(null,[Validators.required]),
        'itemDescp' : new FormControl(null,[Validators.required]),
        'itemPrice': new FormControl(null,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)]),
      })
    );
  }

  onCancel(){
    this.router.navigate(['../'],{ relativeTo : this.route});
    }


    getControls() {
      return (<FormArray>this.RecipeForm.get('ingredients')).controls;
  }



}
