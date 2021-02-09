import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import PokemonList from 'components/PokemonList';
import PokemonDetail from 'components/PokemonDetail';

const client = new ApolloClient({
    uri: 'http://localhost:5000/graphql',
    cache: new InMemoryCache()
});

function App(){
    return(
        <ApolloProvider client={client}>
            <Router>
                <div className="App">
                    <h1>Pokemons</h1>
                    <Route exact path="/" component={PokemonList} />
                    <Route exact path="/pokemon/:pokemon_id" component={PokemonDetail} />
                </div>
            </Router>
    </ApolloProvider>
    )
}
export default App;
