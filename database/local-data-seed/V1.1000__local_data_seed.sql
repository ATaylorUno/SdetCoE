-- Password12345
insert into users (first_name, second_name, email, password)
values 
('Andrew', 'Taylor', 'andrewtaylor@gmail.com', '$2b$10$.RbzPZW79Du4kj.t5INUse/BZjZcSqDAUCWuR3nPo8CVSpoAIJp6u'),
('Andy', 'Taylor', 'andy@taylor.com', '$2b$10$.RbzPZW79Du4kj.t5INUse/BZjZcSqDAUCWuR3nPo8CVSpoAIJp6u');


insert into routines (name, start_date, finish_date, frequency, user_id)
values ('Holiday Cut', '2023-08-03', '2024-01-12', 4, 1);

insert into workouts (name, date, routine_id)
values ('Chest Day', '2023-08-03', 1);

insert into body_parts (name)
values ('Chest');

insert into exercises (exercise_name, compound, body_part_id)
values ('Bench Press', true, 1);


insert into workout_exercises (workout_id, exercise_id)
values (1, 1);

insert into routine_exercises (routine_id, exercise_id)
values (1,1)

