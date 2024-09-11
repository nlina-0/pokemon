import { getMultiplePokemon, getOnePokemon } from "./encounterSystem.js"

let encounterOneButton = document.getElementById("encounter-one")
let encounterSixButton = document.getElementById("encounter-six")

encounterOneButton.addEventListener('click', async () => {
    let result = await getOnePokemon()
    console.log(result)
    result = [result]
    localStorage.setItem("wildPokemon", JSON.stringify(result))
    
    renderData()
})

encounterSixButton.addEventListener('click', async () => {
    let result = await getMultiplePokemon()
    console.log(result)
    localStorage.setItem("wildPokemon", JSON.stringify(result))

    renderData()
})

function renderData() {
    // Retrieve data from local storage
    let pokemonData = localStorage.getItem("wildPokemon")

    pokemonData = JSON.parse(pokemonData)

    // Reference to reuse
    let wildPokemonContainer = document.getElementById("pokemon-encounters")
    wildPokemonContainer.innerText = ""

    pokemonData.forEach(pokemon => {
        // Build HTML elements to display the data
        let newElement = buildPokemonDisplayElement(pokemon)

        // Insert new HTML elements into the current page
        wildPokemonContainer.appendChild(newElement)
    })
}

function buildPokemonDisplayElement(pokemonData) {
    if (!pokemonData) {
        return
    }

    let pokemonContainer = document.createElement("div")

    let pokemonHeading = document.createElement("h1")
    pokemonHeading.innerText = pokemonData.name
    pokemonContainer.appendChild(pokemonHeading)

    let pokemonImage = document.createElement("img")
    pokemonImage.src = pokemonData.sprites?.front_default
    pokemonContainer.appendChild(pokemonImage)

    // Returns html
    return pokemonContainer
}