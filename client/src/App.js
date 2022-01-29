import "./App.scss";
import LandingText from './components/LandingText'

import NavBar from "./components/NavBar";


function App() {

  return (
    <div className="App">
      <div className="header">
        <NavBar />
        <div className="text-box">
          <LandingText />
        </div>
      </div>
    </div>
  );
}

export default App;