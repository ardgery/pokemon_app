import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import TestRenderer from 'react-test-renderer';
import "regenerator-runtime/runtime";
import { PokemonDetail,GetPoke,RenderModalContent } from 'components/PokemonDetail';
import { GET_ALL_POKEMONS } from 'graphqlquery/Queries';
import { Link } from 'react-router-dom';
import { StaticRouter } from 'react-router';

it('success rate to get pokemon', () => {
    const component = TestRenderer.create(
        <GetPoke drill="cuiwww"/>
    ) 
    const testInstance = component.root;
    expect(testInstance.findByProps({className: "aca"}).children).toEqual(['cuiwww']);
    // console.log("instancee =",component.root.children)
    // expect(component.toJSON()).toMatchSnapshot()
    // expect(instance.state.txt).toBe("");
    // instance.handleClick();
    // expect(instance.state.text).toBe("PROCEED TO CHECKOUT");
    
    // const getPokeFunc = getPoke(true,true);
    // expect(getPokeFunc).toBe(true);
});