import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasehistComponent } from './purchasehist.component';

describe('PurchasehistComponent', () => {
  let component: PurchasehistComponent;
  let fixture: ComponentFixture<PurchasehistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchasehistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchasehistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
