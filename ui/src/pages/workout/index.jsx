import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../../utils/axios";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";

const columns = [
  { field: "id", headerName: "ExerciseID", width: 100, hide: true },
  {
    field: "exercise_name",
    headerName: "Exercise name",
    width: 110,
    editable: true
  }
];

function Workout() {
  const { workoutId } = useParams();
  const navigate = useNavigate();
  const [exercises, setExercises] = useState([]);

  const getData = async id => {
    const response = await axios.get(`workouts/${id}/exercises`);
    setExercises(response.data);
  };

  useEffect(
    () => {
      getData(workoutId);
    },
    [workoutId]
  );

  const onDelete = async () => {
    const response = await axios.delete(`workouts/${workoutId}`);
    if (response.status === 204) {
      navigate("/");
    }
  };

  return (
    <h1>
      Hello there - {workoutId}
      <Button color="inherit" onClick={onDelete}>
        Delete
      </Button>
      <DataGrid
        rows={exercises}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5
            }
          }
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
    </h1>
  );
}

export default Workout;
