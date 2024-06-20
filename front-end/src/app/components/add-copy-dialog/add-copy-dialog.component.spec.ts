import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCopyDialogComponent } from './add-copy-dialog.component';

describe('AddCopyDialogComponent', () => {
  let component: AddCopyDialogComponent;
  let fixture: ComponentFixture<AddCopyDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCopyDialogComponent]
    });
    fixture = TestBed.createComponent(AddCopyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
