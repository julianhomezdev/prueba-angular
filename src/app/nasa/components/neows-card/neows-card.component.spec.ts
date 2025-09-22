import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeowsCardComponent } from './neows-card.component';

describe('NeowsCardComponent', () => {
  let component: NeowsCardComponent;
  let fixture: ComponentFixture<NeowsCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NeowsCardComponent]
    });
    fixture = TestBed.createComponent(NeowsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
