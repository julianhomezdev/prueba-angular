import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApodComponent } from './apod.component';

describe('ApodComponent', () => {
  let component: ApodComponent;
  let fixture: ComponentFixture<ApodComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApodComponent]
    });
    fixture = TestBed.createComponent(ApodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
