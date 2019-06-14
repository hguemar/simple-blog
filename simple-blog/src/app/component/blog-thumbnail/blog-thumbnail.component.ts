import {Component, OnInit} from '@angular/core';
import {BlogServiceService} from '../../services/blog-service.service';
import {BlogPageService} from '../../services/blog-page.service';

@Component({
  selector: 'app-blog-thumbnail',
  templateUrl: './blog-thumbnail.component.html',
  styleUrls: ['./blog-thumbnail.component.css']
})
export class BlogThumbnailComponent implements OnInit {
  breakpoint: number;
  private posts: [];
  // pager object
  public pager: any = {};

  // paged items
  public pagedItems: any[];


  constructor(private callServer: BlogServiceService, private pagerService: BlogPageService) {
  }

  ngOnInit() {
    this.resize(window.innerWidth);
    const uri = 'posts';
    const serverResponse = this.callServer.getRequest(uri);
    serverResponse.subscribe(
      (resp: []) => {
        this.posts = resp;
        // initialize to page 1
        this.setPage(1);
      },
      (err) => {
        console.error(err);
      });
  }

  public get getPosts(): any {
    return this.posts;
  }

  private resize(innerWidth): void {
    if (innerWidth < 1400) {
      this.breakpoint = 3;
      if (innerWidth < 850) {
        this.breakpoint = 2;
        if (innerWidth < 600) {
          this.breakpoint = 1;
        }
      }
    } else {
      this.breakpoint = 4;
    }
  }

  onResize(event: any) {
    console.clear();
    const innerWidth = event.target.innerWidth;
    this.resize(innerWidth);
  }

  setPage(page: number) {
    // get pager object from service
    this.pager = this.pagerService.getPager(this.posts.length, page);

    // get current page of items
    this.pagedItems = this.posts.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
}
