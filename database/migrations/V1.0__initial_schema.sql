CREATE TABLE IF NOT EXISTS public.users
(
    id serial constraint users_pk primary key,
    first_name text not null,
    second_name text not null,
    email text not null,
    password text not null,
    active boolean default true not null
);

CREATE TABLE IF NOT EXISTS public.routines
(
    id serial constraint routines_pk primary key,
    name text not null,
    start_date date not null,
    finish_date date not null,
    frequency int not null,
    user_id int constraint routine_user_user_id_fk references public.users(id)
);

CREATE TABLE IF NOT EXISTS public.workouts
(
    id serial constraint workouts_pk primary key,
    name text not null,
    date date not null,
    routine_id int constraint workout_routine_routine_id_fk references public.routines(id)
);

CREATE TABLE IF NOT EXISTS public.body_parts
(
    id serial constraint body_parts_pk primary key,
    name text not null
);

CREATE TABLE IF NOT EXISTS public.exercises
(
    id serial constraint exercises_pk primary key,
    exercise_name text not null,
    compound boolean default true not null,
    body_part_id int constraint exercise_body_part_body_part_id_fk references public.body_parts(id)
);

CREATE TABLE IF NOT EXISTS public.workout_exercises
(
    id serial constraint workout_exercises_pk primary key,
    workout_id int constraint workout_exercises_workout_workout_id_fk references public.workouts(id),
    exercise_id int constraint workout_exercises_exercise_exercise_id_fk references public.exercises(id)
);

CREATE TABLE IF NOT EXISTS public.routine_exercises
(
    id serial constraint routine_exercises_pk primary key,
    routine_id int constraint routine_exercises_routine_routine_id_fk references public.routines(id),
    exercise_id int constraint routine_exercises_exercise_exercise_id_pk references public.exercises(id)
);

CREATE TABLE IF NOT EXISTS public.workout_exercise_sets
(
    id serial constraint workout_exercise_sets_pk primary key,
    workout_exercise_id int constraint workout_exercise_sets_workout_exercises_workout_exercise_id references public.workout_exercises(id),
    reps int not null,
    difficulty text not null
);
