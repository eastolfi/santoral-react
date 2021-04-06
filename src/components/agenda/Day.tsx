import dayjs, { Dayjs } from 'dayjs';
import { DayjsPropType } from '../../prop-types/DayjsPropType';

import './Day.css';

type DayProps = {
    date: Dayjs
};

export function Day(props: DayProps) {
    const isToday = props.date.isSame(dayjs(), 'day');

    return (
        <div className={ `day ${isToday ? 'today' : ''}` }>
            <span>{ props.date.date() }</span>
        </div>
    )
}

Day.propTypes = {
    date: DayjsPropType
};
