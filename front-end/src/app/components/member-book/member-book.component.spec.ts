import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberBookComponent } from './member-book.component';

describe('MemberBookComponent', () => {
  let component: MemberBookComponent;
  let fixture: ComponentFixture<MemberBookComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MemberBookComponent]
    });
    fixture = TestBed.createComponent(MemberBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
