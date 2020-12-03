import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Todo } from 'src/app/models/Todo';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {

  @Output() addTodo: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  addTodoForm = new FormGroup({
    todo: new FormControl('')
  });

  onSubmit() {
    const todo:Todo = {
      title: this.addTodoForm.value.todo,
      completed: false
    }
    this.addTodo.emit(todo);
    this.addTodoForm.reset();
  }

}
