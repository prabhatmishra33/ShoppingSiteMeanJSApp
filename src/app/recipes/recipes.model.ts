import { Ingredients } from './../shared/ingredient.model';

export class Recipe{
    public name:string
    public description:string
    public imgPath:string
    public Ingredient : Ingredients[]

    constructor(name:string,desc:string,imgPath:string,indgr:Ingredients[]){
        this.name = name;
        this.description = desc;
        this.imgPath = imgPath;
        this.Ingredient = indgr;
    }
    
}