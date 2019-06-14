import {Component, OnInit} from '@angular/core';
import {BlogServiceService} from "../../services/blog-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Tools} from "../../classes/Tools";


@Component({
  selector: 'app-blog-article',
  templateUrl: './blog-article.component.html',
  styleUrls: ['./blog-article.component.css']
})
export class BlogArticleComponent implements OnInit {
  private readonly postID: string;
  public sTitle = "";
  public sAuthor = "";
  public sResume = "";
  public sContent = "";
  public sDate: string = "";
  private sTypePage: string;
  private readonly isUpdate: boolean;


  constructor(private callServer: BlogServiceService,
              private route: ActivatedRoute,
              private router: Router) {
    this.postID = this.route.snapshot.paramMap.get('postid');
    // Si l'ID est null, alors on est dans le cas d'un ajout de fiche
    this.sTypePage = this.postID === null ? "ADD" : "EDIT";
    this.isUpdate = this.sTypePage.localeCompare("EDIT") === 0;
  }

  ngOnInit() {
    if (this.sTypePage.localeCompare("EDIT") === 0) {
      // Dans le cas d'un update d'un article on récupère l'article depuis la base de données
      const serverResponse = this.callServer.getRequest(`posts/${this.postID}`);
      serverResponse.subscribe(
        (resp: any) => {
          if (resp === null) {
            // Si la reponse est nulle on retourne automatiquement sur la page d'accueil
            // Evite de passer n'importe quel ID dans l'URL
            this.router.navigate([`/accueil`]).catch(err => console.error(err));
            return;
          }
          this.sTitle = resp.title;
          this.sDate = resp.date;
          this.sAuthor = resp.author;
          this.sResume = resp.resume;
          this.sContent = resp.content || "";
        },
        (error) => {
          console.error(error);
        });
    }
  }

  /**
   * Méthode d'envoi d'un formulaire
   */
  public submitForm(): void {
    // Si l'ID est nul alors on est en ajout d'un article
    const uri = this.sTypePage.localeCompare("ADD") === 0 ? 'posts' : `posts/${this.postID}`;
    const method = this.sTypePage.localeCompare("ADD") === 0 ? 'POST' : `PUT`;
    // Controle des champs requis
    if (this.controlForm(this.sTitle, 'title') < 0) return;
    if (this.controlForm(this.sAuthor, 'author') < 0) return;
    this.sDate = this.sTypePage.localeCompare("ADD") === 0 ? Tools.getCurrentDate() : this.sDate;
    const requestBody = {
      title: this.sTitle,
      author: this.sAuthor,
      date: this.sDate,
      resume: this.sResume,
      content: this.sContent,
    };
    const serverResponse = this.callServer.submitForm(uri, requestBody, method);
    serverResponse.subscribe(
      (response) => {
        if (response.result === 1) {
          // si le résultat est vrai, alors on redirige sur la page de modification de l'article en cours ou l'article crée
          this.router.navigate([`/article/${response.id}`]).catch(err => console.error(err));
        }
      },
      (error) => {
        console.error(error);
      });
  }

  /**
   * Controle les champs qui sont requis dans l'applications
   * @param content
   * @param id
   */
  private controlForm = (content: string, id: string): number => {
    if (content.localeCompare("") === 0) {
      alert("Les champs avec * sont obligatoires ");
      document.getElementById(id).focus();
      return -1;
    } else {
      return 0
    }

  };

  /**
   * Méthode d'envoi d'une requête DELETE pour supprimer un article
   */
  deletePost() {
    const serverResponse = this.callServer.deleteRequest(`posts/${this.postID}`);
    serverResponse.subscribe(
      (response: any) => {
        if (response.result === 1) {
          alert("Article supprimé");
          this.router.navigate([`/accueil`]).catch(err => console.error(err));
        }

      },
      (error) => {
        console.log(error);
      });
  }

  public get getIsUpdate(): boolean {
    return this.isUpdate;
  }
}
