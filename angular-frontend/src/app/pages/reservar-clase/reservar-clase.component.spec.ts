import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservarClaseComponent } from './reservar-clase.component';

describe('ReservarClaseComponent', () => {
  let component: ReservarClaseComponent;
  let fixture: ComponentFixture<ReservarClaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservarClaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservarClaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
