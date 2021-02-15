import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider,createHttpLink } from '@apollo/client';
import Header from 'components/Header';
import Footer from 'components/Footer';
import PokemonList from 'components/PokemonList';
import PokemonDetail from 'components/PokemonDetail';
import MyPokemon from 'components/MyPokemon';
import PokemonContextProvider from 'contexts/PokemonContext';

const client = new ApolloClient({
    ssrMode: true,
    link: createHttpLink({
      uri: 'https://goofy-noyce-6f3fb6.netlify.app/.netlify/functions/api',
      credentials: 'same-origin'
    }),
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
