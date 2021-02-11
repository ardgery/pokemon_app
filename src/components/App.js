import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import Header from 'components/Header';
import Footer from 'components/Footer';
import PokemonList from 'components/PokemonList';
import PokemonDetail from 'components/PokemonDetail';
import MyPokemon from 'components/MyPokemon';
import PokemonContextProvider from 'contexts/PokemonContext';

const client = new ApolloClient({
    uri: 'http://localhost:5000/graphql',
    cache: new InMemoryCache()
});

function App(){
    return(
        <ApolloProvider client={client}>
            <Router>
                <PokemonContextProvider>
                    <div className="App">
                        <Header />
                            <Route exact path="/" component={PokemonList} />
                            <Route exact path="/mypokemon" component={MyPokemon} />
                            <Route exact path="/pokemon/:id" component={PokemonDetail} />
                        <Footer />
                    </div>
                </PokemonContextProvider>
            </Router>
        </ApolloProvider>
    )
}
export default App;
