import { Component, OnInit,Input } from '@angular/core';
import { Recipe } from '../../recipes.model'
import { RecipeService } from './../../recipe.service';


@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() item : Recipe;
  @Input() index : number;
  constructor(private recipeSer:RecipeService) { }

  ngOnInit() {
  }

}
