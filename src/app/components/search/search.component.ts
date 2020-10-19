import { Component, ViewChild, OnInit } from '@angular/core';
import {GithubService} from '../../services/github.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  ngOnInit(): void {}
  constructor(private githubService: GithubService) {}

  results:any = [];
  pageNumber:number = 1;
  showPagination:boolean = false;


  prevPage(searchQuery) {
    if (this.pageNumber <= 1) return;
    this.pageNumber -= 1;
    this.gitSearchResults(searchQuery, this.pageNumber);
  }
  
  nextPage(searchQuery) {
    this.pageNumber += 1;
    this.gitSearchResults(searchQuery, this.pageNumber);
  }


  gitSearchResults(searchQuery, pageNumber?:number) {
    this.showPagination = false;
    if (searchQuery.value.length == 0) return;
    this.githubService.getRepositories(searchQuery.value, this.pageNumber).subscribe(data => {
      this.results = data['items'];
      this.showPagination = true;
    })
  }

}