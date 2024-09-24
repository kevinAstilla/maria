import { Repository } from "typeorm"
import { AppDataSource } from "../config/ormConfig"
import { Ingredient } from "../entities/Ingredient"

const ingredientRepository: Repository<Ingredient> = AppDataSource.getRepository(Ingredient)
console.log(ingredientRepository)
let ingredient = [
  { id: "1", name: "Tomato" },
  { id: "2", name: "Pasta" },
  { id: "3", name: "Olive Oil" },
  { id: "4", name: "Garlic" },
  { id: "5", name: "Basil" }
]

let recipe = [
  { id: "1", name: "Tomato Pasta", ingredients:
    [
      { ingredient: "1", quantity: "300g" },
      { ingredient: "2", quantity: "100g" },
      { ingredient: "3", quantity: "2 tbsp" },
      { ingredient: "4", quantity: "1 clove" },
      { ingredient: "5", quantity: "5 leaves" }
    ]
  },
  { id: "2", name: "Bruschetta", ingredients: 
    [
      { ingredient: "1", quantity: "100g" },
      { ingredient: "3", quantity: "1 tbsp" },
      { ingredient: "4", quantity: "1/2 clove" },
      { ingredient: "5", quantity: "3 leaves" }
    ]
  }
]
const db = { ingredient, recipe }

export const resolvers = {
  Query: {
    ingredients: async () => {
      return await ingredientRepository.find()
    },
    recipes: () => db.recipe,
    recipe:(_: unknown, {id}: {id:string} ) => db.recipe.find(recipe => recipe.id === id)
  },
  Recipe: {
    ingredients: (parent) => {
      return parent.ingredients.map(({ingredient, quantity}) => {
        const ingredientDetails = db.ingredient.find(x => x.id === ingredient)
        return { ingredient: ingredientDetails, quantity }
    })
    } 
  },
  RecipeIngredient: {
    ingredient: (parent) => parent.ingredient 
  },
  Mutation: {
    addIngredient: async (_: any, { ingredient }: { ingredient: { name: string}} ) => {
      const newIngredient = ingredientRepository.create(ingredient);
      await ingredientRepository.save(newIngredient);
      return newIngredient; 
    },
    deleteIngredient: async (_: any, { id }: { id: string }) => {
      console.log(id)
      const ingredient = await ingredientRepository.findOneBy({ id: id });
      if (!ingredient) {
        throw new Error("Ingredient not found");
      }
      await ingredientRepository.remove(ingredient);
      return true;
    }
  }
}