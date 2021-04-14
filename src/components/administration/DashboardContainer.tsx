import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { DashboardItem } from './DashboardItem';

import './DashboardContainer.css';

export function DashboardContainer() {
    return (
        <Grid container>
            <Grid item xs={2}>
                <DashboardItem link="/admin/events">
                    <Typography variant="h6">
                        Events
                    </Typography>
                </DashboardItem>
            </Grid>
        </Grid>
    )
}
