import { Component, OnInit } from '@angular/core';
import { Todo } from '../interface/todo';
import * as todoServ from '../service/todos.service';

@Component({
  template: `
    <!--  <div class="container text-center">
      <h1 class="text-center">To do List</h1>
      <button class="btn btn-primary my-5" id="btnRic" (click)="funcRicerca()">
        {{ btnRicerca }}
      </button>

      <input
        class="d-none"
        type="text"
        placeholder="prova"
        id="input"
        [(ngModel)]="todo"
        [className]="inputTask ? 'd-block mx-auto w-50 text-center' : 'd-none'"
      />

      <p>{{ visualizza ? ricerca : '' }}</p>
      <ul class="list-group">

        <li *ngFor="let incarichi of todos; let i = index">
          {{ incarichi.title }}
          <button (click)="completeTask(incarichi, i)">prova</button>
        </li>
      </ul>
    </div> -->

    <div class="container mt-5">
      <div>
        <div class="row text-center">
          <input
            class="form-control mx-auto w-50 d-block"
            type="text"
            [(ngModel)]="newTask"
          />
          <button class="btn btn-primary w-50 d-block" (click)="aggiungi()">
            Aggiungi Task
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
                {{ t.title }}
                <button
                  class="btn btn-primary ms-5"
                  (click)="completeTask(t, i)"
                >
                  Completa
                </button>
              </li>
            </ul>
          </div>
        </ng-container>
        <ng-template #elseTemplate>
          <p>Recupero Tasks...</p>
        </ng-template>
      </div>

      <ng-template #elseNoTask>
        <p>Oops, non ci sono Task</p>
      </ng-template>
    </div>
  `,
  styles: [],
})
export class TodoComponent implements OnInit {
  /*  todo: any = '';
  todos!: Todo[];

  ricerca = 'Ricerca di Tasks...';
  btnRicerca = 'Ricerca Task';
  visualizza = false;
  inputTask = false;
  inputProva = <HTMLElement>document.querySelector('#input');
  btnRic = <HTMLElement>document.querySelector('#btnRic');

  constructor() {
    todoServ.get().then((todos) => {
      this.todos = todos;
    });

  }

  ngOnInit(): void {}

  funcRicerca() {
    if (this.visualizza === false) {
      this.visualizza = true;
      setTimeout(() => {
        this.btnRicerca = 'Aggiungi Task';
        return (this.ricerca = 'Nessun Incarico trovato');
      }, 2000);
    } else if (this.visualizza === true && this.inputTask === false) {
      this.inputTask = true;
    } else if (this.visualizza === true && this.inputTask === true) {
      todoServ.add(this.todo).then(() => {
        this.todo = '';
      });
    } else {
      alert('FINALMENTE HAI SMESSO DI NON FARE NULLA');
    }
  }

  async completeTask(todoro: Todo, i: number) {
    await todoServ.update({ completed: true }, todoro.id);
    console.log(this.todos);

  } */

  task!: Todo[];
  newTask!: string;

  constructor() {
    todoServ
      .get()
      .then((todos) => (this.task = todos.filter((todo) => !todo.completed)));
  }

  ngOnInit(): void {}

  async aggiungi() {
    if (this.newTask != undefined) {
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
