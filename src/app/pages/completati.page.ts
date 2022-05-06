import { Component, OnInit } from '@angular/core';
import { Todo } from '../interface/todo';
import * as todoServ from '../service/todos.service';

@Component({
  template: `
    <div>
      <ng-container *ngIf="task; else elseTemplate">
        <div *ngIf="task.length > 0; else elseNoTask">
          <div *ngFor="let t of task; let i = index">
            <div>- {{ t.title }}</div>
          </div>
        </div>
      </ng-container>
      <ng-template #elseTemplate>
        <p>Recupero Task...</p>
      </ng-template>
    </div>

    <ng-template #elseNoTask> <p>Non ci sono task completati</p> </ng-template>
  `,
  styles: [],
})
export class CompletatiPage implements OnInit {
  task!: Todo[];

  constructor() {
    todoServ
      .get()
      .then((todos) => (this.task = todos.filter((todo) => todo.completed)));
  }

  ngOnInit(): void {}
}
