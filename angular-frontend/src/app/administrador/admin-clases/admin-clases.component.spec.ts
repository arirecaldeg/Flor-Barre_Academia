import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminClasesComponent } from './admin-clases.component';

describe('AdminClasesComponent', () => {
  let component: AdminClasesComponent;
  let fixture: ComponentFixture<AdminClasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminClasesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminClasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
