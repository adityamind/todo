import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDrawerComponent } from './card-drawer.component';

describe('CardDrawerComponent', () => {
  let component: CardDrawerComponent;
  let fixture: ComponentFixture<CardDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardDrawerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
