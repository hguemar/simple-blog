import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogAccueilComponent } from './blog-accueil.component';

describe('BlogAccueilComponent', () => {
  let component: BlogAccueilComponent;
  let fixture: ComponentFixture<BlogAccueilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogAccueilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogAccueilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
