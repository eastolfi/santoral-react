import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

import { MuiPickersUtilsProvider, } from '@material-ui/pickers';
import DayjsUtils from '@date-io/dayjs';

import { Navigation } from './components/navigation/Nagivation';
import { AgendaPage } from './pages/agenda/AgendaPage';
import { EventAdminPage } from './pages/admininstration/events/EventAdminPage';
import { DashboardPage } from './pages/admininstration/DashboardPage';

import './App.css';

function App() {
    return (
        <MuiPickersUtilsProvider utils={ DayjsUtils }>
            <Box height="75%" data-testid="app-container">
                <Container maxWidth="lg" className="app-container">
                    <Router>
                        <Navigation>
                            <Switch>
                                <Route exact path="/">
                                    <AgendaPage />
                                </Route>
                                <Route exact path="/admin">
                                    <DashboardPage />
                                </Route>
                                <Route exact path="/admin/events">
                                    <EventAdminPage />
                                </Route>
                            </Switch>
                        </Navigation>
                    </Router>
                    
                </Container>
            </Box>
        </MuiPickersUtilsProvider>
    );
}

export default App;
