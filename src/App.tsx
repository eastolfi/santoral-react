import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

import { AgendaPage } from './pages/agenda/AgendaPage';
import { EventAdminPage } from './pages/admininstration/events/EventAdminPage';

import './App.css';
import { Navigation } from './components/navigation/Nagivation';

function App() {
    return (
        <Box height="75%" data-testid="app-container">
            <Container maxWidth="lg" className="app-container">
                <Router>
                    <Navigation>
                        <Switch>
                            <Route exact path="/">
                                <AgendaPage />
                            </Route>
                            <Route exact path="/admin/events">
                                <EventAdminPage />
                            </Route>
                        </Switch>
                    </Navigation>
                </Router>
                
            </Container>
        </Box>
    );
}

export default App;
