import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const PageWrapper = styled('div')`
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
`;

const GoBackButton = styled('div')`
    text-decoration: underline;
    font-size: 24px;
    cursor: pointer;
`;

const InfoContainer = styled('div')`
    display: flex;
    width: 75%;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    border: 1px solid #000;
    box-shadow: 0px 25px 20px -20px rgba(0, 0, 0, 0.45), 25px 0 20px -20px rgba(0, 0, 0, 0.45);
    margin-bottom: 100px;
`;

const PokemonName = styled('span')`
    font-weight: 700;
    font-size: 20px;
`;

const AttributesContainer = styled('div')`
    display: flex;
    flex-direction: column;
    width: 80%;
    margin: 30px 0;
`;

const AttributeContainer = styled('div')`
    display: flex;
    border-right: 1px solid black;
    border-left: 1px solid black;
    border-bottom: 1px solid black;
    &.bordered-top {
        border-top: 1px solid black;
    }
`;

const AttributeField = styled('div')`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-basis: 70%;
    border-right: 1px solid black;
`

const AttributePoint = styled('div')`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-basis: 30%;
`;

const PokemonType = styled('div')`
    margin: 0 10px;
    font-size: 16px;
`;

const PokemonInfo = () => {
    const location = useLocation();

    const navigate = useNavigate();

    return (
        <PageWrapper>
            <InfoContainer>
                <img src={location?.state?.data?.sprites?.front_default} />
                <PokemonName>{location?.state?.data?.name}</PokemonName>
                <AttributesContainer>
                    <AttributeContainer className='bordered-top'>
                        <AttributeField>Type</AttributeField>
                        <AttributePoint>
                            {location?.state?.data?.types?.map((type: any) => (
                                <div key={type.slot}>
                                    <PokemonType>{type.type.name}</PokemonType>
                                </div>
                            ))}
                        </AttributePoint>
                    </AttributeContainer>
                    <AttributeContainer>
                        <AttributeField>Attack</AttributeField>
                        <AttributePoint>{location?.state?.data?.stats[1]?.base_stat}</AttributePoint>
                    </AttributeContainer>
                    <AttributeContainer>
                        <AttributeField>Defense</AttributeField>
                        <AttributePoint>{location?.state?.data?.stats[2]?.base_stat}</AttributePoint>
                    </AttributeContainer>
                    <AttributeContainer>
                        <AttributeField>HP</AttributeField>
                        <AttributePoint>{location?.state?.data?.stats[0]?.base_stat}</AttributePoint>
                    </AttributeContainer>
                    <AttributeContainer>
                        <AttributeField>SP Attack</AttributeField>
                        <AttributePoint>{location?.state?.data?.stats[3]?.base_stat}</AttributePoint>
                    </AttributeContainer>
                    <AttributeContainer>
                        <AttributeField>SP Defense</AttributeField>
                        <AttributePoint>{location?.state?.data?.stats[4]?.base_stat}</AttributePoint>
                    </AttributeContainer>
                    <AttributeContainer>
                        <AttributeField>Speed</AttributeField>
                        <AttributePoint>{location?.state?.data?.stats[5]?.base_stat}</AttributePoint>
                    </AttributeContainer>
                    <AttributeContainer>
                        <AttributeField>Weight</AttributeField>
                        <AttributePoint>{location?.state?.data?.weight}</AttributePoint>
                    </AttributeContainer>
                    <AttributeContainer>
                        <AttributeField>Total Moves</AttributeField>
                        <AttributePoint>{location?.state?.data?.moves.length}</AttributePoint>
                    </AttributeContainer>
                </AttributesContainer>
            </InfoContainer>
            <GoBackButton onClick={() => navigate(-1)}>Back to the pokemons list</GoBackButton>
        </PageWrapper>
    )
};

export default PokemonInfo;
