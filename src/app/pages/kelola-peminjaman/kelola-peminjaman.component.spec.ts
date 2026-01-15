import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KelolaPeminjamanComponent } from './kelola-peminjaman.component';

describe('KelolaPeminjamanComponent', () => {
  let component: KelolaPeminjamanComponent;
  let fixture: ComponentFixture<KelolaPeminjamanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KelolaPeminjamanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KelolaPeminjamanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
