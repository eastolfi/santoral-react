import dayjs, { Dayjs } from 'dayjs';

export function DayjsPropType(props: { [name: string]: Dayjs }, propName: string, componentName: string): Error {
    let error;
    
    const prop = props[propName];

    if (!prop) {
        error = new Error(`'${componentName}' property '${propName}' is required`);
    }

    if (!dayjs.isDayjs(prop)) {
        error = new Error(`'${componentName}' property '${propName}' needs to be an instance of 'DayJS'`);
    }

    return error;
}
