import { ReactNode } from 'react';
import { useHistory } from 'react-router';

// import './DashboardItem.css';

interface DashboardItemPageProps {
    children: ReactNode;
}

export function DashboardItemPage(props: DashboardItemPageProps) {
    const history = useHistory();

    return (
        <div>
            <button onClick={() => history.push('/admin')}>🔙 Dashboard</button>

            { props.children }
        </div>
    )
}
