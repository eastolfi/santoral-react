import { Dayjs } from 'dayjs';
import * as PropTypes from 'prop-types'
import { DayjsPropType } from '../../prop-types/DayjsPropType';

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
        <div className={ `row week-header ${props.includeWeekends ? 'with-weekends' : 'without-weekends'}` }>
            {dates
                .filter(date => props.includeWeekends || [0, 6].indexOf(date.day()) === -1)
                .map((date: Dayjs) => {
                    return <div key={date.format()} className='day col'>{ date.format('ddd') }</div>
            })}
        </div>
    )
}

WeekHeader.propTypes = {
    date: DayjsPropType,
    includeWeekends: PropTypes.bool,
};
