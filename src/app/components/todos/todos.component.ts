import { Component, OnInit } from '@angular/core';
import {Todo} from '../../models/Todo'
import {TodoService} from '../../services/todo.service'
import {Title} from "@angular/platform-browser";
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  todos!:any[];

  constructor(private todoService: TodoService, private titleService:Title) { 
    this.titleService.setTitle("Home Page");
  }

  ngOnInit(): void {
    this.todoService.getTodos().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.todos = data;
    });
  }

  addTodo(todo:Todo):void{
    this.todoService.addTodo(todo).then(() => {
      console.log('Created new item successfully!');
    });
  }

  deleteTodo(todo:Todo){
    const tempId = todo.id!;

    const temp: Todo = {
      completed: todo.completed,
      deleted: !todo.deleted,
      title: todo.title,
    }

    this.todoService.deleteTodo(tempId, temp);
  }

}

// https://www.youtube.com/watch?v=Fdf5aTYRW0E&ab_channel=TraversyMedia
// https://bezkoder.com/angular-10-firestore-crud-angularfire/