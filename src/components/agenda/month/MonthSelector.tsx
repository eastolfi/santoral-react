import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Typography from '@material-ui/core/Typography';
import { Dayjs } from 'dayjs';
import * as PropTypes from 'prop-types';

import { DayjsPropType } from '../../../prop-types/DayjsPropType';

export enum AgendaDisplayType {
    YEAR, MONTH, WEEK, DAY
}

type MonthSelectorProps = {
    date: Dayjs,
    onChangeDate: (isNext: boolean, type: AgendaDisplayType) => void,
};

export function MonthSelector(props: MonthSelectorProps) {
    return (
        <Grid container justify="space-around">
            <IconButton aria-label="previous" onClick={ () => props.onChangeDate(false, AgendaDisplayType.MONTH) }>
                <ChevronLeftIcon />
            </IconButton>

            <Typography variant="h6">{ props.date.format('MMMM') }</Typography>

            <IconButton aria-label="next" onClick={ () => props.onChangeDate(true, AgendaDisplayType.MONTH) }>
                <ChevronRightIcon />
            </IconButton>
        </Grid>
    )
}

MonthSelector.propTypes = {
    date: DayjsPropType,
    onChangeDate: PropTypes.func.isRequired,
};
