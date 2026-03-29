import './App.css';
import React, { useEffect } from "react";
import { useDispatch} from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // useHistory,
} from "react-router-dom";
import Home from './Components/Home';



function App() {
  let dispatch = useDispatch();

  useEffect(() => {
    getWeather();
    getAverages();
    getCurrent();
    getTwoDays();
    }, []);
  const getWeather = () => {
    let reqPack = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    fetch("http://localhost:3000/weather", reqPack).then((res) => res.json());
  };
  const getAverages = () => {
    let reqpack = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
    };
    fetch("http://localhost:3000/averages", reqpack)
      .then((res) => res.json())
      .then((data) => dispatch({ type: "GETAVERAGES", mnthlyAvrgs: data }))
  }


  // this gives a list of all currents that were saved. We only want THE LAST ONE ON THE LIST
  const getCurrent = () => {
    let reqpack = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
    };
    fetch("http://localhost:3000/currents", reqpack)
      .then((res) => res.json())
    .then((data) => dispatch({type:"GETCURRENTS", current: data}))
  }

  const getTwoDays = () => {
    let reqpack = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
    };
    fetch("http://localhost:3000/twodays", reqpack)
      .then((res) => res.json())
      .then((data) => dispatch({ type: "GETDAYS", days: data}))
  }
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
      
    </div>
  );
}

export default App;
