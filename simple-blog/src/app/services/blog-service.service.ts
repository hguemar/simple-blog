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

  public getRequest(path: string) {
    return this.httpClient.get(this.serverEndpoint + path);
  }

  public postRequest(path: string, data: any) {
    return this.httpClient.post(`${this.serverEndpoint}${path}`, data);
  }

  public putRequest(path: string, data: any) {
    return this.httpClient.put(`${this.serverEndpoint}${path}`, data);
  }

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

  public deleteRequest(path: string) {
    return this.httpClient.delete(`${this.serverEndpoint}${path}`);
  }
}
