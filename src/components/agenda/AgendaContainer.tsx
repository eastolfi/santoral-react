import { ChangeEvent, useState } from 'react';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { Dayjs } from 'dayjs';

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
        <form>
            <FormControlLabel
                control={<Switch
                    checked={ includeWeekends }
                    onChange={ handleWeekendChange }
                    name="show-weekends"
                    color="primary" />}
                label="Show weekends"
            />

            <Button onClick={ () => handleSelectedDateChange(TimeService.today) }>Today</Button>

            <MonthView
                date={ displayedDate }
                selectedDate={ selectedDate }
                includeWeekends={ includeWeekends }
                onChangeSelectedDate={ handleSelectedDateChange }
                onChangeDisplayDate={ handleDisplayDateChange } />

            <Divider />

            <EventContainer date={ selectedDate } />
        </form>
    );
}
