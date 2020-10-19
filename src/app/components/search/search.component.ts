import { Component, ViewChild, OnInit } from '@angular/core';
import {GithubService} from '../../services/github.service';
import {MatAccordion} from '@angular/material/expansion';



@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  ngOnInit(): void {
  }

  @ViewChild(MatAccordion) accordion: MatAccordion;

  title = 'search-app';
  results:any = [];
  pageNumber:number = 1;
  showPagination:boolean = false;

  constructor(private githubService: GithubService) {}

  prevPage(searchQuery) {
    this.pageNumber -= 1;
    this.gitSearchResults(searchQuery, this.pageNumber);
  }
  
  nextPage(searchQuery) {
    this.pageNumber += 1;
    this.gitSearchResults(searchQuery, this.pageNumber);
  }


  gitSearchResults(searchQuery, pageNumber?:number) {
    if (searchQuery.value.length == 0) return;
    this.githubService.getRepositories(searchQuery.value, this.pageNumber).subscribe(data => {
      this.results = data['items'];
      this.showPagination = true;
    })
  }

}