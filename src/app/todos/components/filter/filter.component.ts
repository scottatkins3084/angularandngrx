import {Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';

import { TodosService } from '@app/todos/services/todos.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})

export class FilterComponent implements OnInit, OnDestroy {
  filters = ['All', 'Active', 'Completed'];
  subscription: Subscription;
  filter: Subscription;
  selectedFilter: string;
  uncompletedCount: number;
  totalCount: number;

  constructor(private todosService: TodosService) { }

  ngOnInit(): void {
    this.filter = this.todosService.filters$.subscribe(res => {
      this.selectedFilter = res;
    });
    this.subscription = this.todosService.allTodos$.subscribe(list => {
      this.totalCount = list.length;
      this.uncompletedCount = 0;
      for(const a of list) {
        if(a.completed === false) {
          this.uncompletedCount++;
        }
      }
    });
  }

  ngOnDestroy(): void {
    if (this.filter) {
      this.filter.unsubscribe();
    }
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  changeFilter(filter) {
    this.todosService.changeFilterMode(filter);
  };
  clearCompleted() {
    this.todosService.clearCompleted();
  }
}
