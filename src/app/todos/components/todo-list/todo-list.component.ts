import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { ITodo } from '@app/todos/interfaces';
import { TodosService } from '@app/todos/services/todos.service';


@Component({
  selector: 'app-todos-list',
  styleUrls: [
    './todo-list.component.scss',
  ],
  templateUrl: './todo-list.component.html',
})
export class TodosListComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  filters: Subscription;
  todoList: ITodo[];

  constructor(private todosService: TodosService) { }

  ngOnInit(): void {
    this.filters = this.todosService.filters$.subscribe(filt => {
      this.subscription = this.todosService.allTodos$.pipe(
        map(res => res.filter(value => {
            if (filt === 'Active') {
              return value.completed === false;
            } else if (filt === 'Completed') {
              return value.completed === true;
            } else {
              return true;
            }
          }
        ))
      ).subscribe(list => {
        this.todoList = list;
      });
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.filters) {
      this.filters.unsubscribe();
    }
  }

  delete(index) {
    this.todosService.removeTodo(index);
  }
  changeStatus(index) {
    this.todosService.toggleComplete(index);
  }
  doubleClick(index) {
    this.todosService.editTodo(index);
  }
  update(text, index){
    this.todosService.updateTodo(index, text);
  }
}
