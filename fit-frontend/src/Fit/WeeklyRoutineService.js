import { pull, push, legs, upperBody, legsAbs, backLegs, chestBack, arms } from "./DailyRoutineService";
import { WeeklyRoutine } from "./WeeklyRoutine";
import { DailyRoutine } from "./DailyRoutine";

// export const pull = new DailyRoutine("Pull Day", 45, ["back", "biceps"]);

export const ppl = new WeeklyRoutine("Push Pull Legs", 3, 45, [pull, push, legs]);

export const phat = new WeeklyRoutine("Power Hypertrophy", 4, 45, [upperBody, legs, push, backLegs]);

export const print = () => {
    console.log(ppl);
}

export const create = (daysPerWeek, min, workouts, bodys) => {

  const { upper, lower, core } = bodys;

  const {general, strength, bodybuilding, calisthenics} = workouts;
  if(daysPerWeek == 2) {
    return new WeeklyRoutine("Upper Lower", daysPerWeek, min, [upperBody(min), legsAbs(min)]);
  } else if(daysPerWeek == 3){
    return new WeeklyRoutine("Push Pull Legs", daysPerWeek, min, [push(min), pull(min), legs(min)]);
  } else if(daysPerWeek == 4) {
    return new WeeklyRoutine("Power Hypertrophy", daysPerWeek, min, [upperBody(min), legs(min), push(min), backLegs(min)]);
  } else if(daysPerWeek == 5) {
    return new WeeklyRoutine("Power Hypertrophy", daysPerWeek, min, [upperBody(min), legs(min), push(min), legs(min), pull(min)]);
  }

  let wr = new WeeklyRoutine("Push Pull Legs", daysPerWeek, min, bodys)
  console.log(wr);
}
