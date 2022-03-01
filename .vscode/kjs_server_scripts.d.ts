/**
 * Recipe Settings. Configure which recipe events (`added`, `removed`, `skipped`, `erroring`) will be logged to the console.
 */
declare const settings: ISettings;


/**
 * Item property.
 */
 declare const Item: IItem;

/**
 * Fluid properties.
 */
declare const Fluid: IFluid;


//#region settings
interface ISettings {
    /**
     * Whether a line in the console will be logged, when a recipe is added via KubeJS.
     */
    logAddedRecipes: boolean;
    /**
     * Whether a line in the console will be logged, when a recipe is removed via KubeJS.
     */
    logRemovedRecipes: boolean;
    /**
     * Whether a line in the console will be logged, when a recipe that is supposed to be added or removed via KubeJS is skipped.
     */
    logSkippedRecipes: boolean;
    /**
     * Whether a line in the console will be logged, when a recipe that is supposed to be added or removed via KubeJS is throwing an error.
     */
    logErroringRecipes: boolean;
}
//#endregion settings
// 090611

/**
 * Filter a recipe. Multiple can be combined for AND logic.
 *
 */
interface IEventRecipeFilter {
    /**
     * Filter recipes based on their output items.
     * @example // remove by output item id
     * event.remove({output: 'minecraft:stone'})
     * @example // remove by output item tag
     * event.remove({output: '#minecraft:wool'})
     */
    output: string;
    /**
     * Filter recipes based on their output items.
     * @example // remove by input item id
     * event.remove({input: 'minecraft:stone'})
     * @example // remove by input item tag
     * event.remove({input: '#minecraft:wool'})
     */
    input: string;
    /**
     * Filter recipes based on the mod that added them.
     * @example // remove by mod that added the recipe
     * event.remove({mod: 'ftbquests'})
     */
    mod: string;
    /**
     * Filter recipes based on the type of crafting used to craft the result item.
     * @example // remove by crafting type
     * event.remove({type: 'minecraft:campfire_cooking'})
     */
    type: string;
    /**
     * Filter recipes based on the recipe id. Usually following the format `<mod_id>:<recipe_json_file_name>`
     * @example // remove by recipe id
     * event.remove({id: 'minecraft:glowstone'})
     */
    id: string;
}

interface IRecipeShaped extends IDefaultRecipe{
    /**
     * Damages an ingredient at a specified index (durability).
     * @param ingredient_index The index of the ingredient to damage.
     * @example // slot ids:
     * [
     * '012'
     * '345',
     * '678',
     * ]
     */
    damageIngredient(ingredient_index: number): IRecipeShaped;
    /**
     * Keeps a specified item, unless it breaks in the crafting process by the function `damageIngredient()`.
     * @param item Which item to keep. Can be item id or `Item.of()`.
     */
    keepIngredient(item: string): IRecipeShaped;
    /**
     * Replaces an item / ingredient when the crafting is done.
     * @param original_item The original item in the craft that will later be replaced.
     * @param replaced_item The item that replaces the original item.
     * @example
     * replaceIngredient({item: Item.of('minecraft:potion', {Potion: 'minecraft:water'})}, 'minecraft:glass_bottle')
     */
    replaceIngredient(
        original_item: IItemAdvanced | string,
        replaced_item: string
    ): IRecipeShaped;


}

interface IRecipeCustom {
    /**Required property*/
    type:string
    /**Frequently used property*/
    pattern?:string[]
    /**Frequently used property*/
    key?:object[]
    /**Frequently used property*/
    result?:string
    /**Frequently used property*/
    result?:string[]
    /**Frequently used property*/
    result?:object
    /**Frequently used property*/
    result?:object[]
    /**Frequently used property*/
    fluid?:IFluidTag
    /**Frequently used property*/
    fluid?:IFluidTag[]
    /**Frequently used property*/
    duration?:number
    /**Frequently used property*/
    temperature?:number
    /**Frequently used property*/
    mana?:number
    /**Frequently used property*/
    cooling_time?:number
    /**Frequently used property*/
    time?:number
    /**Frequently used property*/
    processing_time?:number
    /**Frequently used property*/
    duration?:number
    /**Frequently used property*/
    input?:string
    /**Frequently used property*/
    input?:string[]
    /**Frequently used property*/
    output?:string
    /**Frequently used property*/
    output?:string[]

}
interface IRecipeShapeless extends IDefaultRecipe{
    /**
     * Damages an Item (durability).
     * @param item The Item to damage.
     */
    damageItem(item: IItemAdvanced): IRecipeShapeless;
    /**
     * Replaces an item / ingredient when the crafting is done.
     * @param original_item The original item in the craft that will later be replaced.
     * @param replaced_item The item that replaces the original item.
     * @example
     * replaceIngredient({item: Item.of('minecraft:potion', {Potion: 'minecraft:water'})}, 'minecraft:glass_bottle')
     */
    replaceIngredient(
        original_item: IItemAdvanced | string,
        replaced_item: string
    ): IRecipeShapeless;
}

interface IDefaultRecipe {
    /**
     * Set a recipe ID to a specific recipe instead of having an automatically generated one.
     * @param recipe_id The id of the recipe. Format: `<modID>:<recipeID>`
     */
    id(recipe_id: string): string;
    /**
     * Set a recipe ID to a specific recipe instead of having an automatically generated one.
     * @param recipe_id The id of the recipe. Format: `<modID>:<recipeID>`
     */
    id(recipe_id: string): IDefaultRecipe;    
}

interface IItemAdvanced {
    /**
     * Ignore the NBT of an item.
     */
    ignoreNBT(): void;
    /**
     * Set a chance of an extra item or similar. **Only use when specified!**
     * @param percent The chance to get whatever item specified. Ranges from 0.0 (0%) to 1.0 (100%).
     */
    chance(percent:number): void
    
    /**
     * Set a chance of an extra item or similar. **Only use when specified!**
     * @param percent The chance to get whatever item specified. Ranges from 0.0 (0%) to 1.0 (100%).
     */
    withChance(percent:number): void
}


interface IFluidAdvanced {

}

interface IFluidTag {
    fluidTag: string
    amount: number
}


interface IItemNBT {
    /**
     * An Items potion type.
     */
    Potion: string;
}

interface IItem {
    /**
     * Get the advanced properties of an item.
     * @param item The item id.
     * @param NBT The item NBT. Specification not required.
     */
    of(item: string, NBT:IItemNBT): IItemAdvanced;
}

interface IFluid {
    /**
     * Get the advanced properties of a fluid.
     * @param fluid The fluid id.
     * @param amount The amount of fluid.
     */
     of(fluid: string, amount:number): IFluidAdvanced;
}

interface IMekanismGas {
    /**
     * The type of gase used.
     */
    gas: string;
    /**
     * The amount of gas used (`mb`).
     */
    amount: number;
}

interface ICreateHeating extends IDefaultRecipe{
    /**
     * Requires a recipe to be heated
     */
    heated(): IDefaultRecipe
    /**
     * Requires a recipe to be superheated
     */
    superheated(): IDefaultRecipe
}

interface ICreateMechCraftPattern {

}

interface IModRecipes {
    /**
     * Recipes for Mekanism.
     * Mod requirement: `KubeJS Mekanism`
     */
    mekanism: IMekanismRecipes;
    /**
     * Recipes for Immersive Engineering.
     * Mod requirement: `KubeJS Immersive Engineering`
     */
    immersiveengineering: IImmersiveEngineeringRecipes;
    /**
     * Recipes for the Thermal Series.
     * Mod requirement: `KubeJS Thermal`
     */
    thermal: IThermalRecipes;
    /**
     * Recipes for Blood Magic.
     * Mod requirement: `KubeJS Blood Magic`
     */
    bloodmagic: IBloodmagicRecipes;
    /**
     * Recipes for Create.
     * Mod requirement: `KubeJS Create`
     */
    create: ICreateRecipes;
}

interface IImmersiveEngineeringRecipes {

}

interface IThermalRecipes {

}

interface IBloodmagicRecipes {

}

interface ICreateRecipes {
    //#region conversion
    /**
     * #### `KubeJS` + `KubeJS Create`
     * Create a create conversion recipe.
     * @param output The output fluid tag.
     * @param input The fluid tag.
     */
    conversion(output:IFluidTag, input:IFluidTag): IDefaultRecipe
    /**
     * #### `KubeJS` + `KubeJS Create`
     * Create a create conversion recipe.
     * @param output The output item id.
     * @param input The input item id.
     */
    conversion(output:string, input:string): IDefaultRecipe
    /**
     * #### `KubeJS` + `KubeJS Create`
     * Create a create conversion recipe.
     * @param output The output item.
     * @param input The input item.
     */
    conversion(output:IItemAdvanced, input:IItemAdvanced): IDefaultRecipe
    /**
     * #### `KubeJS` + `KubeJS Create`
     * Create a create conversion recipe.
     * @param output The output fluid.
     * @param input The input fluid.
     */
    conversion(output:IFluidAdvanced, input:IFluidAdvanced): IDefaultRecipe
    /**
     * #### `KubeJS` + `KubeJS Create`
     * Create a create conversion recipe.
     * @param output The output item ids.
     * @param input The input item ids.
     */
    conversion(output:string[], input:string[]): IDefaultRecipe
    /**
     * #### `KubeJS` + `KubeJS Create`
     * Create a create conversion recipe.
     * @param output The output items.
     * @param input The input items.
     */
    conversion(output:IItemAdvanced[], input:IItemAdvanced[]): IDefaultRecipe
    /**
     * #### `KubeJS` + `KubeJS Create`
     * Create a create conversion recipe.
     * @param output The output fluids.
     * @param input The input fluids.
     */
    conversion(output:IFluidAdvanced[], input:IFluidAdvanced[]): IDefaultRecipe
    //#endregion conversion
    
    //#region crushing
    /**
     * #### `KubeJS` + `KubeJS Create`
     * Create a create crushing recipe.
     * @param output The output fluid tag.
     * @param input Thfluid tags).
     */
    crushing(output:IFluidTag, input:IFluidTag): IDefaultRecipe
    /**
     * #### `KubeJS` + `KubeJS Create`
     * Create a create crushing recipe.
     * @param output The output item id.
     * @param input The input item id.
     */
    crushing(output:string, input:string): IDefaultRecipe
    /**
     * #### `KubeJS` + `KubeJS Create`
     * Create a create crushing recipe.
     * @param output The output item.
     * @param input The input item.
     */
    crushing(output:IItemAdvanced, input:IItemAdvanced): IDefaultRecipe
    /**
     * #### `KubeJS` + `KubeJS Create`
     * Create a create crushing recipe.
     * @param output The output fluid.
     * @param input The input fluid.
     */
    crushing(output:IFluidAdvanced, input:IFluidAdvanced): IDefaultRecipe
    /**
     * #### `KubeJS` + `KubeJS Create`
     * Create a create crushing recipe.
     * @param output The output item ids.
     * @param input The input item ids.
     */
    crushing(output:string[], input:string[]): IDefaultRecipe
    /**
     * #### `KubeJS` + `KubeJS Create`
     * Create a create crushing recipe.
     * @param output The output items.
     * @param input The input items.
     */
    crushing(output:IItemAdvanced[], input:IItemAdvanced[]): IDefaultRecipe
    /**
     * #### `KubeJS` + `KubeJS Create`
     * Create a create crushing recipe.
     * @param output The output fluids.
     * @param input The input fluids.
     */
    crushing(output:IFluidAdvanced[], input:IFluidAdvanced[]): IDefaultRecipe
    //#endregion crushing


    //#region cutting
    /**
     * #### `KubeJS` + `KubeJS Create`
     * Create a create cutting recipe.
     * @param output The output fluid tag.
     * @param input Thfluid tags).
     */
    cutting(output:IFluidTag, input:IFluidTag): IDefaultRecipe
    /**
     * #### `KubeJS` + `KubeJS Create`
     * Create a create cutting recipe.
     * @param output The output item id.
     * @param input The input item id.
     */
    cutting(output:string, input:string): IDefaultRecipe
    /**
     * #### `KubeJS` + `KubeJS Create`
     * Create a create cutting recipe.
     * @param output The output item.
     * @param input The input item.
     */
    cutting(output:IItemAdvanced, input:IItemAdvanced): IDefaultRecipe
    /**
     * #### `KubeJS` + `KubeJS Create`
     * Create a create cutting recipe.
     * @param output The output fluid.
     * @param input The input fluid.
     */
    cutting(output:IFluidAdvanced, input:IFluidAdvanced): IDefaultRecipe
    /**
     * #### `KubeJS` + `KubeJS Create`
     * Create a create cutting recipe.
     * @param output The output item ids.
     * @param input The input item ids.
     */
    cutting(output:string[], input:string[]): IDefaultRecipe
    /**
     * #### `KubeJS` + `KubeJS Create`
     * Create a create cutting recipe.
     * @param output The output items.
     * @param input The input items.
     */
    cutting(output:IItemAdvanced[], input:IItemAdvanced[]): IDefaultRecipe
    /**
     * #### `KubeJS` + `KubeJS Create`
     * Create a create cutting recipe.
     * @param output The output fluids.
     * @param input The input fluids.
     */
    cutting(output:IFluidAdvanced[], input:IFluidAdvanced[]): IDefaultRecipe
    //#endregion cutting
    //#region milling
    /**
    * #### `KubeJS` + `KubeJS Create`
    * Create a create milling recipe.
    * @param output The output fluid tag.
    * @param input Thfluid tags).
    */
    milling(output:IFluidTag, input:IFluidTag): IDefaultRecipe
    /**
     * #### `KubeJS` + `KubeJS Create`
     * Create a create milling recipe.
     * @param output The output item id.
     * @param input The input item id.
     */
    milling(output:string, input:string): IDefaultRecipe
    /**
     * #### `KubeJS` + `KubeJS Create`
     * Create a create milling recipe.
     * @param output The output item.
     * @param input The input item.
     */
    milling(output:IItemAdvanced, input:IItemAdvanced): IDefaultRecipe
    /**
     * #### `KubeJS` + `KubeJS Create`
     * Create a create milling recipe.
     * @param output The output fluid.
     * @param input The input fluid.
     */
    milling(output:IFluidAdvanced, input:IFluidAdvanced): IDefaultRecipe
    /**
     * #### `KubeJS` + `KubeJS Create`
     * Create a create milling recipe.
     * @param output The output item ids.
     * @param input The input item ids.
     */
    milling(output:string[], input:string[]): IDefaultRecipe
    /**
     * #### `KubeJS` + `KubeJS Create`
     * Create a create milling recipe.
     * @param output The output items.
     * @param input The input items.
     */
    milling(output:IItemAdvanced[], input:IItemAdvanced[]): IDefaultRecipe
    /**
     * #### `KubeJS` + `KubeJS Create`
     * Create a create milling recipe.
     * @param output The output fluids.
     * @param input The input fluids.
     */
    milling(output:IFluidAdvanced[], input:IFluidAdvanced[]): IDefaultRecipe
    //#endregion milling

    //#region basin
    /**
    * #### `KubeJS` + `KubeJS Create`
    * Create a create basin recipe.
    * @param output The output fluid tag.
    * @param input Thfluid tags).
    */
    basin(output:IFluidTag, input:IFluidTag): IDefaultRecipe
    /**
     * #### `KubeJS` + `KubeJS Create`
     * Create a create basin recipe.
     * @param output The output item id.
     * @param input The input item id.
     */
    basin(output:string, input:string): IDefaultRecipe
    /**
     * #### `KubeJS` + `KubeJS Create`
     * Create a create basin recipe.
     * @param output The output item.
     * @param input The input item.
     */
    basin(output:IItemAdvanced, input:IItemAdvanced): IDefaultRecipe
    /**
     * #### `KubeJS` + `KubeJS Create`
     * Create a create basin recipe.
     * @param output The output fluid.
     * @param input The input fluid.
     */
    basin(output:IFluidAdvanced, input:IFluidAdvanced): IDefaultRecipe
    /**
     * #### `KubeJS` + `KubeJS Create`
     * Create a create basin recipe.
     * @param output The output item ids.
     * @param input The input item ids.
     */
    basin(output:string[], input:string[]): IDefaultRecipe
    /**
     * #### `KubeJS` + `KubeJS Create`
     * Create a create basin recipe.
     * @param output The output items.
     * @param input The input items.
     */
    basin(output:IItemAdvanced[], input:IItemAdvanced[]): IDefaultRecipe
    /**
     * #### `KubeJS` + `KubeJS Create`
     * Create a create basin recipe.
     * @param output The output fluids.
     * @param input The input fluids.
     */
    basin(output:IFluidAdvanced[], input:IFluidAdvanced[]): IDefaultRecipe
    //#endregion basin


    //#region mixing
    /**
    * #### `KubeJS` + `KubeJS Create`
    * Create a create mixing recipe.
    * @param output The output fluid tag.
    * @param input Thfluid tags).
    */
    mixing(output:IFluidTag, input:IFluidTag): ICreateHeating
    /**
     * #### `KubeJS` + `KubeJS Create`
     * Create a create mixing recipe.
     * @param output The output item id.
     * @param input The input item id.
     */
    mixing(output:string, input:string): ICreateHeating
    /**
     * #### `KubeJS` + `KubeJS Create`
     * Create a create mixing recipe.
     * @param output The output item.
     * @param input The input item.
     */
    mixing(output:IItemAdvanced, input:IItemAdvanced): ICreateHeating
    /**
     * #### `KubeJS` + `KubeJS Create`
     * Create a create mixing recipe.
     * @param output The output fluid.
     * @param input The input fluid.
     */
    mixing(output:IFluidAdvanced, input:IFluidAdvanced): ICreateHeating
    /**
     * #### `KubeJS` + `KubeJS Create`
     * Create a create mixing recipe.
     * @param output The output item ids.
     * @param input The input item ids.
     */
    mixing(output:string[], input:string[]): ICreateHeating
    /**
     * #### `KubeJS` + `KubeJS Create`
     * Create a create mixing recipe.
     * @param output The output items.
     * @param input The input items.
     */
    mixing(output:IItemAdvanced[], input:IItemAdvanced[]): ICreateHeating
    /**
     * #### `KubeJS` + `KubeJS Create`
     * Create a create mixing recipe.
     * @param output The output fluids.
     * @param input The input fluids.
     */
    mixing(output:IFluidAdvanced[], input:IFluidAdvanced[]): ICreateHeating
    //#endregion mixing


    //#region compacting
    /**
    * #### `KubeJS` + `KubeJS Create`
    * Create a create compacting recipe.
    * @param output The output fluid tag.
    * @param input Thfluid tags).
    */
    compacting(output:IFluidTag, input:IFluidTag): ICreateHeating
    /**
     * #### `KubeJS` + `KubeJS Create`
     * Create a create compacting recipe.
     * @param output The output item id.
     * @param input The input item id.
     */
    compacting(output:string, input:string): ICreateHeating
    /**
     * #### `KubeJS` + `KubeJS Create`
     * Create a create compacting recipe.
     * @param output The output item.
     * @param input The input item.
     */
    compacting(output:IItemAdvanced, input:IItemAdvanced): ICreateHeating
    /**
     * #### `KubeJS` + `KubeJS Create`
     * Create a create compacting recipe.
     * @param output The output fluid.
     * @param input The input fluid.
     */
    compacting(output:IFluidAdvanced, input:IFluidAdvanced): ICreateHeating
    /**
     * #### `KubeJS` + `KubeJS Create`
     * Create a create compacting recipe.
     * @param output The output item ids.
     * @param input The input item ids.
     */
    compacting(output:string[], input:string[]): ICreateHeating
    /**
     * #### `KubeJS` + `KubeJS Create`
     * Create a create compacting recipe.
     * @param output The output items.
     * @param input The input items.
     */
    compacting(output:IItemAdvanced[], input:IItemAdvanced[]): ICreateHeating
    /**
     * #### `KubeJS` + `KubeJS Create`
     * Create a create compacting recipe.
     * @param output The output fluids.
     * @param input The input fluids.
     */
    compacting(output:IFluidAdvanced[], input:IFluidAdvanced[]): ICreateHeating
    //#endregion compacting

    //#region pressing
    /**
    * #### `KubeJS` + `KubeJS Create`
    * Create a create pressing recipe.
    * @param output The output fluid tag.
    * @param input Thfluid tags).
    */
    pressing(output:IFluidTag, input:IFluidTag): IDefaultRecipe
    /**
     * #### `KubeJS` + `KubeJS Create`
     * Create a create pressing recipe.
     * @param output The output item id.
     * @param input The input item id.
     */
    pressing(output:string, input:string): IDefaultRecipe
    /**
     * #### `KubeJS` + `KubeJS Create`
     * Create a create pressing recipe.
     * @param output The output item.
     * @param input The input item.
     */
    pressing(output:IItemAdvanced, input:IItemAdvanced): IDefaultRecipe
    /**
     * #### `KubeJS` + `KubeJS Create`
     * Create a create pressing recipe.
     * @param output The output fluid.
     * @param input The input fluid.
     */
    pressing(output:IFluidAdvanced, input:IFluidAdvanced): IDefaultRecipe
    /**
     * #### `KubeJS` + `KubeJS Create`
     * Create a create pressing recipe.
     * @param output The output item ids.
     * @param input The input item ids.
     */
    pressing(output:string[], input:string[]): IDefaultRecipe
    /**
     * #### `KubeJS` + `KubeJS Create`
     * Create a create pressing recipe.
     * @param output The output items.
     * @param input The input items.
     */
    pressing(output:IItemAdvanced[], input:IItemAdvanced[]): IDefaultRecipe
    /**
     * #### `KubeJS` + `KubeJS Create`
     * Create a create pressing recipe.
     * @param output The output fluids.
     * @param input The input fluids.
     */
    pressing(output:IFluidAdvanced[], input:IFluidAdvanced[]): IDefaultRecipe
    //#endregion pressing

    //#region sandpaperPolishing
    /**
    * #### `KubeJS` + `KubeJS Create`
    * Create a create sandpaperPolishing recipe.
    * @param output The output fluid tag.
    * @param input Thfluid tags).
    */
    sandpaperPolishing(output:IFluidTag, input:IFluidTag): IDefaultRecipe
    /**
     * #### `KubeJS` + `KubeJS Create`
     * Create a create sandpaperPolishing recipe.
     * @param output The output item id.
     * @param input The input item id.
     */
    sandpaperPolishing(output:string, input:string): IDefaultRecipe
    /**
     * #### `KubeJS` + `KubeJS Create`
     * Create a create sandpaperPolishing recipe.
     * @param output The output item.
     * @param input The input item.
     */
    sandpaperPolishing(output:IItemAdvanced, input:IItemAdvanced): IDefaultRecipe
    /**
     * #### `KubeJS` + `KubeJS Create`
     * Create a create sandpaperPolishing recipe.
     * @param output The output fluid.
     * @param input The input fluid.
     */
    sandpaperPolishing(output:IFluidAdvanced, input:IFluidAdvanced): IDefaultRecipe
    /**
     * #### `KubeJS` + `KubeJS Create`
     * Create a create sandpaperPolishing recipe.
     * @param output The output item ids.
     * @param input The input item ids.
     */
    sandpaperPolishing(output:string[], input:string[]): IDefaultRecipe
    /**
     * #### `KubeJS` + `KubeJS Create`
     * Create a create sandpaperPolishing recipe.
     * @param output The output items.
     * @param input The input items.
     */
    sandpaperPolishing(output:IItemAdvanced[], input:IItemAdvanced[]): IDefaultRecipe
    /**
     * #### `KubeJS` + `KubeJS Create`
     * Create a create sandpaperPolishing recipe.
     * @param output The output fluids.
     * @param input The input fluids.
     */
    sandpaperPolishing(output:IFluidAdvanced[], input:IFluidAdvanced[]): IDefaultRecipe
    //#endregion sandpaperPolishing

    //#region splashing
    /**
    * #### `KubeJS` + `KubeJS Create`
    * Create a create splashing recipe.
    * @param output The output fluid tag.
    * @param input Thfluid tags).
    */
    splashing(output:IFluidTag, input:IFluidTag): IDefaultRecipe
    /**
     * #### `KubeJS` + `KubeJS Create`
     * Create a create splashing recipe.
     * @param output The output item id.
     * @param input The input item id.
     */
    splashing(output:string, input:string): IDefaultRecipe
    /**
     * #### `KubeJS` + `KubeJS Create`
     * Create a create splashing recipe.
     * @param output The output item.
     * @param input The input item.
     */
    splashing(output:IItemAdvanced, input:IItemAdvanced): IDefaultRecipe
    /**
     * #### `KubeJS` + `KubeJS Create`
     * Create a create splashing recipe.
     * @param output The output fluid.
     * @param input The input fluid.
     */
    splashing(output:IFluidAdvanced, input:IFluidAdvanced): IDefaultRecipe
    /**
     * #### `KubeJS` + `KubeJS Create`
     * Create a create splashing recipe.
     * @param output The output item ids.
     * @param input The input item ids.
     */
    splashing(output:string[], input:string[]): IDefaultRecipe
    /**
     * #### `KubeJS` + `KubeJS Create`
     * Create a create splashing recipe.
     * @param output The output items.
     * @param input The input items.
     */
    splashing(output:IItemAdvanced[], input:IItemAdvanced[]): IDefaultRecipe
    /**
     * #### `KubeJS` + `KubeJS Create`
     * Create a create splashing recipe.
     * @param output The output fluids.
     * @param input The input fluids.
     */
    splashing(output:IFluidAdvanced[], input:IFluidAdvanced[]): IDefaultRecipe
    //#endregion splashing

    //#region deploying
    /**
    * #### `KubeJS` + `KubeJS Create`
    * Create a create deploying recipe.
    * @param output The output fluid tag.
    * @param input Thfluid tags).
    */
    deploying(output:IFluidTag, input:IFluidTag): IDefaultRecipe
    /**
     * #### `KubeJS` + `KubeJS Create`
     * Create a create deploying recipe.
     * @param output The output item id.
     * @param input The input item id.
     */
    deploying(output:string, input:string): IDefaultRecipe
    /**
     * #### `KubeJS` + `KubeJS Create`
     * Create a create deploying recipe.
     * @param output The output item.
     * @param input The input item.
     */
    deploying(output:IItemAdvanced, input:IItemAdvanced): IDefaultRecipe
    /**
     * #### `KubeJS` + `KubeJS Create`
     * Create a create deploying recipe.
     * @param output The output fluid.
     * @param input The input fluid.
     */
    deploying(output:IFluidAdvanced, input:IFluidAdvanced): IDefaultRecipe
    /**
     * #### `KubeJS` + `KubeJS Create`
     * Create a create deploying recipe.
     * @param output The output item ids.
     * @param input The input item ids.
     */
    deploying(output:string[], input:string[]): IDefaultRecipe
    /**
     * #### `KubeJS` + `KubeJS Create`
     * Create a create deploying recipe.
     * @param output The output items.
     * @param input The input items.
     */
    deploying(output:IItemAdvanced[], input:IItemAdvanced[]): IDefaultRecipe
    /**
     * #### `KubeJS` + `KubeJS Create`
     * Create a create deploying recipe.
     * @param output The output fluids.
     * @param input The input fluids.
     */
    deploying(output:IFluidAdvanced[], input:IFluidAdvanced[]): IDefaultRecipe
    //#endregion deploying

    //#region filling
    /**
    * #### `KubeJS` + `KubeJS Create`
    * Create a create filling recipe.
    * @param output The output fluid tag.
    * @param input Thfluid tags).
    */
    filling(output:IFluidTag, input:IFluidTag): IDefaultRecipe
    /**
     * #### `KubeJS` + `KubeJS Create`
     * Create a create filling recipe.
     * @param output The output item id.
     * @param input The input item id.
     */
    filling(output:string, input:string): IDefaultRecipe
    /**
     * #### `KubeJS` + `KubeJS Create`
     * Create a create filling recipe.
     * @param output The output item.
     * @param input The input item.
     */
    filling(output:IItemAdvanced, input:IItemAdvanced): IDefaultRecipe
    /**
     * #### `KubeJS` + `KubeJS Create`
     * Create a create filling recipe.
     * @param output The output fluid.
     * @param input The input fluid.
     */
    filling(output:IFluidAdvanced, input:IFluidAdvanced): IDefaultRecipe
    /**
     * #### `KubeJS` + `KubeJS Create`
     * Create a create filling recipe.
     * @param output The output item ids.
     * @param input The input item ids.
     */
    filling(output:string[], input:string[]): IDefaultRecipe
    /**
     * #### `KubeJS` + `KubeJS Create`
     * Create a create filling recipe.
     * @param output The output items.
     * @param input The input items.
     */
    filling(output:IItemAdvanced[], input:IItemAdvanced[]): IDefaultRecipe
    /**
     * #### `KubeJS` + `KubeJS Create`
     * Create a create filling recipe.
     * @param output The output fluids.
     * @param input The input fluids.
     */
    filling(output:IFluidAdvanced[], input:IFluidAdvanced[]): IDefaultRecipe
    //#endregion filling

    //#region empying
    /**
    * #### `KubeJS` + `KubeJS Create`
    * Create a create empying recipe.
    * @param output The output fluid tag.
    * @param input Thfluid tags).
    */
    empying(output:IFluidTag, input:IFluidTag): IDefaultRecipe
    /**
     * #### `KubeJS` + `KubeJS Create`
     * Create a create empying recipe.
     * @param output The output item id.
     * @param input The input item id.
     */
    empying(output:string, input:string): IDefaultRecipe
    /**
     * #### `KubeJS` + `KubeJS Create`
     * Create a create empying recipe.
     * @param output The output item.
     * @param input The input item.
     */
    empying(output:IItemAdvanced, input:IItemAdvanced): IDefaultRecipe
    /**
     * #### `KubeJS` + `KubeJS Create`
     * Create a create empying recipe.
     * @param output The output fluid.
     * @param input The input fluid.
     */
    empying(output:IFluidAdvanced, input:IFluidAdvanced): IDefaultRecipe
    /**
     * #### `KubeJS` + `KubeJS Create`
     * Create a create empying recipe.
     * @param output The output item ids.
     * @param input The input item ids.
     */
    empying(output:string[], input:string[]): IDefaultRecipe
    /**
     * #### `KubeJS` + `KubeJS Create`
     * Create a create empying recipe.
     * @param output The output items.
     * @param input The input items.
     */
    empying(output:IItemAdvanced[], input:IItemAdvanced[]): IDefaultRecipe
    /**
     * #### `KubeJS` + `KubeJS Create`
     * Create a create empying recipe.
     * @param output The output fluids.
     * @param input The input fluids.
     */
    empying(output:IFluidAdvanced[], input:IFluidAdvanced[]): IDefaultRecipe
    //#endregion empying
}


interface IMekanismRecipes {
    /**
     * #### `KubeJS` + `KubeJS Mekanism`
     * Create a mekanism crushing recipe.
     * @param output The output item.
     * @param input The input item.
     * @example // create a crushing recipe that makes 2 stone from 1 dirt.
     * event.recipes.mekanism.crushing('2x minecraft:stone', 'minecraft:dirt')
     */
    crushing(
        output: IItemAdvanced | string,
        input: IItemAdvanced | string
    ): IDefaultRecipe;
    /**
     * #### `KubeJS` + `KubeJS Mekanism`
     * Create a mekanism enriching recipe.
     * @param output The output item.
     * @param input The input item.
     * @example // create a enriching recipe that makes 2 stone from 1 dirt.
     * event.recipes.mekanism.enriching('2x minecraft:stone', 'minecraft:dirt')
     */
    enriching(
        output: IItemAdvanced | string,
        input: IItemAdvanced | string
    ): IDefaultRecipe;
    /**
     * #### `KubeJS` + `KubeJS Mekanism`
     * Create a mekanism smelting recipe.
     * @param output The output item.
     * @param input The input item.
     * @example // create a smelting recipe that makes 2 stone from 1 dirt.
     * event.recipes.mekanism.smelting('2x minecraft:stone', 'minecraft:dirt')
     */
    smelting(
        output: IItemAdvanced | string,
        input: IItemAdvanced | string
    ): IDefaultRecipe;
    /**
     * #### `KubeJS` + `KubeJS Mekanism`
     * Creates a mekanism combining recipe.
     * @param output The output item.
     * @param input1 The first of the 2 input items.
     * @param input2 The second of the 2 input items.
     * @example // create a recipe that combines a gold ingot and an apple into a golden apple
     * event.recipes.mekanism.combining('minecraft:golden_apple', 'minecraft:apple', 'minecraft:gold_ingot')
     */
    combining(
        output: IItemAdvanced | string,
        input1: IItemAdvanced | string,
        input2: IItemAdvanced | string
    ): IDefaultRecipe;
    /**
     * #### `KubeJS` + `KubeJS Mekanism`
     * Creates a mekanism compressing recipe.
     * @param output The result item.
     * @param input The input item.
     * @param input_gas The input gas and amount of it.
     * @example // create a compressing recipe that makes obsidian from a lava bucket and 200mb of oxygen.
     * event.recipes.mekanism.compressing('minecraft:obsidian', 'minecraft:lava_bucket', {gas: 'mekanism:oxygen', amount: 200})
     */
    compressing(
        output: IItemAdvanced | string,
        input: IItemAdvanced | string,
        input_gas: IMekanismGas
    ): IDefaultRecipe;
    /**
     * #### `KubeJS` + `KubeJS Mekanism`
     * Creates a mekanism purifying recipe.
     * @param output The result item.
     * @param input The input item.
     * @param input_gas The input gas and amount of it.
     * @example // create a purifying recipe that makes obsidian from a lava bucket and 200mb of oxygen.
     * event.recipes.mekanism.purifying('minecraft:obsidian', 'minecraft:lava_bucket', {gas: 'mekanism:oxygen', amount: 200})
     */
    purifying(
        output: IItemAdvanced | string,
        input: IItemAdvanced | string,
        input_gas: IMekanismGas
    ): IDefaultRecipe;
    /**
     * #### `KubeJS` + `KubeJS Mekanism`
     * Creates a mekanism injecting recipe.
     * @param output The result item.
     * @param input The input item.
     * @param input_gas The input gas and amount of it.
     * @example // create a injecting recipe that makes obsidian from a lava bucket and 200mb of oxygen.
     * event.recipes.mekanism.injecting('minecraft:obsidian', 'minecraft:lava_bucket', {gas: 'mekanism:oxygen', amount: 200})
     */
    injecting(
        output: IItemAdvanced | string,
        input: IItemAdvanced | string,
        input_gas: IMekanismGas
    ): IDefaultRecipe;
    /**
     * #### `KubeJS` + `KubeJS Mekanism`
     * Creates a mekanism metallurgic infusion recipe.
     * @param output The result item.
     * @param input The input item.
     * @param infusion_type The infusion type.
     * @param infusion_amount The amount of infusion (`mb`).
     * @example // create a metallurgic infusion recipe that takes a nether quartz and 20mb redstone infusion to make a redstone comperator.
     * event.recipes.mekanismMetallurgicInfusing('minecraft:comparator', 'minecraft:nether_quartz', 'mekanism:redstone', 20)
     */
    metallurgicInfusion(output:IItemAdvanced | string, input:IItemAdvanced | string, infusion_type:string, infusion_amount:number): IDefaultRecipe;
    /**
     * #### `KubeJS` + `KubeJS Mekanism`
     * Creates a mekanism sawing recipe with a secondary output that can have a specified chance of happening.
     * @param output The primary result item.
     * @param input The input item.
     * @param extra The secondary result item. Can use `Item.of('ID').chance(0.3)`
     * @example // create a sawing recipe that takes a brick and makes redstone dust. It also has a 30% chance of having clay as a secondary output.
     * event.recipes.mekanismSawing('minecraft:redstone', 'minecraft:brick', item.of('minecraft:clay').chance(0.3))
     */
    sawing(output:IItemAdvanced | string, input:IItemAdvanced | string, extra:IItemAdvanced): IDefaultRecipe;
}

interface IEventRecipe {
    /**
     * #### `KubeJS`
     * Create a shaped recipe.
     * @param result_item The resulting item.
     * @param pattern The recipe pattern.
     * @param keys The recipe pattern keys.
     *
     * @example // create a shaped recipe that uses apples and sponges to create 3 stones.
     * event.shaped('3x minecraft:stone', [
     *     'SAS',
     *     'S S',
     *     'SAS'
     * ], {
     *     S: 'minecraft:sponge',
     *     A: 'minecraft:apple'
     * })
     */
    shaped(result_item: string, pattern: string[], keys: object): IRecipeShaped;
    /**
     * #### `KubeJS`
     * Remove a recipe by one or multiple criteria or filter.
     * @param remove_by The criteria / filter that is used to select the recipe taht will be removed.
     * @example
     * event.remove({output: 'minecraft:diamond_block'})
     */
    remove(remove_by: IEventRecipeFilter): IRecipeShaped;
    /**
     * #### `KubeJS`
     * Create a shapeless recipe.
     * @param result_item The resulting item.
     * @param ingredients The items required for the crafting. The order of the ingredients does not matter.
     * @example // create a shapeless recipe that uses stone and any items that have the tag '#forge:dusts/glowstone'.
     * event.shapeless('4x minecraft:cobblestone', ['minecraft:stone', '#forge:dusts/glowstone'])
     */
    shapeless(result_item: string, ingredients: string[]): IRecipeShapeless;
    /**
     * #### `KubeJS`
     * Create a stonecutting recipe.
     * @param result_item The resulting item.
     * @param ingredient The ingredient item.
     * @example // create a stonecutting recipe that takes a golden apple and makes 4 normal apples.
     * event.stonecutting('4x minecraft:apple', 'minecraft:golden_apple')
     */
    stonecutting(result_item: string, ingredient: string): IRecipeShaped;
    /**
     * #### `KubeJS`
     * Create a smelting recipe.
     * @param result_item The resulting item.
     * @param ingredient The ingredient item.
     * @example // create a smelting recipe that takes a golden apple and makes 2 carrots.
     * event.smelting('2x minecraft:carrot', 'minecraft:golden_apple')
     */
    smelting(result_item: string, ingredient: string): IRecipeShaped;
    /**
     * #### `KubeJS`
     * Create a blasting recipe.
     * @param result_item The resulting item.
     * @param ingredient The ingredient item.
     * @example // create a blasting recipe that takes a golden apple and makes 2 carrots.
     * event.blasting('2x minecraft:carrot', 'minecraft:golden_apple')
     */
    blasting(result_item: string, ingredient: string): IRecipeShaped;
    /**
     * #### `KubeJS`
     * Create a smoking recipe.
     * @param result_item The resulting item.
     * @param ingredient The ingredient item.
     * @example // create a smoking recipe that takes a golden apple and makes 2 carrots.
     * event.smoking('2x minecraft:carrot', 'minecraft:golden_apple')
     */
    smoking(result_item: string, ingredient: string): IRecipeShaped;
    /**
     * #### `KubeJS`
     * Create a campfire cooking recipe.
     * @param result_item The resulting item.
     * @param ingredient The ingredient item.
     * @example // create a campfire cooking recipe that takes a golden apple and makes 2 carrots.
     * event.campfirecooking('2x minecraft:carrot', 'minecraft:golden_apple')
     */
    campfirecooking(result_item: string, ingredient: string): IRecipeShaped;
    /**
     * #### `KubeJS`
     * Create a smithing recipe
     * @param result_item The resulting item.
     * @param base_item The base item.
     * @param addition_item The item that gets added onto the base item.
     * @example // create a smithing recipe that takes an apple and a gold ingot to make a golden apple.
     * event.smithing('minecraft:golden_apple', 'minecraft:apple', 'minecraft:gold_ingot')
     */
    smithing(
        result_item: string,
        base_item: string,
        addition_item: string
    ): IRecipeShaped;
    /**
     * #### `KubeJS`
     * Create a custom recipe
     * If you use `event.custom({json})` it will be using vanilla Json/datapack syntax. Must include `'type': 'mod:recipe_id'!`. You can add recipe to any recipe handler that uses vanilla recipe system or isn't supported by KubeJS. You can copy-paste the json directly, but you can also make more javascript-y by removing quotation marks from keys. You can replace `{item: 'x', count: 4}` in result fields with `Item.of('x', 4).toResultJson()`. You can replace `{item: 'x'} / {tag: 'x'}` with `Ingredient.of('x').toJson()` or `Ingredient.of('#x').toJson()`.
     * @param json_args The other JSON recipe parameter.
     */
    custom(json_args: IRecipeCustom): IRecipeShaped;
    /**
     * #### `KubeJS`
     * Replace the specified input item of all recipes with another item. Recipes can be limited using a filter.
     * @param filter Filter which recipes will be replaced. Can be multiple filters or empty.
     * @param original_item The item of the original recipe that will be replaced.
     * @param replaced_item The item that replaces the item from the original reipe.
     */
    replaceInput(
        filter: IEventRecipeFilter,
        original_item: IItemAdvanced | string,
        replaced_item: string
    ): void;
    /**
     * #### `KubeJS`
     * Replace the specified output item of all recipes with another item. Recipes can be limited using a filter.
     * @param filter Filter which recipes will be replaced. Can be multiple filters or empty.
     * @param original_item The item of the original recipe that will be replaced.
     * @param replaced_item The item that replaces the item from the original reipe.
     */
    replaceOutput(
        filter: IEventRecipeFilter,
        original_item: IItemAdvanced | string,
        replaced_item: string
    ): void;

    /**
     * Recipes from other mods supported by KubeJS. Currently supported:
     * * `Thermal Series`
     * * `Create`
     * * `Immersive Engeneering`
     * * `Bloodmagic`
     * * `Mekanism`
     * ------
     * All these mods have KubeJS compatibility addons.
     */
    recipes: IModRecipes;
}

interface IEventItemTag {
    // event stuff here
    testprop2
}

interface IEventFTBQuestsCompleted {
    testProp
}

interface IEventItemCrafted {
    
}


interface IEventTypes {
    'recipes': IEventRecipe;
    'item.tags': IEventItemTag;
    [ftbquests :string]: IEventFTBQuestsCompleted;
    'item.crafted': IEventItemCrafted
}


/**
 * Listens for a specified event.
 * @param id The event id.
 * @param variable The event object.
 */
declare function onEvent<T extends keyof IEventTypes, E extends EventTypes[T]>(
    type: T,
    handle: (e: E) => void
): void;




//   interface SomeOtherOddEvent {
//     // event stuff here
//   }
   
type EventTypes={
    [id in questID]: IEventFTBQuestsCompleted;
    }&{
    // [id in someOtherOddID]: SomeOtherOddEvent;
    // }&{
    recipes: IEventRecipe;
    'item.tags': IEventItemTag;
    'item.crafted': IEventItemCrafted;
};
   
type questIDCompleted = `ftbquests.completed`;
type questID = questIDCompleted | `${questIDCompleted}.${string}`;
   
type someOtherOddID = `${string}.${number}`;