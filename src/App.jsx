import { useReducer } from "react";
import Button, { Operation } from "./Button";


export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete_digit',
  CHOOSE_OPERTION: "choose-operation",
  EVALUATE: "evaluate"
}

const initialState = {
  currentOperand: "",
  previousOperand: "",
  operation: ""
}

function calculation(state, operation) {

  const operator = `${operation || ""}`

  if (state.previousOperand.includes("*")) {

    let calculation = Number(state.previousOperand.substr(0, state.previousOperand.length - 1)) * Number(state.currentOperand);

    return {
      previousOperand: `${calculation} ${operator}`,
      currentOperand: ""
    }
  } else if (state.previousOperand.includes("+")) {

    let calculation = Number(state.previousOperand.substr(0, state.previousOperand.length - 1)) + Number(state.currentOperand);

    return {
      previousOperand: `${calculation} ${operator}`,
      currentOperand: ""
    }
  } else if (state.previousOperand.includes("-")) {

    let calculation = Number(state.previousOperand.substr(0, state.previousOperand.length - 1)) - Number(state.currentOperand);

    return {
      previousOperand: `${calculation} ${operator}`,
      currentOperand: ""
    }
  } else if (state.previousOperand.includes("/")) {

    let calculation = Number(state.previousOperand.substr(0, state.previousOperand.length - 1)) / Number(state.currentOperand);

    return {
      previousOperand: `${calculation} ${operator}`,
      currentOperand: ""
    }
  }
}

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.currentOperand == 0 && payload.digit == 0) return { ...state, currentOperand: 0 }
      if (state.currentOperand.includes(".") && payload.digit == ".") return { ...state }
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`
      }
    case ACTIONS.CHOOSE_OPERTION:
      if (state.previousOperand == "" && state.currentOperand == "") return { ...state, operation: "" }
      if (state.previousOperand.length > 0) return calculation(state, payload.operation)
      return {
        previousOperand: `${state.currentOperand} ${payload.operation}`,
        currentOperand: "",
      }
    case ACTIONS.CLEAR:
      return {
        currentOperand: "",
        previousOperand: "",
        operation: ""
      }
    case ACTIONS.DELETE_DIGIT:
      if(state.currentOperand == "") return {currentOperand : state.previousOperand,previousOperand : ""}
      return {
        ...state,
        currentOperand: state.currentOperand.substring(0, state.currentOperand.length - 1)
      }
    case ACTIONS.EVALUATE:
      if (state.previousOperand == "" || state.currentOperand == "") return { ...state }
      else {
        const result = calculation(state)
        return {
          currentOperand: result.previousOperand,
          previousOperand: ""
        }
      }
  }
}



function App() {


  var [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(reducer, initialState)

  console.log(currentOperand, previousOperand);


  return (
    <div className="calculator">

      <div className="result">
        <div className="previous-operator">{previousOperand.replace(/\s/g, "")} {operation} </div>
        <div className="current-operator"> {currentOperand.replace(/\s/g, "")} </div>
      </div>
      <button className="span-2" onClick={() => dispatch({ type: ACTIONS.CLEAR })}>AC</button>
      <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>DEL</button>
      <Operation operation="/" dispatch={dispatch} />
      <Button digit="1" dispatch={dispatch} />
      <Button digit="2" dispatch={dispatch} />
      <Button digit="3" dispatch={dispatch} />
      <Operation operation="*" dispatch={dispatch} />
      <Button digit="4" dispatch={dispatch} />
      <Button digit="5" dispatch={dispatch} />
      <Button digit="6" dispatch={dispatch} />
      <Operation operation="+" dispatch={dispatch} />
      <Button digit="7" dispatch={dispatch} />
      <Button digit="8" dispatch={dispatch} />
      <Button digit="9" dispatch={dispatch} />
      <Operation operation="-" dispatch={dispatch} />
      <Button digit="." dispatch={dispatch} />
      <Button digit="0" dispatch={dispatch} />
      <button className="span-2" onClick={() => dispatch({ type: ACTIONS.EVALUATE })}> = </button>
    </div>


  )
}


export default App;
