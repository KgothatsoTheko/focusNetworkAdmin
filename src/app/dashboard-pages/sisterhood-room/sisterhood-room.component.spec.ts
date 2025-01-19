import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SisterhoodRoomComponent } from './sisterhood-room.component';

describe('SisterhoodRoomComponent', () => {
  let component: SisterhoodRoomComponent;
  let fixture: ComponentFixture<SisterhoodRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SisterhoodRoomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SisterhoodRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
