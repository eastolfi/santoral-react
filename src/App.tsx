import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';
import Container from 'react-bootstrap/Container';

import { AgendaPage } from './pages/agenda/AgendaPage';

import './App.css';
import { Navigation } from './components/navigation/Nagivation';

function App() {
    return (
        <div data-testid="app-container">
            <Router>
                {/* Navigation */}
                <Navigation />

                {/* Router switch */}
                <Container className="app-container">
                    <Switch>
                        <Route exact path="/">
                            <AgendaPage />
                        </Route>
                    </Switch>
                </Container>
            </Router>
        </div>
    );
}

export default App;
