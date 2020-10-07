import { Component, OnInit } from '@angular/core';

import { TodosService } from '@app/todos/services/todos.service';

@Component({
  selector: 'app-list-input',
  templateUrl: './list-input.component.html',
  styleUrls: ['./list-input.component.scss']
})
export class ListInputComponent implements OnInit {
  listItem: string;

  constructor(private todosService: TodosService) { }

  ngOnInit(): void {
  }

  submit() {
    const cleanedListItem = this.listItem.trim();
    if (cleanedListItem !== '') {
      this.todosService.addTodo(this.listItem);
      this.listItem = '';
    }
  }

}
