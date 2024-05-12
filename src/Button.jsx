import React from 'react';
import { ACTIONS } from './App';


function Button({ digit, dispatch }) {
    return (
        <button onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } })}> {digit} </button>
    );
}

export function Operation({ operation, dispatch }) {
    return <button onClick={() => dispatch({ type: ACTIONS.CHOOSE_OPERTION, payload: { operation } })}> {operation} </button>
}

export default Button;