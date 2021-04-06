import { Dayjs } from 'dayjs';
import * as PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';

import { DayjsPropType } from '../../../prop-types/DayjsPropType';

// import './Day.css';

export enum AgendaDisplayType {
    YEAR, MONTH, WEEK, DAY
}

type MonthSelectorProps = {
    date: Dayjs,
    onChangeDate: (isNext: boolean, type: AgendaDisplayType) => void,
};

export function MonthSelector(props: MonthSelectorProps) {
    return (
        <div className="row justify-content-around">
            <Button variant="link" size="sm" onClick={ () => props.onChangeDate(false, AgendaDisplayType.MONTH) }>
                <FontAwesomeIcon icon={ faChevronLeft } />
            </Button>

            <h3>{ props.date.format('MMMM') }</h3>

            <Button variant="link" size="sm" onClick={ () => props.onChangeDate(true, AgendaDisplayType.MONTH) }>
                <FontAwesomeIcon icon={ faChevronRight } />
            </Button>
        </div>
    )
}

MonthSelector.propTypes = {
    date: DayjsPropType,
    onChangeDate: PropTypes.func.isRequired,
};
