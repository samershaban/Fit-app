import { Workout}  from './Workout';

export let workouts = new Map();
// export const WorkoutService = () => {
  // export function output() {
  // console.log(w);
  workouts = new Map();
  workouts.set('chest', new Array);
  workouts.set('back', []);
  workouts.set('legs', []);
  // Add seperate keys for quads and hamstrings
  workouts.set('lowerback', []);
  workouts.set('calves', []);
  workouts.set('shoulders', []);

  workouts.set('triceps', []);
  workouts.set('biceps', []);

  workouts.set('abs', []);
  workouts.set('cardio', []);
  // Add seperate keys for calisthenics, functional, powerlifting, at home, cardio, mobility

  workouts.get('chest').push(new Workout('Bench Press', 'Chest', ['Strength', 'Hypertrophy']));
  workouts.get('chest').push(new Workout('Incline Bench', 'Chest', ['Strength', 'Hypertrophy']));
  workouts.get('chest').push(new Workout('Chest Press', 'Chest', ['Strength']));
  workouts.get('chest').push(new Workout('Pushups', 'Chest', ['Calisthenics']));

  workouts.get('back').push(new Workout('Bent over row', 'Back', ['Strength', 'Hypertrophy']));
  workouts.get('back').push(new Workout('Lat Pulldowns', 'Back', ['Strength, Hypertrophy']));
  workouts.get('back').push(new Workout('Seated Cable Row', 'Back', ['Strength, Hypertrophy']));
  workouts.get('back').push(new Workout('Pullups', 'Back', ['Calisthenics']));

  workouts.get('legs').push(new Workout('Squat', 'Legs', ['Strength', 'Hypertrophy']));
  workouts.get('legs').push(new Workout('Leg curl', 'Legs', ['Strength', 'Hypertrophy']));
  workouts.get('legs').push(new Workout('Leg Press', 'Legs', ['Strength', 'Hypertrophy']));
  workouts.get('legs').push(new Workout('Lunges', 'Legs', ['Calisthenics']));
  workouts.get('legs').push(new Workout('Bulgurian Split Squat', 'Legs', ['Calisthenics']));

  workouts.get('calves').push(new Workout('Calf Raises', 'Calves', ['Hypertrophy', 'Strength']));
  workouts.get('calves').push(new Workout('Standing Calf Raises', 'Calves', ['Hypertrophy', 'Strength']));

  workouts.get('lowerback').push(new Workout('Romanian Deadlift', 'Lower Back', ['Strength']));
  workouts.get('lowerback').push(new Workout('Deadlift', 'Lower Back', ['Strength']));

  workouts.get('shoulders').push(new Workout('Dumbell Shoulder Press', 'Shoulders', ['Strength', 'Hypertrophy']));
  // workouts.get('shoulders').push(new Workout('Military Press', 'Shoulders', ['Strength']));
  workouts.get('shoulders').push(new Workout('Side lateral raises', 'Shoulders',['Strength', 'Hypertrophy']));
  workouts.get('shoulders').push(new Workout('Face Pulls', 'Shoulders', ['Hypertrophy', 'Strength']));
  

  workouts.get('shoulders').push(new Workout('Pike pushups', 'Shoulders', ['Calisthenics']));

  workouts.get('triceps').push(new Workout('Tricep Cable Pushdown', 'Triceps', ['Hypertrophy', 'Strength']));
  workouts.get('triceps').push(new Workout('Tricep Dips', 'Triceps', ['Strength', 'Calisthenics']));
  workouts.get('triceps').push(new Workout('Skull Crushers', 'Triceps', ['Strength', 'Hypertrophy']));

  workouts.get('biceps').push(new Workout('Barbell Curl', 'Biceps', ['Strength', 'Hypertrophy']));
  workouts.get('biceps').push(new Workout('Dumbell Curl', 'Biceps', ['Strength', 'Hypertrophy']));

  workouts.get('abs').push(new Workout('Seated Crunches', 'Abs', ['Strength', 'Hypertrophy']));
  workouts.get('abs').push(new Workout('Cable Crunches', 'Abs', ['Strength', 'Hypertrophy']));
  workouts.get('abs').push(new Workout('Planks', 'Abs', ['Calisthenics']));

  export const output = () => {
    console.log(workouts);
  }
  // }

  
// }