import Button from 'react-bootstrap/Button';

import logo from './logo.svg';
import './App.css';

import { AgendaContainer } from './components/agenda/AgendaContainer';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <Button>Primary</Button>
                <AgendaContainer />
            </header>
        </div>
    );
}

export default App;
