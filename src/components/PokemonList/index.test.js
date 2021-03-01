import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import TestRenderer from 'react-test-renderer';
import "regenerator-runtime/runtime";
import { PokemonList, CountOwned } from 'components/PokemonList';
import { GET_ALL_POKEMONS } from 'graphqlquery/Queries';
import { render, cleanup, findByTestId, findByText, waitFor, screen, fireEvent } from '@testing-library/react';
import { Link } from 'react-router-dom';
import { StaticRouter } from 'react-router';
const {act} = TestRenderer;

const mocksMyPokemon = [
  {
    name: "bulbasaur",
  },
  {
    name: "bulbasaur",
  },
  {
    name: "ivysaur",
  },
]

it('data matching test', async () => {
  const mocks = [
    {
      request: {
        query: GET_ALL_POKEMONS,
      },
      result: {
        data: {
          listpokemonQuery: [
            {
              name: "bulbasaur",
            },
            {
              name: "ivysaur",
            },
            {
              name: "venusaur",
            },
            {
              name: "charmander",
            },
            {
              name: "charmeleon",
            },
            {
              name: "charizard",
            },
            {
              name: "squirtle",
            },
            {
              name: "wartortle",
            },
            {
              name: "blastoise",
            },
            {
              name: "caterpie",
            },
            {
              name: "metapod",
            },
            {
              name: "butterfree",
            },
            {
              name: "weedle",
            },
            {
              name: "kakuna",
            },
            {
              name: "beedrill",
            },
            {
              name: "pidgey",
            },
            {
              name: "pidgeotto",
            },
            {
              name: "pidgeot",
            },
            {
              name: "rattata",
            },
            {
              name: "raticate",
            }
          ]
        }
      }
    }
  ]
  const component = TestRenderer.create(
    <StaticRouter>
      <MockedProvider mocks={mocks} addTypename={false}>
        <PokemonList />
      </MockedProvider>
    </StaticRouter>
  );
  const componentRoot = component.root;
  
  await act(()=> new Promise(resolve => setTimeout(resolve, 0)))
  
  expect(component.toJSON()).toMatchSnapshot()
  // const p = component.root.findByType('p');
  // const testInstance = component.root;
  // expect(testInstance.findByProps({className: "poggie"}).children).toEqual(['name:','bulbasaur']);
  // expect(p.children.join('')).toContain('hahaha');
});

it('count owned function test', () => {
  const countOwnedFunc = CountOwned("bulbasaur", mocksMyPokemon);
  expect(countOwnedFunc).toBe(2);
});