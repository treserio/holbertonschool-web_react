import Holb_Logo from './Holb_Logo.jpg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={Holb_Logo} className="App-logo" alt="logo" />
        <h1>School dashboard</h1>
      </header>
      <div className='App-body'>
        <p>Login to access the full dashboard</p>
      </div>
      <div className='App-footer'>
        <p>Copyright 2020 - holberton School</p>
      </div>
    </div>
  );
}

export default App;
