import { Dayjs } from 'dayjs';
import * as PropTypes from 'prop-types';

import { DayjsPropType } from '../../../prop-types/DayjsPropType';

import './Day.css';

type DayProps = {
    date: Dayjs,
    selectedDate: Dayjs,
    onClickDate: (newDate: Dayjs) => void,
};

export function Day(props: DayProps) {
    const isSelected = props.date.isSame(props.selectedDate, 'day');
    return (
        <div className={ `day ${isSelected ? 'selected' : ''}` }>
            <span onClick={ () => props.onClickDate(props.date) }>{ props.date.date() }</span>
        </div>
    )
}

Day.propTypes = {
    date: DayjsPropType,
    selectedDate: DayjsPropType,
    onClickDate: PropTypes.func.isRequired,
};
