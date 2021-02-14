import React,{useContext, useState} from 'react';
import 'styles/pages/pokemon_detail.scss';
import { GET_POKEMON_DETAIL } from 'graphqlquery/Queries';
import { useQuery } from '@apollo/client';
import { PokemonContext } from 'contexts/PokemonContext';
import Modal from 'react-modal';
import Loading from 'images/loading.gif';
import useWindowDimensions from 'components/util/useWindowDimensions';


export default function PokemonDetail() {
    const {width } = useWindowDimensions();
    function getPokemonIdFromUrl(){
        var url = new URL(window.location.href);
        let hrefSplit = url.href.split('/')
        let idPokemon = parseInt(hrefSplit[hrefSplit.length-1]);
        return idPokemon;
    }
    let id = getPokemonIdFromUrl();
    const { data } = useQuery(GET_POKEMON_DETAIL, {
        variables: { id }
    });
    const { dispatch,dispatchMyPokemon,mypokemon } = useContext(PokemonContext);
    const [nickname, setNickname] = useState('');
    const [modalVisible,setModalVisible] = useState(false);
    const customStyles = {
        content : {
          top       : '0',
          left      : '0',
          right     : '0',
          bottom    : '0',
          margin    : 'auto',
          width     : width < 482? 300 : 400,
          height    : 200,
          padding   :width < 482? 0 : 20,
        },
        overlay: {
            background : 'rgba(0,0,0,0.8)',
            zIndex:1
        }
    };
    const [initModal,setInitModal] = useState(true);
    const [loading,setLoading] = useState(false);
    const [result,setResult] = useState(false);
    const [isSuccess,setIsSuccess] = useState(false);
    const [resultMessage,setResultMessage] = useState('');
    const [inputMessage,setInputMessage] = useState('');
    const [finalResult,setFinalResult] = useState(false);

    function checkExistNickname(newNickname){
        var existNickname = false;
        for(let i =0;i<mypokemon.length;i++){
            if (mypokemon[i].nickname == newNickname) {
                existNickname = true;
                break;
            }
        }
        return existNickname;  
    }
    function getPokemon(){
        setInitModal(false);
        setLoading(true);
        setResult(false);
        setFinalResult(false);

        setTimeout(()=>{
            setLoading(false);
            setResult(true);
        },1250)
        
        let success = Math.random() < 0.5;

        if(success) {
            setIsSuccess(true)
            setResultMessage("Success Get this Pokemon! Please give a Nickname to your new Pokemon.")
        } else {
            setIsSuccess(false)
            setResultMessage("Failed to Catch this Pokemon! Note that probability to get a Pokemon is 50%.")
        }
    }
    function closeForm(){
        setResult(false);
        setInitModal(true);
        setResultMessage("");
        setModalVisible(false)
    }
    function validatePokemon(e){
        e.preventDefault();
        if(nickname==''){
            setInputMessage("Pokemon Nickname Cannot be Empty.") 
        }else if(checkExistNickname(nickname)){
            setInputMessage("Nickname is already exist on your owned pokemon") 
        }else{
            setLoading(true);
            setResult(false);
            setFinalResult(true);
            dispatch({
                type: "UPDATE_OWNED_POKEMON",
                payload: {id:id-1, nickname:nickname}
            });
            dispatchMyPokemon({
                type: "ADD_TO_MY_LIST",
                payload: {
                    id:id,
                    name:data.pokemonQuery.name,
                    nickname:nickname,
                }
            })
            setTimeout(()=>{
                setLoading(false);
                setResultMessage("Pokemon has been added to your List!")
                setFinalResult(true);
                setResult(true);
            },500)    
            
            setTimeout(()=>{
                setLoading(false);
                setResult(false);
                setFinalResult(false);
                closeForm();
            },1500)    
        }
    }

    return ( 
        <div className="detailWrapper">
            <div className="detailInside">

                {
                    data && (
                        <div>
                            <div className="imgWrapper">
                                <img src={"https://pokeres.bastionbot.org/images/pokemon/"+id+'.png'} width="300px" alt=""/>
                            </div>
                            <div className="detailColumns">
                                <h1>{data && data.pokemonQuery.name}</h1>
                                <div className="detailPokemon">
                                    <h2>Types</h2>
                                    <div>
                                        {
                                            data  && data.pokemonQuery.types.map((v,i)=>{
                                                return (
                                                    <p key={i}>{v.name}</p>
                                                )
                                            })
                                        }
                                    </div>
                                    <h2 className="headingMoves">Moves</h2>
                                    <div className="moves">
                                        {
                                            data  && data.pokemonQuery.moves.map((v,i)=>{
                                                if(i<3){
                                                    return (
                                                        <p key={i}>{v.name}</p>
                                                    )
                                                }
                                            })
                                        }
                                    </div>
                                </div>
                            </div> 
                        </div>
                    )
                }

                {!data && (<div className="loadingWrapper"><img src={Loading} alt=""/></div>)}


            </div>
            {data && (<button onClick={()=>setModalVisible(true)}>Catch this Pokemon!</button>)}
            <div>
                <Modal 
                    isOpen={modalVisible}
                    contentLabel="Minimal Modal Example"
                    ariaHideApp={false}
                    style={customStyles}
                >
                    <div className="modalInside">
                        { initModal && (
                                <div>
                                    <h2>Are you sure you want to catch this Pokemon?</h2>
                                    <div className="modalButtonWrapper">
                                        <button onClick={()=>getPokemon()}>Yes</button>
                                        <button className="closeForm" onClick={()=>closeForm()}>Cancel</button>
                                    </div>
                                </div>
                        )}
                        {result && (
                            <div>
                                <h2 className={isSuccess?'success':'danger'}>{resultMessage}</h2>
                                {isSuccess && !finalResult && (
                                    <form className="addNicknameForm">
                                        <p className="danger">{inputMessage}</p>
                                        <div className="inputWrapper">
                                            <input autoFocus placeholder="type nickname here..." type="text" onChange={(e)=>{setNickname(e.target.value)}} value={nickname}/>
                                            <button type="submit" onClick={(e)=>validatePokemon(e)}>Confirm</button>
                                        </div>
                                    </form>
                                )}
                                {!isSuccess && (
                                    <div className="modalButtonWrapper">
                                        <button onClick={()=>getPokemon()}>Try Again</button>
                                        <button className="closeForm" onClick={()=>closeForm()}>Close Form</button>
                                </div>
                                )}
                            </div>
                        )}
                        {loading && (<img src={Loading} alt="" width="120" />)}
                    </div>
                </Modal>
            </div>

        </div>
    )
}
