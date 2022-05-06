import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Route } from '@angular/router';

import { AppComponent } from './app.component';
import { TodoComponent } from './pages/todo.component';
import { CompletatiPage } from './pages/completati.page';
import { NavbarComponent } from './components/navbar.component';

const routes: Route[] = [
  {
    path: '',
    component: TodoComponent,
  },
  {
    path: 'completed',
    component: CompletatiPage,
  },
];

@NgModule({
  declarations: [AppComponent, TodoComponent, CompletatiPage, NavbarComponent],
  imports: [BrowserModule, RouterModule.forRoot(routes), FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
