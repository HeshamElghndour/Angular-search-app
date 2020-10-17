import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {observable, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  constructor(private http: HttpClient) { }


  getRepositories(name: string, pageNumber: number): Observable<Object> {
    const url = this.getSearchInRepositoriesUrl(name, pageNumber);

    return this.http.get(url);
  }

  private getSearchInRepositoriesUrl(name: string, pageNumber: number): string {
    return `https://api.github.com/search/repositories?q=${name}&page=${pageNumber}&per_page=10`;
  }

}
