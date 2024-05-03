import { Workout}  from './Workout';
import { WorkoutService, workouts}  from './WorkoutService';

export class DailyRoutine {
  constructor(name, time, bodys){
    this.name = name;
    this.time = time;
    this.bodys = bodys;
    this.routine = [];
    // body parts
    for(let b=0;b<bodys.length;b++){
      // console.log(bodys[i]);
      let body = bodys[b];
      let w = workouts.get(body);
      // console.log(w[0]);

      // each body part's exercises
      for(let j=30;j<=time;j+=15){
        let index = (j-30)/15;
        if( index == 2 && (body == 'triceps' || body == 'biceps')) {

        } else
          this.routine.push(w[(j-30)/15]);
      }
    }
    // console.log(this.routine);
    this.getRoutine = () => {
      console.log(this.routine);
    }
    this.getRoutine();
  }


}
