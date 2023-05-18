import React, { useState, useEffect } from 'react';
import { getPokemons, getPokemonsTypes } from './../api';
import {
  useQuery,
  useQueryClient,
} from 'react-query';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Select from '../components/select';

interface PokemonItemInterface {
    data: any;
    pockemonClick: (arg: any) => void;
}

const PokemonPreview = styled('div')`
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    border: 1px solid black;
`;

const PokemonName = styled('span')`
    font-weight: 700;
    font-size: 20px;
`;

const PokemonTypeContainer = styled('div')`
    display: flex;
`;

const PokemonType = styled('div')`
    margin: 10px;
    font-size: 16px;
`;

const PokemonItem = ({data, pockemonClick}: PokemonItemInterface) => (
    <PokemonPreview onClick={() => pockemonClick(data)}>
        <img src={data.sprites.front_default} />
        <PokemonName>{data.name}</PokemonName>
        <PokemonTypeContainer>
            {data.types.map((type: any) => (
                <div key={type.slot}>
                    <PokemonType>{type.type.name}</PokemonType>
                </div>
            ))}
        </PokemonTypeContainer>
    </PokemonPreview>
);

const PageWrapper = styled('div')`
    display: flex;
    max-width: 100%;
    flex-direction: column;
    align-items: center;
`;

const PokemonsContainer = styled('div')`
    display: flex;
    justify-content: space-between;
    max-width: 100%;
    flex-wrap: wrap;
    margin-top: 40px;
`;

const BasisContainer = styled('div')`
    flex-basis: 30%;
    margin-bottom: 40px;
`;

const ButtonContainer = styled('div')`
    display: flex;
    width: 100vw;
    justify-content: center;
    align-items: center;
    margin: 50px 0;
`;

const LoadButton = styled('button')`
    font-size: 20px;
    background-color: #008CFF;
    border-radius: 10px;
    color: #fff;
    padding: 20px 0;
    width: 150px;
    border: none;
    cursor: pointer;
`;

const PokemonList = () => {
    const [page, setPage] = useState(1);
    const [selectedTypes, setSelectedTypes] = useState([]);

    const queryClient = useQueryClient();

    const { data, refetch } = useQuery('pokemons', () => getPokemons(page * 12), { enabled: false });

    const { data: types } = useQuery('types', () => getPokemonsTypes());

    useEffect(() => {
        refetch()
    }, [page]);

    const navigate = useNavigate();

    const handleLoadButtonClick = () => {
        setPage(page + 1);
    };

    const handlePockemonClick = (data: any) => {
        navigate('/info', {state: { data }});
    }

    const handleSelectPokemonTypes = (value: any) => {
        setSelectedTypes(value);
    }

    return (
        <PageWrapper>
            <Select
                options={types?.results?.map((type: any) => (
                    {value: type.name, label: type.name.charAt(0).toUpperCase() + type.name.slice(1)}
                ))}
                value={selectedTypes}
                onChange={handleSelectPokemonTypes}
            />
            <PokemonsContainer>
                {data?.map((pokemon: any) => (
                    selectedTypes.length ?
                        pokemon.value.types.some(({type}: any) => selectedTypes.map((e: any) => e.value).includes(type.name)) &&
                        <BasisContainer key={(pokemon.value.id)}>
                            <PokemonItem data={pokemon.value} pockemonClick={handlePockemonClick} />
                        </BasisContainer>
                    :
                        <BasisContainer key={(pokemon.value.id)}>
                            <PokemonItem data={pokemon.value} pockemonClick={handlePockemonClick} />
                        </BasisContainer>
                ))}
                <ButtonContainer>
                    <LoadButton onClick={handleLoadButtonClick}>Load More</LoadButton>
                </ButtonContainer>
            </PokemonsContainer>
        </PageWrapper>
    )
};

export default PokemonList;
