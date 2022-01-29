import "./App.scss";
import CollegeList from "./components/CollegeList";
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
      <CollegeList />
    </div>
  );
}

export default App;