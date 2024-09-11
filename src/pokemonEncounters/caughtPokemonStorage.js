

function addPokemonToCaughtStorage(newPokemon) {
    let currentData = localStorage.getItem("savedPokemon")

    currentData = JSON.parse(currentData)

    if (!Array.isArray(currentData)){
        currentData = [currentData]
        currentData = currentData.filter(item => item)
    }

    currentData.push(newPokemon)

    localStorage.setItem("savedPokemon", JSON.stringify(currentData))
}

export { addPokemonToCaughtStorage }