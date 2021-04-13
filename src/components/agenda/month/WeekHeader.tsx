import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Dayjs } from 'dayjs';
import * as PropTypes from 'prop-types'

import { DayjsPropType } from '../../../prop-types/DayjsPropType';

import './WeekHeader.css';

type WeekHeaderProps = {
    date: Dayjs,
    includeWeekends?: boolean,
};

export function WeekHeader(props: WeekHeaderProps) {
    const weekStart = props.date.startOf('week');
    const weekEnd = props.date.endOf('week');

    const dates = [];
    let current = weekStart;
    while (current.isBefore(weekEnd)) {
        dates.push(current);
        current = current.add(1, 'day');
    }

    return (
        <Grid container justify="center" className={ `week-header ${props.includeWeekends ? 'with-weekends' : 'without-weekends'}` }>
            {dates
                .filter(date => props.includeWeekends || [0, 6].indexOf(date.day()) === -1)
                .map((date: Dayjs) => {
                    return (
                        <Grid item key={date.format()} className='weekday'>
                            <Typography variant="subtitle2">{ date.format('ddd') }</Typography>
                        </Grid>
                    )
            })}
        </Grid>
    )
}

WeekHeader.propTypes = {
    date: DayjsPropType,
    includeWeekends: PropTypes.bool,
};
