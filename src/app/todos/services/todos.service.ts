import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { ITodo } from '../interfaces';
import { ITodosState } from '../state/todos.reducer';
import { FILTER_MODES } from '../constants/filter-modes';
import * as TodoActions from '../state/todo.actions';
import * as todoSelectors from '../state/todo.selectors';
import * as todosAction from '@app/todos/state/todo.actions';

@Injectable()
export class TodosService {

  allTodos$: Observable<ITodo[]>;
  filters$: Observable<string>;

  constructor(
    private store: Store<ITodosState>,
  ) {
    this.allTodos$ = this.store.select(todoSelectors.allTodos);
    this.filters$ = this.store.select(todoSelectors.filters);
  }

  addTodo(text: string): void {
    this.store.dispatch(TodoActions.addTodo({ text }));
  }

  removeTodo(index: number): void {
    this.store.dispatch(TodoActions.removeTodo({ index }));
  }

  toggleComplete(index: number): void {
    this.store.dispatch(TodoActions.toggleCompleted({ index }));
  }

  toggleAllCompleted(): void {
    this.store.dispatch(TodoActions.toggleAllCompleted());
  }

  updateTodo(index: number, text: string): void {
    this.store.dispatch(TodoActions.updateTodo({ index, text }));
  }

  changeFilterMode(mode: FILTER_MODES): void {
    this.store.dispatch(TodoActions.changeFilterMode({ mode }));
  }

  clearCompleted(): void {
    this.store.dispatch(TodoActions.clearCompleted());
  }

  editTodo(index: number): void {
    this.store.dispatch(todosAction.editTodo({index}));
  }
}
