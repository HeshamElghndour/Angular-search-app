import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {observable, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  constructor(private http: HttpClient) { }


  getRepositories(name: string): Observable<Object> {
    const url = this.getSearchInRepositoriesUrl(name);

    return this.http.get(url);
  }

  private getSearchInRepositoriesUrl(name: string): string {
    return `https://api.github.com/search/repositories?q=${name}&per_page=30`;
  }

}
