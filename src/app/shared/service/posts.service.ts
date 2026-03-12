import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  POST_URL: string = environment.post_url;
  constructor(private _httpClient: HttpClient) {}

  getAllPost() {
    return this._httpClient.get(this.POST_URL);
  }
}
