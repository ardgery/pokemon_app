import React, { useEffect,useContext } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import { ApolloClient, InMemoryCache, ApolloProvider,createHttpLink } from '@apollo/client';
import Header from 'components/Header';
import Footer from 'components/Footer';
import { PokemonList, CountOwned } from 'components/PokemonList';
import { PokemonDetail } from 'components/PokemonDetail';
import MyPokemon from 'components/MyPokemon';
import PokemonContextProvider from 'contexts/PokemonContext';
import MyPokemonContextProvider from 'contexts/MyPokemonContext';



function App(){
    useEffect(()=>{
        // console.log(CountOwned("lulba",[{id:1,name:"soka",nickname:"lula"},{id:2,name:"cyka",name:"sata"}]))
    })
    return(
        <Router>
            <PokemonContextProvider>
                <MyPokemonContextProvider>
                    <div className="App">
                        <Header />
                        <Route exact path="/" component={PokemonList} />
                        <Route exact path="/mypokemon" component={MyPokemon} />
                        <Route exact path="/pokemon/:id" component={PokemonDetail} />
                        <Footer />
                    </div>
                </MyPokemonContextProvider>
            </PokemonContextProvider>
        </Router>
    )
}
export default App;
