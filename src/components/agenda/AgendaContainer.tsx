import dayjs, { Dayjs } from 'dayjs';
import { ChangeEvent, useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';

import { AgendaService } from '../../services/AgendaService';
import { AgendaDisplayType } from './MonthSelector';

import { MonthView } from './MonthView';

enum IncludeWeekendsEnum {
    YES = 'Yes',
    NO = 'No'
}

export function AgendaContainer() {
    const [ currentDate, setCurrentDate ] = useState(dayjs());
    
    
    useEffect(() => {
        console.log(AgendaService.getEvents(currentDate));
    }, [currentDate]);
    
    const handleDateChange = (isNext: boolean, type: AgendaDisplayType) => {
        let newDate: Dayjs;

        if (type === AgendaDisplayType.MONTH) {
            if (isNext) {
                newDate = currentDate.clone().add(1, 'month');
            } else {
                newDate = currentDate.clone().subtract(1, 'month');
            }
        }

        if (newDate) {
            setCurrentDate(newDate);
        }
    }
    
    // Show the weekends or not
    const [ includeWeekends, setIncludeWeekends ] = useState(IncludeWeekendsEnum.YES.toString());
    const includeWeekendsAsBoolean = includeWeekends === IncludeWeekendsEnum.YES ? true : false;
    const handleWeekendChange = ({ target }: ChangeEvent<HTMLSelectElement>) => {
        // Parse from the string value to the enum value
        setIncludeWeekends(target.value);
    }

    return (
        <Form>
            <Form.Group controlId="exampleForm.SelectCustomSizeSm">
                <Form.Label>Show weekends?</Form.Label>
                <Form.Control as="select" size="sm" custom value={ includeWeekends } onChange={ handleWeekendChange }>
                    <option>{ IncludeWeekendsEnum.YES }</option>
                    <option>{ IncludeWeekendsEnum.NO }</option>
                </Form.Control>
            </Form.Group>

            <MonthView date={ currentDate } includeWeekends={ includeWeekendsAsBoolean } onChangeDate={ handleDateChange } />

            {/* Show events */}
        </Form>
    );
}
