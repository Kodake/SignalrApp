import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StringToolsComponent } from './string-tools.component';

describe('StringToolsComponent', () => {
  let component: StringToolsComponent;
  let fixture: ComponentFixture<StringToolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StringToolsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StringToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
