import logo from './logo.svg';
import './App.css';
//import {useEffect, useState } from react;
import axios from 'axios'

const url= "http://127.0.0.1:8000/residence/get";
const config = {
  headers: {
    accept:"*/*",
    id: 2,
    withCredentials: false,
  },
}

let response;
let error;

axios.get(url, config).then((res)=>{response=res;console.log(res)}).catch((err)=>{error=err;console.error(err)})

//useEffect({},[]);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        
        
      </header>
    </div>
  );
}

export default App;
