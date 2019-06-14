import { TestBed } from '@angular/core/testing';

import { BlogPageService } from './blog-page.service';

describe('BlogPageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BlogPageService = TestBed.get(BlogPageService);
    expect(service).toBeTruthy();
  });
});
