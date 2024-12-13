import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';


describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatTableModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,NoopAnimationsModule,AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have one input for create task name`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.displayedColumns[0]).toEqual("name");
  });

  it(`should create new row on table when clicking on add task button`, async() => {
    const fixture = TestBed.createComponent(AppComponent);
    const nameInput = fixture.debugElement.query(By.css('input[formControlName="name"]')).nativeElement;
    const descriptionInput = fixture.debugElement.query(By.css('input[formControlName="description"]')).nativeElement;
    const statusInput = fixture.debugElement.query(By.css('input[formControlName="status"]')).nativeElement;
    const addButton = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;


    nameInput.value = 'Tarea de prueba';
    descriptionInput.value = 'Descripción de prueba';
    statusInput.value = 'Pendiente';

    nameInput.dispatchEvent(new Event('input'));
    descriptionInput.dispatchEvent(new Event('input'));
    statusInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    addButton.click();
    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(By.css('table tbody tr'));
    expect(rows.length).toBe(1);
    const cells = rows[0].queryAll(By.css('td'));
    console.log(fixture.debugElement.nativeElement.innerHTML);


    // expect(cells[0].nativeElement.textContent.trim()).toBe('Tarea de prueba');
    // expect(cells[1].nativeElement.textContent).toBe('Descripción de prueba');
    // expect(cells[2].nativeElement.textContent).toBe('Pendiente');


  });
});
