import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable} from 'rxjs';
import {map, startWith, shareReplay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  constructor(private http: HttpClient) { }
  repos;

  getRepositories(name: string, pageNumber: number): Observable<Object> {
    const searchKey = `${name}_${pageNumber}`;
    const url = this.getSearchInRepositoriesUrl(name, pageNumber);
    
    this.repos = this.http.get(url).pipe(shareReplay(1));
    this.repos.subscribe(data => {
      localStorage.setItem(searchKey, JSON.stringify(data));
    })
    
    if (localStorage.getItem(searchKey)) {
      this.repos = this.repos.pipe(
        startWith(JSON.parse(localStorage.getItem(searchKey)))
      );
    } 
    // else {
    //   this.repos = this.repos.pipe(
    //     startWith(JSON.parse(localStorage[CACHE_KEY] || '[]'))
    //   )
    // }
    return this.repos;
  }

  private getSearchInRepositoriesUrl(name: string, pageNumber: number): string {
    return `https://api.github.com/search/repositories?q=${name}&page=${pageNumber}&per_page=10`;
  }
}
