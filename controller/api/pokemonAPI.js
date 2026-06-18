const pokemonAPI = {
  getRandomPokemon: async () => {
    const randomId = Math.floor(Math.random() * 1025) + 1;

    const [pokemonResponse, speciesResponse] = await Promise.all([
      fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`),
      fetch(`https://pokeapi.co/api/v2/pokemon-species/${randomId}`),
    ]);

    if (!pokemonResponse.ok || !speciesResponse.ok) {
      throw new Error("Failed to fetch Pokémon data");
    }

    const pokemon = await pokemonResponse.json();
    const species = await speciesResponse.json();

    const description = species.flavor_text_entries
      .find((entry) => entry.language.name === "en")
      ?.flavor_text.replace(/\n|\f/g, " ");

    return {
      name: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
      level: Math.floor(Math.random() * 100) + 1,
      type: pokemon.types.map((t) => t.type.name),
      description,
      image: pokemon.sprites.other["official-artwork"].front_default,
    };
  },

  getPokemonTypes: async () => {
    const response = await fetch("https://pokeapi.co/api/v2/type");

    if (!response.ok) {
      throw new Error("Failed to fetch Pokémon types");
    }

    const data = await response.json();

    return data.results.map((type) => type.name);
  },
};

export default pokemonAPI;
