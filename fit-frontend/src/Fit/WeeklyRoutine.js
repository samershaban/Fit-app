// import { pull, push, legs, upperBody, legsAbs, backLegs, chestBack, arms } from "./DailyRoutineService";

export class WeeklyRoutine {
  constructor(name, daysPerWeek, time, DailyRoutines){
    this.name = name;
    this.daysPerWeek = daysPerWeek;
    this.time = time;
    this.DailyRoutines = DailyRoutines;
  }

}

// export const ppl = new WeeklyRoutine("Push Pull Legs", 3, 45, [push, pull, legs]);

// export const phat = new WeeklyRoutine("Power Hypertrophy", 4, 45, []);
