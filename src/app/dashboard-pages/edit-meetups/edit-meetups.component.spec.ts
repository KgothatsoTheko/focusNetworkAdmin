import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMeetupsComponent } from './edit-meetups.component';

describe('EditMeetupsComponent', () => {
  let component: EditMeetupsComponent;
  let fixture: ComponentFixture<EditMeetupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMeetupsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditMeetupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
