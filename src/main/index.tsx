import React from 'react';
import {
    QueryClient,
    QueryClientProvider
} from 'react-query';
import styled, {createGlobalStyle} from 'styled-components';
import { Routes, Route } from 'react-router-dom';
import PokemonList from './pokemon-list';
import PokemonInfo from './pokemon-info';

const queryClient = new QueryClient();

const AppContainer = styled('div')`
    display: flex;
    align-items: center;
    justify-content: center;
    @media (min-width: 460px) {
        margin: 0 100px;
    }
`

const GlobalStyles = createGlobalStyle`
    body {
        margin: 0;
    }
`

const AppTitle = styled('h1')`
    font-size: 24px;
    text-align: center;
    margin-bottom: 60px;
`;

const App = () => (
    <QueryClientProvider client={queryClient}>
        <GlobalStyles />
        <AppTitle>Pokedex</AppTitle>
        <AppContainer>
            <Routes>
                <Route path='/' element={<PokemonList />} />
                <Route path='info' element={<PokemonInfo />} />
            </Routes>
        </AppContainer>
    </QueryClientProvider>
);

export default App;
