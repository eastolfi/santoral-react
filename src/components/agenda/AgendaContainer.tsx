import { AgendaService } from '../../services/AgendaService';
import { Day } from './Day';

export const AgendaContainer = () => {
    const today = AgendaService.today;

    return (
        <Day date={ today.date() } />
    );
}
