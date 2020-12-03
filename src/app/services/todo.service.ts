import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Todo} from '../models/Todo';
import { Observable } from 'rxjs';

import {AngularFireDatabase, AngularFireList} from 'angularfire2/database'
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})

export class TodoService {

  itemsCollection!: AngularFirestoreCollection<Todo>;
  // todos!: Observable<any[]>;

  constructor(private http:HttpClient,private AngularDb: AngularFireDatabase, private readonly afs: AngularFirestore) {
    this.itemsCollection = afs.collection('todos');
   }

  getTodos():AngularFirestoreCollection<Todo>{
    return this.itemsCollection;
  }

  addTodo(todo:Todo):any{
    const temp:Todo ={
      completed:false,
      deleted: false,
      title: todo.title
    }
    return this.itemsCollection.add({ ...temp});
  }

  toogleCompleted(id:string,todo:Todo):void{
    this.itemsCollection.doc(id).update(todo);
  }

  deleteTodo(id:string,todo:Todo):void{
    this.itemsCollection.doc(id).update(todo);
  }



}

// https://github.com/angular/angularfire/blob/master/docs/firestore/collections.md