import { Dayjs } from 'dayjs';
import { ChangeEvent, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { TimeService } from '../../services/TimeService';

import { EventContainer } from './events/EventContainer';

import { AgendaDisplayType } from './month/MonthSelector';
import { MonthView } from './month/MonthView';

export function AgendaContainer() {
    const today = TimeService.today;

    const [ selectedDate, setSelectedDate ] = useState(today);
    const handleSelectedDateChange = (newDate: Dayjs): void => {
        setSelectedDate(newDate);
    }

    const [ displayedDate, setDisplayedDate ] = useState(today);
    const handleDisplayDateChange = (isNext: boolean, type: AgendaDisplayType): void => {
        let newDate: Dayjs;

        if (type === AgendaDisplayType.MONTH) {
            if (isNext) {
                newDate = displayedDate.clone().add(1, 'month');
            } else {
                newDate = displayedDate.clone().subtract(1, 'month');
            }
        }

        if (newDate) {
            setDisplayedDate(newDate);
        }
    }
    
    // Show the weekends or not
    const [ includeWeekends, setIncludeWeekends ] = useState(true);
    const handleWeekendChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        // Parse from the string value to the enum value
        setIncludeWeekends(target.checked);
    }

    return (
        <Form>
            <Form.Check 
                type="switch"
                id="show-weekends"
                label="Show weekends"
                checked={ includeWeekends }
                onChange={ handleWeekendChange }
            />
            <Button onClick={ () => handleSelectedDateChange(TimeService.today) }>Today</Button>

            <MonthView
                date={ displayedDate }
                selectedDate={ selectedDate }
                includeWeekends={ includeWeekends }
                onChangeSelectedDate={ handleSelectedDateChange }
                onChangeDisplayDate={ handleDisplayDateChange } />

            <hr className='divider' />

            <EventContainer date={ selectedDate } />
        </Form>
    );
}
