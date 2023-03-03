CREATE TABLE IF NOT EXISTS public.user
(
    id serial constraint user_pk primary key,
    first_name text not null,
    second_name text not null,
    password text not null
);

CREATE TABLE IF NOT EXISTS public.routine
(
    id serial constraint routine_pk primary key,
    name text not null,
    weeks int not null,
    frequency int not null,
    user_id int constraint routine_user_user_id_fk references public.user(id)
);

CREATE TABLE IF NOT EXISTS public.workout
(
    id serial constraint workout_pk primary key,
    name text not null,
    date date not null,
    routine_id int contraint workout_routine_routine_id_fk references public.routine(id)
);

CREATE TABLE IF NOT EXISTS public.workout_exercises
(
    id serial constraint workout_exercises_pk,
    workout_id int contraint workout_exercises_workout_workout_id_fk references public.workout(id),
    exercise_id int contraint workout_exercises_exercise_exercise_id_fk references public.exercise(id)
);

CREATE TABLE IF NOT EXISTS public.exercise
(
    id serial constraint exercise_pk primary key,
    exercise_name text not null,
    compound boolean default true not null,
    body_part_id int contraint exercise_body_part_body_part_id_fk references public.body_part(id)
);

CREATE TABLE IF NOT EXISTS public.routine_exercises
(
    id serial constraint routine_exercise_pk primary key
    routine_id int contraint routine_exercises_routine_routine_id_fk references public.routine(id),
    exercise_id int contraint routine_exercises_exercise_exercise_id_pk references public.exercise(id)
);

CREATE TABLE IF NOT EXISTS public.body_part
(
    id serial constraint body_part_pk primary key,
    name text not null
);

CREATE TABLE IF NOT EXISTS public.workout_exercise_sets
(
    id int not null,
    workout_exercise_id int contraint workout_exercise_sets_workout_exercises_workout_exercise_id references public.workout_exercises(id),
    reps int not null,
    difficulty text not null
);
