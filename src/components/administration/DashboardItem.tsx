import { ReactNode, useState } from 'react';
import { useHistory } from 'react-router';

import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import './DashboardItem.css';

interface DashboardItemProps {
    link: string;
    children: ReactNode;
}

export function DashboardItem(props: DashboardItemProps) {
    const [ shadowLevel, setShadowLevel ] = useState(2);
    
    const history = useHistory();
    const handleItemClick = () => {
        history.push(props.link);
    }

    return (
        <Box boxShadow={ shadowLevel } onMouseEnter={ () => setShadowLevel(5) } onMouseLeave={ () => setShadowLevel(2) } >
            <Card className="dashboard-item" onClick={ handleItemClick }>
                <CardContent>
                    { props.children }
                </CardContent>
            </Card>
        </Box>
    )
}
