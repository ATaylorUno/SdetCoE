import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import axios from '../../../utils/axios'

const columns = [
  { field: 'id', headerName: 'ExerciseID', width: 100 },
  {
    field: 'name',
    headerName: 'Name',
    width: 110,
    editable: true,
  },
  {
    field: 'age',
    headerName: 'Age',
    width: 110,
    type: 'number',
    editable: true,
  },
  {
    field: 'startingWeight',
    headerName: 'Start Weight(kg)',
    width: 110,
    type: 'number',
    editable: true,
  },
  {
    field: 'currentWeight',
    headerName: 'Current Weight(kg)',
    width: 110,
    type: 'number',
    editable: true,
  },
  {
    field: 'height',
    headerName: 'Height(cm)',
    width: 110,
    type: 'number',
    editable: true,
  },
  {
    field: 'goal',
    headerName: 'Goal',
    width: 110,
    editable: true,
  },
  
  // {
  //   field: 'reps',
  //   headerName: 'Reps',
  //   type: 'number',
  //   width: 110,
  //   editable: true,
  // },
  // {
  //   field: 'totalSets',
  //   headerName: 'Total Sets',
  //   width: 160,
  //   valueGetter: (params) =>
  //     (params.row.warmupSets + params.row.workingSets),
  // },
  // {
  //   field: 'weight',
  //   headerName: 'Weight',
  //   type: 'number',
  //   width: 110,
  //   editable: true,
  // },
];

// const rows = [
//   { id: 1, exerciseName: 'Squat', reps: 5, warmupSets: 3, workingSets: 5, weight: 130 },
//   { id: 2, exerciseName: 'Bench', reps: 8, warmupSets: 3, workingSets: 4, weight: 75 },
//   { id: 3, exerciseName: 'Deadlift', reps: 3, warmupSets: 5, workingSets: 3, weight: 150 },

// ];

export default function DataGridBody() {
  const [rows, setRows] = React.useState([]);
  const getData = async () => {
    const response = await axios.get('workouts');
    setRows(response.data);

    console.log(response.data)
  };

  React.useEffect(() => {
    getData();
  }, [])



  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}