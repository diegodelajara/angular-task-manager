import { Injectable } from '@angular/core';
import { Observable, interval, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private taskIndex = 1;

  getTaskStream(): Observable<{ name: string; description: string; status: string }> {
    return interval(5000).pipe(
      map(() => ({
        name: `Tarea ${this.taskIndex++}`,
        description: 'Tarea auto-generada',
        status: 'Pendiente'
      })),
      catchError(() => {
        throw new Error('Error al crear tarea');
      })
    );
  }
}
