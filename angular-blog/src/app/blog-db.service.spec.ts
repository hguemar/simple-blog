import { TestBed } from '@angular/core/testing';

import { BlogDbService } from './blog-db.service';

describe('BlogDbService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BlogDbService = TestBed.get(BlogDbService);
    expect(service).toBeTruthy();
  });
});
