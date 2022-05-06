import { Component, OnInit } from '@angular/core';
import { Todo } from '../interface/todo';
import * as todoServ from '../service/todos.service';

@Component({
  template: `
    <div>
      <h1 class="text-center mt-5">Task Completati</h1>
      <ng-container *ngIf="task; else elseTemplate">
        <ul
          class="list-group text-center mt-5"
          *ngIf="task.length > 0; else elseNoTask"
        >
          <li
            class="border w-50 mx-auto ps-5 d-flex justify-content-start"
            *ngFor="let t of task; let i = index"
          >
            <i class="bi bi-journal-check me-5"></i>{{ t.title }}
          </li>
        </ul>
      </ng-container>
      <ng-template #elseTemplate>
        <p class="text-center mt-5">Recupero Task...</p>
      </ng-template>
    </div>

    <ng-template #elseNoTask>
      <p class="text-center mt-5">Non ci sono task completati</p>
    </ng-template>
  `,
  styles: [
    `
      li {
        font-size: 1.5em;
      }
      .bi-journal-check {
        color: green !important;
      }
    `,
  ],
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
