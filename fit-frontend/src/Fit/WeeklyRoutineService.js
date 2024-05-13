import { pull, push, legs, upperBody, backLegs, chestBack, arms } from "./DailyRoutineService";
import { WeeklyRoutine } from "./WeeklyRoutine";
import { DailyRoutine } from "./DailyRoutine";

// export const pull = new DailyRoutine("Pull Day", 45, ["back", "biceps"]);

export const ppl = new WeeklyRoutine("Push Pull Legs", 3, 45, [pull, push, legs]);

export const phat = new WeeklyRoutine("Power Hypertrophy", 4, 45, [upperBody, legs, push, backLegs]);

export const print = () => {
    console.log(ppl);
}

export const create = () => {
  
}