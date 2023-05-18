export const getPokemons = (limit = 12) => fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}`).then(res => res.json())
    .then(res => {
        return Promise.allSettled(
            res.results.map(item => fetch(`https://pokeapi.co/api/v2/pokemon/${item.name}`).then(res => res.json()))
        );
    });

export const getPokemonsTypes = () => fetch('https://pokeapi.co/api/v2/type?limit=999').then(res => res.json());