import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import Task from '../../common/interface';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {


  // tasks: [Task[]]
  backlog:Task[] = [];
  todo:Task[] = [];
  ongoing:Task[] = [];
  done:Task[] = [];
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      name:['',Validators.required]
    });
  
  }

  ngOnInit(): void {
  }


  createTask(){
    
    if(!this.form.valid) return;

    this.backlog.push({
      uuid: uuidv4(),
      name: this.form.get('name').value,
      stage: 1,
      stageName:'backlog'
    });

    this.form.get('name').setValue("");
    this.form.get('name').markAsPristine();


  }

  moveTask(task:Task){    
    if(task.stage>4 || task.stage==0) return;
    
    switch(task.previous){
      case 'backlog':
          this.backlog.splice(this.backlog.findIndex(el=>el.uuid===task.uuid),1)          
        break;
      case 'todo':
          this.todo.splice(this.todo.findIndex(el=>el.uuid===task.uuid),1)
        break;
      case 'ongoing':
          this.ongoing.splice(this.ongoing.findIndex(el=>el.uuid===task.uuid),1)
        break;
      case 'done':
          this.done.splice(this.done.findIndex(el=>el.uuid===task.uuid),1)
        break;
    }

    switch(task.stageName){
      case 'backlog':
          this.backlog.push(task);          
        break;
      case 'todo':
          this.todo.push(task);
        break;
      case 'ongoing':
          this.ongoing.push(task);
        break;
      case 'done':
          this.done.push(task);
        break;
    }

    

  }
  
  removeTask(task:Task){
    switch(task.stageName){
      case 'backlog':
          this.backlog.splice(this.backlog.findIndex(el=>el.uuid===task.uuid),1)          
        break;
      case 'todo':
          this.todo.splice(this.todo.findIndex(el=>el.uuid===task.uuid),1)
        break;
      case 'ongoing':
          this.ongoing.splice(this.ongoing.findIndex(el=>el.uuid===task.uuid),1)
        break;
      case 'done':
          this.done.splice(this.done.findIndex(el=>el.uuid===task.uuid),1)
        break;
    }
  }


}
