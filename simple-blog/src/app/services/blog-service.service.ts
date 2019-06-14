import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BlogServiceService {
  private serverEndpoint = `http://localhost:2110/server/`;

  constructor(private httpClient: HttpClient) {
  }

  /**
   * Métode d'envoi de requête GET
   * @param path chemin sur le serveur
   */
  public getRequest(path: string) {
    return this.httpClient.get(this.serverEndpoint + path);
  }

  /**
   * Métode d'envoi de requête POST
   * @param path chemin sur le serveur
   * @param data Corps de la requête
   */
  public postRequest(path: string, data: any) {
    return this.httpClient.post(`${this.serverEndpoint}${path}`, data);
  }

  /**
   * Métode d'envoi de requête PUT
   * @param path chemin sur le serveur
   * @param data Corps de la requête
   */
  public putRequest(path: string, data: any) {
    return this.httpClient.put(`${this.serverEndpoint}${path}`, data);
  }


  /**
   * Métode d'envoi d'un formulaire'
   */
  public submitForm(uri: string, requestBody: {}, method: string): Observable<any> {
    let serverResponse = null;
    switch (method) {
      case 'POST':
        serverResponse = this.postRequest(uri, requestBody);
        break;
      case 'PUT':
        serverResponse = this.putRequest(uri, requestBody);
        break;
    }
    return serverResponse;
  }

  /**
   * Métode d'envoi de requête DELETE
   * @param path chemin sur le serveur
   */
  public deleteRequest(path: string) {
    return this.httpClient.delete(`${this.serverEndpoint}${path}`);
  }
}
