import {Component, OnInit} from '@angular/core';
import {BlogServiceService} from "../../services/blog-service.service";

@Component({
  selector: 'app-blog-accueil',
  templateUrl: './blog-accueil.component.html',
  styleUrls: ['./blog-accueil.component.css']
})
export class BlogAccueilComponent implements OnInit {

  constructor(private callServer: BlogServiceService) {
  }

  ngOnInit() {
    const uri = 'posts';
    const serverResponse = this.callServer.getRequest(uri);
    serverResponse.subscribe(
      (resp) => {
        console.log(resp);
      },
      (err) => {
        console.error(err);
      });
  }

}
