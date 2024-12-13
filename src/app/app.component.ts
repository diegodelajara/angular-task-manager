import { Component, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { TaskService } from './services/task.service';
import {MatTableModule} from '@angular/material/table';



interface Task {
  name: string;
  description: string;
  status: 'Pendiente' | 'En Proceso' | 'Completada';
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [MatTableModule],
})

export class AppComponent implements OnInit {
  tasks = new MatTableDataSource<Task>();
  taskForm: FormGroup;

  displayedColumns: string[] = ['name', 'description', 'status', 'actions'];

  constructor(
    private taskService: TaskService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.taskForm = this.fb.group({
      name: [''],
      description: [''],
      status: ['Pendiente']
    });
  }

  ngOnInit(): void {
    this.taskService.getTaskStream().subscribe({
      next: (task) => {
        const validTask: Task = {
          name: task.name,
          description: task.description,
          status: task.status as 'Pendiente' | 'En Proceso' | 'Completada'
        };
        this.tasks.data = [...this.tasks.data, validTask];
      },
      error: () => this.snackBar.open('Error fetching tasks', 'Close', { duration: 3000 })
    });
  }

  addTask(): void {
    const newTask: Task = this.taskForm.value;
    this.tasks.data = [...this.tasks.data, newTask];
    this.taskForm.reset({ status: 'Pendiente' });
  }

  removeTask(index: number): void {
    const updatedTasks = [...this.tasks.data];
    updatedTasks.splice(index, 1);
    this.tasks.data = updatedTasks;
  }
}
