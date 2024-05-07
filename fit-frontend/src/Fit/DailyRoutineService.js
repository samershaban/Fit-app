import { DailyRoutine } from './DailyRoutine';
import { Workout}  from './Workout';

// Daily routines
export const push = new DailyRoutine("Push Day", 45, ["chest", "shoulder", "triceps"]);

export const pull = new DailyRoutine("Pull Day", 45, ["back", "biceps"]);

export const legs = new DailyRoutine("Leg Day", 45, ["legs", "calves"]);

export const upperBody = new DailyRoutine("Upper body day", 60, ["chest", "shoulder", "back", "triceps", "biceps"]);

export const legsAbs = new DailyRoutine("Leg and Ab Day", 45, ["legs", "calves", "abs"]);

export const backLegs = new DailyRoutine("Pull Day", 45, ["back", "legs", "biceps"]);

export const chestBack = new DailyRoutine("Chest and Back Day", 45, ["chest", "back", "biceps"]);

export const arms = new DailyRoutine("Arm Day", 30, ["triceps", "biceps"]);
// set how many workouts from each body part
// add set and rep multiplyers
// compound movements need more sets than isolation (bis and tris)
