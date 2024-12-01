import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMentorComponent } from './add-mentor.component';

describe('AddMentorComponent', () => {
  let component: AddMentorComponent;
  let fixture: ComponentFixture<AddMentorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMentorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMentorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
