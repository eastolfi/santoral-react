import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
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
        <Box
            onClick={ () => props.onClickDate(props.date) }
            className={ `day ${isSelected ? 'selected' : ''}` }
            boxShadow={ isSelected ? 1 : 0 }
            textAlign="center"
            display="flex"
            justifyContent="center"
            alignItems="center"
        >
            <Typography component="span" variant="body2">{ props.date.date() }</Typography>
        </Box>
    )
}

Day.propTypes = {
    date: DayjsPropType,
    selectedDate: DayjsPropType,
    onClickDate: PropTypes.func.isRequired,
};
