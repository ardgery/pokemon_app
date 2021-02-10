import React from 'react';
import { Link } from 'react-router-dom';

export default function Card({id,name,url,owned}) {
    return (
        <Link to={`/pokemon/${id}`} className="card">
            <p>{name}</p>
            <p>{url}</p>
            <p>{owned}</p>
        </Link>
    )
}
