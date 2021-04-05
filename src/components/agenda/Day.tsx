import * as PropTypes from 'prop-types'

type DayProps = {
    date: number
};

export const Day = (props: DayProps) => {
    return (
        <div>{ props.date }</div>
    )
}

Day.propTypes = {
    date: PropTypes.number.isRequired
};
