import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from 'src/app/models/Todo';

import {TodoService} from '../../services/todo.service'

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @Input() todo!: any;
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter();

  constructor(private todoService: TodoService) {
  }

  ngOnInit(): void {
  }

  setClasses(){
    let classes={
      todo:true,
      'is-complete': this.todo.completed
    }
    return classes;
  }

  onToogle(todo:Todo){

    //toogle in UI
    todo.completed = !todo.completed;

    const temp: Todo = {
      completed: todo.completed,
      deleted: todo.deleted,
      title: todo.title,
    }

    //toogle on Server
    this.todoService.toogleCompleted(todo.id!, temp);
  }

  onDelete(todo:Todo){
    this.deleteTodo.emit(todo);
  }

}


