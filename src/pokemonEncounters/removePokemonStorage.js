
function removePokemonFromStorage(caughtPokemon) {
    let currentData = localStorage.getItem("savedPokemon")

    currentData = JSON.parse(currentData)
    
    currentData = currentData.filter(pokemon => pokemon.name !== caughtPokemon.name)
    localStorage.setItem("savedPokemon", JSON.stringify(currentData))
}

export { removePokemonFromStorage }