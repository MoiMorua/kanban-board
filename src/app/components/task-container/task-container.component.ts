import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import Task from '../../common/interface';
import { STAGES } from '../../common/interface';

@Component({
  selector: 'app-task-container',
  templateUrl: './task-container.component.html',
  styleUrls: ['./task-container.component.scss']
})
export class TaskContainerComponent {

  @Input()
  title:string = 'Tasks';
  
  @Input()
  taskList:Task[] = [];

  @Input()
  canMoveToLeft:boolean = false;
  
  @Input()
  canMoveToRight:boolean = false;  

  @Output()
  moveTaskEmmiter: EventEmitter<Task>;
  
  @Output()
  removeTaskEmmiter: EventEmitter<Task>;

  constructor() {
    this.moveTaskEmmiter = new EventEmitter();
    this.removeTaskEmmiter = new EventEmitter();
  }

  moveTask(task:Task,direction:string){    
    
    this.moveTaskEmmiter.emit({
      ...task,      
      stage:direction==="+"?task.stage+1:task.stage-1,
      stageName: STAGES[(direction==="+"?task.stage+1:task.stage-1)-1],
      previous: STAGES[task.stage-1]
    });

  }

  removeTask(task:Task){
    this.removeTaskEmmiter.emit(task);
  }

  


}
