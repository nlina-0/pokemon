// Random number generator function
function randomPokemonId() {
    return Math.floor(Math.random() * 1025) + 1
}

// Fetch one pokemon function
async function getOnePokemon() {
    let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokemonId()}`)
    let data = await res.json()
    return data
} 

// Fetch multiple pokemon function
async function getMultiplePokemon() {
    let multiplePokemon = await Promise.all([
        getOnePokemon(),
        getOnePokemon(),
        getOnePokemon(),
        getOnePokemon(),
        getOnePokemon(),
        getOnePokemon()
    ])
    
    return multiplePokemon
}

// Export for browser
export { randomPokemonId, getOnePokemon, getMultiplePokemon }

// Export for NodeJS only
// module.exports = {
//     randomPokemonId, getOnePokemon, getMultiplePokemon
// }