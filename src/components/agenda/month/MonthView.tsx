import { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import { Dayjs } from 'dayjs';
import * as PropTypes from 'prop-types';

import { DayjsPropType } from '../../../prop-types/DayjsPropType';
import { Day } from '../day/Day';

import { WeekHeader } from './WeekHeader';
import { AgendaDisplayType, MonthSelector } from './MonthSelector';

import './MonthView.css';

type MonthViewProps = {
    date: Dayjs,
    selectedDate: Dayjs,
    onChangeSelectedDate: (newDate: Dayjs) => void,
    onChangeDisplayDate: (isNext: boolean, type: AgendaDisplayType) => void,
    includeWeekends?: boolean,
};

function getDaysBeforeMonthStart(date: Dayjs, initial = true): Dayjs[] {
    const dates = [];
    const current = date.clone();

    // If the current date is not a monday, check the previous day
    if (date.day() !== 1) {
        dates.push(...getDaysBeforeMonthStart(current.subtract(1, 'day'), false));
    }

    // Add the current date (excluding the initial one)
    if (!initial) {
        dates.push(current);
    }

    return dates;
}

function getDaysAfterMonthEnd(date: Dayjs, includeWeekends = true, initial = true): Dayjs[] {
    const dates = [];
    const current = date.clone();
    const lastDayOfWeek = includeWeekends ? 0 : 5;

    // Add the current date (excluding the initial one)
    if (!initial) {
        dates.push(current);
    }

    // If the current date is not a friday/sunday, check the next day
    if (date.day() !== lastDayOfWeek) {
        dates.push(...getDaysAfterMonthEnd(current.add(1, 'day'), includeWeekends, false));
    }

    return dates;
}

function getDaysOfMonth(date: Dayjs, includeWeekends = true): Dayjs[] {
    const dates: Dayjs[] = [];
    const start = date.startOf('month');
    const end = date.endOf('month');

    dates.push(...getDaysBeforeMonthStart(start));
    
    let current = start.clone();
    while(current.isBefore(end)) {
        dates.push(current.clone());
        current = current.add(1, 'day');
    }
    
    dates.push(...getDaysAfterMonthEnd(end, includeWeekends));

    return dates;
}

export function MonthView(props: MonthViewProps) {
    const today = props.date;

    const dates = getDaysOfMonth(today, props.includeWeekends);
    
    return (
        <div className='month-display-container container-fluid'>
            <MonthSelector date={ today } onChangeDate={ props.onChangeDisplayDate } />

            <WeekHeader date={ today } includeWeekends={ props.includeWeekends } />

            <Fragment>
                <Grid container direction="row" className={`day-list-container text-center ${props.includeWeekends ? 'with-weekends' : 'without-weekends'}`}>
                    {dates
                        .filter(date => props.includeWeekends || [0, 6].indexOf(date.day()) === -1)
                        .map((date: Dayjs) => {
                            return (
                                <Grid key={date.format()} item className='day-container'>
                                    <Day date={ date } selectedDate={ props.selectedDate } onClickDate={ props.onChangeSelectedDate } />
                                </Grid>
                            )
                    })}
                </Grid>
            </Fragment>
        </div>
    )
}

MonthView.propTypes = {
    date: DayjsPropType,
    selectedDate: DayjsPropType,
    onChangeSelectedDate: PropTypes.func.isRequired,
    onChangeDisplayDate: PropTypes.func.isRequired,
    includeWeekends: PropTypes.bool,
};
