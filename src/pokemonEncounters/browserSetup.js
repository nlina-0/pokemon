import { addPokemonToCaughtStorage } from "./caughtPokemonStorage.js"
import { getMultiplePokemon, getOnePokemon } from "./encounterSystem.js"

let encounterOneButton = document.getElementById("encounter-one")
let encounterSixButton = document.getElementById("encounter-six")

encounterOneButton.addEventListener('click', async () => {
    let result = await getOnePokemon()
    console.log(result)
    result = [result]
    localStorage.setItem("wildPokemon", JSON.stringify(result))
    
    updateScreen()
})

encounterSixButton.addEventListener('click', async () => {
    let result = await getMultiplePokemon()
    console.log(result)
    localStorage.setItem("wildPokemon", JSON.stringify(result))

    updateScreen()
})

function renderWildEncounterData() {
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

// Haven't stored anything to caughtPokemon in localStorage yet
function renderCaughtPokemonData() {
    // Retrieve data from local storage
    let pokemonData = localStorage.getItem("savedPokemon")

    pokemonData = JSON.parse(pokemonData)
    
    if (!pokemonData) return
    pokemonData = pokemonData.filter(item => item)

    // Reference to reuse
    let caughtPokemonContainer = document.getElementById("pokemon-caught")
    caughtPokemonContainer.innerText = ""

    pokemonData.forEach(pokemon => {
        // Build HTML elements to display the data
        let newElement = buildPokemonDisplayElement(pokemon, true)

        // Insert new HTML elements into the current page
        caughtPokemonContainer.appendChild(newElement)
    })
}

function buildPokemonDisplayElement(pokemonData, isCaught=false) {
    if (!pokemonData) {
        return
    }

    let pokemonContainer = document.createElement("div")

    let pokemonHeading = document.createElement("h3")
    pokemonHeading.innerText = pokemonData.name
    pokemonContainer.appendChild(pokemonHeading)

    let pokemonImage = document.createElement("img")
    pokemonImage.src = pokemonData.sprites?.front_default
    pokemonContainer.appendChild(pokemonImage)

    if (!isCaught) {
        let captureButton = document.createElement("button")
        captureButton.addEventListener("click", () => {
            addPokemonToCaughtStorage(pokemonData)
            updateScreen()
        })
        captureButton.innerText = "Capture " + pokemonData.name
        pokemonContainer.appendChild(captureButton)
    }
    
    // Returns html
    return pokemonContainer
}

function updateScreen() {
    renderWildEncounterData()
    renderCaughtPokemonData()
}