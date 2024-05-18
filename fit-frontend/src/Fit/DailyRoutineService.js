import { DailyRoutine } from './DailyRoutine';
// import { Workout}  from './Workout';

// Daily routines
export const push = (min) => {return new DailyRoutine("Push Day", min, ["chest", "shoulders", "triceps"]);}

export const pull = (min) => {return new DailyRoutine("Pull Day", min, ["back", "biceps"]);}

export const legs = (min) => {return new DailyRoutine("Leg Day", min, ["legs", "calves"]);}

export const upperBody = (min) => {return new DailyRoutine("Upper body", min, ["chest", "shoulders", "back", "triceps", "biceps"]);}

export const legsAbs = (min) => {return new DailyRoutine("Leg and Ab Day", min, ["legs", "calves", "abs"]);}

export const backLegs = (min) => {return new DailyRoutine("Pull Day", min, ["back", "legs", "biceps"]);}

export const chestBack = (min) => {return new DailyRoutine("Chest and Back Day", min, ["chest", "back", "biceps"]);}

export const arms = (min) => {return new DailyRoutine("Arm Day", min, ["triceps", "biceps"]);}
// set how many workouts from each body part
// add set and rep multiplyers
// compound movements need more sets than isolation (bis and tris)
