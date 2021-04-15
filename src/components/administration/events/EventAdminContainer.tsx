import { ReactNode, useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import {
    DataGrid,
    GridColDef,
    GridEditCellValueParams,
    GridRowsProp,
    GridValueFormatterParams,
    GridValueGetterParams,
    GridToolbarContainer,
    GridToolbarExport
} from '@material-ui/data-grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import DeleteForeverTwoToneIcon from '@material-ui/icons/DeleteForeverTwoTone';

import { AgendaEvent } from '../../../models/event';
import { AgendaService } from '../../../services/AgendaService';
import { TimeService } from '../../../services/TimeService';
import { ItemAddDialog } from './EventAddDialog';

// Function to return (dynamically) the grid toolbar
function CustomToolbar(selectedItems: string[], handleDeleteClick: () => void) {
    const buttons: ReactNode[] = [
        <GridToolbarExport />
    ];

    // If we have an item selected, add the delete button
    if (selectedItems?.length) {
        buttons.push(
            <Button
                aria-label="delete lines"
                color="secondary"
                variant="text"
                size="small"
                startIcon={ <DeleteForeverTwoToneIcon /> }
                onClick={ handleDeleteClick } >
                Delete lines
            </Button>
        );
    }

    return () =>  (
        <GridToolbarContainer>
            { buttons }
        </GridToolbarContainer>
    )
}

const columns: GridColDef[] = [
    {
        field: 'title',
        headerName: 'Title',
        flex: 1,
        editable: true,
    }, {
        field: 'description',
        headerName: 'Description', 
        flex: 1,
        editable: true
    }, {
        field: 'date',
        headerName: 'Date',
        type: 'date',
        editable: true,
        flex: 1,
        valueGetter: ({ value }: GridValueGetterParams) => {
            // The date can arrive as a Dayjs or a string, so we handle both cases
            if (dayjs.isDayjs(value)) {
                return TimeService.fromDayjs(value as Dayjs);
            } else {
                return value;
            }
        },
        valueFormatter: ({ value }: GridValueFormatterParams) => {
            return TimeService.toDayjs(value as string).format(TimeService.displayFormat);
        },
    },
];

export function EventAdminContainer() {
    const getEvents = () => {
        AgendaService.instance.getEvents().subscribe(setEvents);
    };

    const [ events, setEvents ] = useState([] as AgendaEvent[]);

    // Load events at first render
    useEffect(getEvents, []);

    // Convert the event list to the grid
    const eventsForGrid: GridRowsProp = events.map((event: AgendaEvent) => {
        return {
            id: event._id,
            title: event.title,
            description: event.content,
            date: event.date
        }
    });

    // When a cell is modified, trigger the event update
    const handleCellValueChange = (params: GridEditCellValueParams) => {
        if (params.field === 'title') {
            updateEvent(params.id as string, { title: params.value as string });
        }

        if (params.field === 'description') {
            updateEvent(params.id as string, { content: params.value as string });
        }

        if (params.field === 'date') {
            updateEvent(params.id as string, { date: dayjs(params.value as string) });
        }
    }

    // Update a single field of an event
    const updateEvent = (id: string, event: Partial<AgendaEvent>): void => {
        let items = [...events];
        const index = items.findIndex(item => item._id === id);
        let item = {...items[index]};

        if (event.title) {
            item.title = event.title;
        }

        if (event.content) {
            item.content = event.content;
        }

        if (event.date) {
            item.date = event.date;
        }

        AgendaService.instance.updateEvent(item)
            .pipe(catchError((error: Error) => {
                console.log(error);

                return of(false);
            }))
            .subscribe((updated: boolean) => {
                if (updated) {
                    getEvents();
                }
            });
    }

    const [dialogAddOpen, setDialogAddOpen] = useState(false);
    const handleDialogAddOpen = () => {
        setDialogAddOpen(true);
    };
    
    // After the dialog is closed, save the event
    const handleDialogAddClose = (event?: Omit<AgendaEvent, '_id'>) => {
        setDialogAddOpen(false);

        if (event) {
            AgendaService.instance.createEvent(event)
            .pipe(catchError((error: Error) => {
                console.log(error);

                return of(null);
            }))
            .subscribe((eventId: string) => {
                if (eventId) {
                    getEvents();
                }
            });
        }
    };

    const [selectionModel, setSelectionModel] = useState([] as string[]);
    // This function will be called from the grid toolbar
    const handleEventDelete = () => {
        AgendaService.instance.deleteEvents(selectionModel)
        .pipe(catchError((error: Error) => {
            console.log(error);

            return of(false);
        }))
        .subscribe((deleted: boolean) => {
            if (deleted) {
                setSelectionModel([]);
                getEvents();
            }
        });
    }
    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={ eventsForGrid }
                columns={ columns }
                selectionModel={ selectionModel }
                checkboxSelection
                disableSelectionOnClick
                pagination
                pageSize={5}
                rowsPerPageOptions={[5, 10, 20]}
                components={{ Toolbar: CustomToolbar(selectionModel, handleEventDelete) }}
                onSelectionModelChange={ (newSelection) => setSelectionModel(newSelection.selectionModel as string[]) }
                onCellValueChange={ handleCellValueChange } />

            <Box mt={2} mr={2} display="flex" justifyContent="flex-end">
                <Fab color="primary" aria-label="add" onClick={ handleDialogAddOpen }>
                    <AddIcon />
                </Fab>
            </Box>

            {/* Do not render the dialog if we are not going to show it */}
            { dialogAddOpen ? <ItemAddDialog open={ dialogAddOpen } onClose={ handleDialogAddClose } /> : '' }
        </div>
    )
}

