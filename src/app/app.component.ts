import { Component } from '@angular/core';
import {GithubService} from './services/github.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'search-app';

  results:any = []; 

  constructor(private githubService: GithubService) {}

  gitSearchResults(searchValue: string) {
    this.githubService.getRepositories(searchValue).subscribe(data => {
      console.log(data);
      this.results = data['items'];
    })
  }
}
