import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetUpsComponent } from './meet-ups.component';

describe('MeetUpsComponent', () => {
  let component: MeetUpsComponent;
  let fixture: ComponentFixture<MeetUpsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeetUpsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeetUpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
