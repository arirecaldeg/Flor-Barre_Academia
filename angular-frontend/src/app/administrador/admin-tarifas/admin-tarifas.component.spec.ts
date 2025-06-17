import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTarifasComponent } from './admin-tarifas.component';

describe('AdminTarifasComponent', () => {
  let component: AdminTarifasComponent;
  let fixture: ComponentFixture<AdminTarifasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminTarifasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminTarifasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
