# Overview

This repositry contains an application to track and suggest gym workouts

## Problem Definition

This application is being developed to encourage users to track their workouts in order to push progress in the gym, other applications are not open source and cost too much for the service provided.

## Priorties

### Must have

- A user must be able to log in
- A user must be able to add their Routine (How many days per week, exercise selection, sets, rep range)
- A user must be able to edit this routine (edit individual workouts)

### Should have

- A user should be able to select from a set list of available exercises
- A user should be able to add new exercises if they are not on the list of exercises
- A user should have the ability to see previously logged workouts

### Could have

- The application could follow a 5/3/1 training template which will automatically increase the users lifts on a 4 week basis to encourage progression.
- The application could record your numbers and use the Brzycki formula to give an accurate 1RPM (usually only accurated between 1-10 reps)

### Will not have

- Connect to apple/android health apps
- Videos examples of how to perform exercises

## Domain Model Diagram

```mermaid
%%{init: {'theme':'dark'}}%%
erDiagram
    User ||--o{ WorkOut : manages
    User ||--o{ Routine: creates
    Routine||--|{ WorkOut: includes
    Routine||--|{ Exercise: contains
    WorkOut ||..o{ Exercise : contains

```

### Entity Relationship Diagram

```mermaid
%%{init: {'theme':'dark'}}%%
erDiagram
    user ||--|| routine : creates
    user {
        int id PK
        text first_name
        text second_name
        text password
    }
    routine ||--|{ workout : contains
    routine ||--|{ exercise : contains
    routine {
        int id PK
        text name
        int weeks
        int frequency
        int user_id FK

    }
    workout ||--|{ workout_exercises : includes
    workout {
        int id PK
        text name
        dateFormat date_created
        int routine_id FK

    }
    workout_exercises ||--|{ exercise : includes
    workout_exercises ||--|{ workout_exercise_sets : includes
    workout_exercises{
        int id pk
        int workout_id fk
        int exercise_id fk
    }

    exercise ||--|| routine_exercises: includes
    exercise ||--|{ body_part: works
    exercise {
        int id PK
        text exercise_name
        boolean compound
        int body_part_id FK

    }
    routine ||--|{ routine_exercises: includes
    routine_exercises {
        int id
        int routine_id fk
        int exerise_id fk
    }

     body_part {
        int ids PK
        text name
    }


     workout_exercise_sets {
        int id
        int workout_exercise_id fk
        int reps
        text difficulty
    }



```

## API Specification

GET /users - Return all users

Response

```json
[
  {
    "user_id": 1,
    "first_name": "Ken",
    "last_name": "Jones",
    "password": "speakfriend"
  },
  {
    "user_id": 2,
    "first_name": "Mary",
    "last_name": "Jane",
    "password": "speakfriend"
  }
]
```

POST /users - Create a new user

Request

```json
[
  {
    "first_name": "new_f_name",
    "last_name": "new_l_name",
    "password": "new_password"
  }
]
```

PUT /user/{user_id} - Update a user using a given id

Request

```json
[
  {
    "first_name": "update_f_name",
    "last_name": "update_l_name",
    "password": "update_password"
  }
]
```

GET /users/{user_id} - Return the user for the given id

Response

```json
[
  {
    "user_id": 1,
    "first_name": "Ken",
    "last_name": "Jones",
    "password": "speakfriend"
  }
]
```

Routine

GET /routines - Return all routines

```json
Response
[
{
"routine_id": 1,
"name": "Bulking routine",
"weeks": "12",
"frequency": "4x"
"user_id": "1"
},
{
"routine_id": 2,
"name": "Bulking routine",
"weeks": "16",
"frequency": "5x"
"user_id": "2"
}
]
```

GET /routines/{user_id} - Return all routines for a given user

Response

```json
[
{
"routine_id": 1,
"name": "Bulking routine",
"weeks": "12",
"frequency": "4x"
"user_id": "1"
}
]
```

GET /routines/{routine_id}/workouts/ - Get workouts assoicated with a routine

Response

```json
[
{
"workout_id": 1,
"name": "Chest Day",
"date_created": Date,
"routine_id": 1
},
{
"workout_id": 2,
"name": "leg Day",
"date_created": Date,
"routine_id": 1
}
]
```

GET /routines/{routine_id}/exercises/ - Get exercises assoicated with a routine

Response

```json
[
{
"exercise_id": 4,
"exercise_name": "Shoulder Press",
"compound": True,
"body_part_id": "5"
},
{
"exercise_id": 5,
"exercise_name": "Deadlift",
"compound": True,
"body_part_id": "4"
}
]
```

Exercise

GET /exercises - Return all exercises

Response

```json
[
{
"exercise_id": 1,
"exercise_name": "Bench Press",
"compound": True,
"body_part_id": "1"
},
{
"exercise_id": 2,
"exercise_name": "Squat",
"compound": True,
"body_part_id": "2"
}
]
```

POST /exercises - Add a new exercise

Request

```json
[
{
"exercise_name": "new_exercise",
"compound": True/false,
"body_part_id": "body_part_id"
}
]
```

PUT /exercises/{exercise_id} - Update an exercise

Request

```json
[
{
"exercise_name": "update_exercise",
"compound": True/false,
"body_part_id": "body_part_id"
}
]
```

GET /exercises/{body_part_id} - Return a list of exercises associated with a body part

Response

```json
[
{
"exercise_id": 1,
"exercise_name": "Bench Press",
"compound": True,
"body_part_id": "1"
}
]
```

Workout

Exercise

GET /workouts - Return all workouts

Response

```json
[
{
"workout_id": 5,
"name": "Upper Day",
"date_created": Date,
"routine_id": 4
},
{
"workout_id": 9,
"name": "Lower Day",
"date_created": Date,
"routine_id": 4
}
]
```

GET /workouts/{workout_id}/exercises - Return a list of exercises within a workout

Response

```json
[
{
"exercise_id": 1,
"exercise_name": "Bench Press",
"compound": True,
"reps": "5",
"difficulty": "5"
"body_part_id": "1"
},
{
"exercise_id": 2,
"exercise_name": "Incline DB Chest Press",
"compound": True,
"reps": "8",
"difficulty": "3"
"body_part_id": "7"
}
]
```
