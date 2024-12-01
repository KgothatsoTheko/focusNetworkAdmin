import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMeetUpsComponent } from './add-meet-ups.component';

describe('AddMeetUpsComponent', () => {
  let component: AddMeetUpsComponent;
  let fixture: ComponentFixture<AddMeetUpsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMeetUpsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMeetUpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
