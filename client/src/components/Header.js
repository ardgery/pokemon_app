import React,{useState} from 'react';
import 'styles/pages/header.scss';
import { Link } from 'react-router-dom';

export default function Header() {
    const [activeMenu,setActiveMenu]=useState(1);
    return (
        <div className="header">
            <div className="menu">
                <Link to="/" className={activeMenu==1?'active':''} onClick={()=>setActiveMenu(1)}>Pokemon List</Link>
                <Link to="/mypokemon" className={activeMenu==2?'active':''} onClick={()=>setActiveMenu(2)}>My Pokemon</Link>
            </div>
        </div>
    )
}
