import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EyeMovementComponent } from './eye-movement.component';

describe('EyeMovementComponent', () => {
  let component: EyeMovementComponent;
  let fixture: ComponentFixture<EyeMovementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EyeMovementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EyeMovementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
