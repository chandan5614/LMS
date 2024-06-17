import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalFooterComponent } from './global-footer.component';

describe('GlobalFooterComponent', () => {
  let component: GlobalFooterComponent;
  let fixture: ComponentFixture<GlobalFooterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GlobalFooterComponent]
    });
    fixture = TestBed.createComponent(GlobalFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
