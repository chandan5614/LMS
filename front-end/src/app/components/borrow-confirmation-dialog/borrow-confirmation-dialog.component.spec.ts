import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowConfirmationDialogComponent } from './borrow-confirmation-dialog.component';

describe('BorrowConfirmationDialogComponent', () => {
  let component: BorrowConfirmationDialogComponent;
  let fixture: ComponentFixture<BorrowConfirmationDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BorrowConfirmationDialogComponent]
    });
    fixture = TestBed.createComponent(BorrowConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
