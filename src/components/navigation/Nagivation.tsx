import { ChangeEvent, Fragment, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import EventTwoToneIcon from '@material-ui/icons/EventTwoTone';
import SettingsTwoToneIcon from '@material-ui/icons/SettingsTwoTone';

import './Navigation.css';

interface NavigationProps {
    children: any;
}
export function Navigation(props: NavigationProps) {
    const history = useHistory();

    const [ selected, setSelected ] = useState('/');
    const handleNavChange = (_event: ChangeEvent<{}>, value: string): void => {
        setSelected(value);

        // Navigate to the selected route
        history.push(value);
    }
    return (
        <Fragment>
            <Container>
                { props.children }
            </Container>
            <BottomNavigation value={ selected } onChange={ handleNavChange } showLabels className="bottom-navigation">
                <BottomNavigationAction label="Agenda" value="/" icon={<EventTwoToneIcon />} />
                <BottomNavigationAction label="Administrate" value="/admin/events" icon={<SettingsTwoToneIcon />} />
            </BottomNavigation>
        </Fragment>
    );
}
