insert into users (first_name, second_name, email, password)
values ('Andrew', 'Taylor', 'andrewtaylor@gmail.com', '$2b$10$bDoSWAc8zl46LhoX3c4BIuvzJL1AjPED66b1jJJYQ/TLe5CY93DyK');

insert into routines (name, weeks, frequency, user_id)
values ('Holiday Cut', 12, 4, 1);

insert into workouts (name, date, routine_id)
values ('Chest Day', '2022-03-10', 1);

insert into body_parts (name)
values ('Chest');

insert into exercises (exercise_name, compound, body_part_id)
values ('Bench Press', true, 1);


insert into workout_exercises (workout_id, exercise_id)
values (1, 1);

insert into routine_exercises (routine_id, exercise_id)
values (1,1)

