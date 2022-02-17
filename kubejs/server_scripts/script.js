// priority: 0

settings.logAddedRecipes = true
settings.logRemovedRecipes = true
settings.logSkippedRecipes = false
settings.logErroringRecipes = true

console.info('Hello, World! (You will see this line every time server resources reload)')

onEvent('recipes', event => {
	event.shapeless("2x minecraft:dirt", [
		Item.of("minecraft:potion", {Potion: "minecraft:water"})
	]).replaceIngredient({item: Item.of("minecraft:potion", {Potion: "minecraft:water"})}, "minecraft:glass_bottle")

	
	
	// Change recipes here
})

onEvent('item.tags', event => {
	// Get the #forge:cobblestone tag collection and add Diamond Ore to it
	// event.get('forge:cobblestone').add('minecraft:diamond_ore')
	
	// Get the #forge:cobblestone tag collection and remove Mossy Cobblestone from it
	// event.get('forge:cobblestone').remove('minecraft:mossy_cobblestone')
})
onEvent("ftbquests.completed.((#.+)|(h){8})")