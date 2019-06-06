import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BlogServiceService {
  private serverEndpoint = `http://192.168.43.39:2110/server/`;

  constructor(private httpClient: HttpClient) {
  }

  public getRequest(path: string) {
    return this.httpClient.get(this.serverEndpoint + path);
  }

  postRequest(path: string, data: any) {

  };
}
