import { Component, OnInit } from '@angular/core';
import { Todo } from '../interface/todo';
import * as todoServ from '../service/todos.service';

@Component({
  template: `
    <h1 class="text-center">TODO LIST</h1>

    <div class="container mt-5">
      <div>
        <div class="row text-center">
          <input
            class="form-control mx-auto w-50 d-block"
            type="text"
            [(ngModel)]="newTask"
          />
          <button class="btn btn-primary w-25 d-block" (click)="aggiungi()">
            <i class="bi bi-plus-square"></i>
          </button>
        </div>
        <ng-container *ngIf="task; else elseTemplate">
          <div class="task mt-5" *ngIf="task.length > 0; else elseNoTask">
            <ul
              class="list-group text-center"
              *ngFor="let t of task; let i = index"
            >
              <li
                class="border w-50 mx-auto ps-5 d-flex justify-content-between"
              >
                <span class="spanLista">{{ t.title }}</span>

                <i
                  class="bi bi-check-circle-fill me-5"
                  (click)="completeTask(t, i)"
                ></i>
              </li>
            </ul>
          </div>
        </ng-container>
        <ng-template #elseTemplate>
          <p class="text-center mt-5">Recupero Tasks...</p>
        </ng-template>
      </div>

      <ng-template #elseNoTask>
        <p class="text-center mt-5">Oops, non ci sono Task</p>
      </ng-template>
    </div>
  `,
  styles: [
    `
      .bi-check-circle-fill {
        color: green !important;
        font-size: 2em !important;
        cursor: pointer !important;
      }

      .bi-plus-square {
        font-size: 1.5em !important;
      }

      .spanLista {
        font-size: 2em !important;
      }
    `,
  ],
})
export class TodoComponent implements OnInit {
  task!: Todo[];
  newTask!: string;

  constructor() {
    todoServ
      .get()
      .then((todos) => (this.task = todos.filter((todo) => !todo.completed)));
  }

  ngOnInit(): void {}

  async aggiungi() {
    if (this.newTask !== undefined && this.newTask !== '') {
      console.log(this.newTask);
      const nTodo = await todoServ.aggiungi({
        title: this.newTask as string,
        completed: false,
      });
      this.task.push(nTodo);
      this.newTask = '';
    } else {
      alert('Inserisci una task!');
    }
  }
  async completeTask(todo: Todo, i: number) {
    await todoServ.update({ completed: true }, todo.id);
    this.task.splice(i, 1);
  }
}
