import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPeminjamanComponent } from './detail-peminjaman.component';

describe('DetailPeminjamanComponent', () => {
  let component: DetailPeminjamanComponent;
  let fixture: ComponentFixture<DetailPeminjamanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailPeminjamanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailPeminjamanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
