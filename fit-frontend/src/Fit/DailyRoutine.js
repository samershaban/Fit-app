import { Workout}  from './Workout';
import { WorkoutService, workouts}  from './WorkoutService';

export class DailyRoutine {
  routine = []
  constructor(name, time, bodys){
    this.name = name;
    this.time = time;
    this.bodys = bodys;
    // this.routine = [];
    // body parts
    this.createRoutine();
    // console.log(this.routine);
    
    // this.getRoutine();
  }

  getRoutine = () => {
    console.log(this.routine);
  }

  createRoutine = () => {
    const total = this.bodys.length;
    // 30 min - 3-4 exercises
    // 45 min - 5-6 exercises
    // 60 min - 8-9 exercises
    let eachWorkout = ((this.time/total/6));
    for(let b=0;b<this.bodys.length;b++) {
      let body = this.bodys[b];
      let w = null;
      if(workouts.has(body)){
        w = workouts.get(body);
      }
      else{
        console.log(body, 'doest exist');
        break;
      }

      for(let j=0;j<=eachWorkout-1;j++){
        // isolation exercises
        if( j >= 2 && (body == 'triceps' || body == 'biceps' || body == 'calves' || body == 'shoulders')) {

        } else{
          // check exercise bounds
          if(j<w.length)
            this.routine.push(w[j]);
          else {
            console.log('not enough ', body)
          }
        }
      }
    }
    // then go back and add extra to compound exercises
    
    // for(let b=0;b<this.bodys.length;b++){
    //   // console.log(bodys[i]);
    //   let body = this.bodys[b];
    //   let w = null;
    //   if(workouts.has(body)){
    //     w = workouts.get(body);
    //   }
    //   else{
    //     console.log(body, 'doest exist');
    //     break;
    //   }
    //   // console.log(w[0]);

    //   // each body part's exercises
    //   // add check for less than 3 exercises in the case of 60 min
    //   for(let j=30;j<=this.time;j+=15){
    //     let index = (j-30)/15;
    //     if( index == 2 && (body == 'triceps' || body == 'biceps' || body == 'calves')) {

    //     } else
    //       this.routine.push(w[(j-30)/15]);
    //   }
    // }
    this.getRoutine();
  }

}
