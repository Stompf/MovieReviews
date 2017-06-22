import { Component, OnInit } from '@angular/core';
import { NYTimesService } from './nytimes.service';

@Component({
  selector: 'app-root',
  providers: [NYTimesService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})

export class AppComponent implements OnInit {
  title = 'Movie reviews';

  listReviews: NYTimes.Result[];
  hasMore: boolean;
  offset: number;

  private nyTimesService: NYTimesService;
  private currentQuery: string;

  constructor(nyTimesService: NYTimesService) {
    this.nyTimesService = nyTimesService;
    this.listReviews = [];
    this.currentQuery = '';
  }

  ngOnInit() {
    this.offset = 0;
    this.currentQuery = '';
    this.searchOrListReviews();
  }

  onSearch(query: string = '') {
    this.offset = 0;
    this.currentQuery = query;
  }

  onNext() {
    this.offset += this.listReviews.length;
    this.searchOrListReviews();
  }

  onPrevious() {
    this.offset -= this.listReviews.length;

    if (this.offset < 0) {
      this.offset = 0;
    }
    this.searchOrListReviews();
  }

  private searchOrListReviews() {
    this.currentQuery === '' ?
      this.getNewestReviews(this.offset) :
      this.searchMovieReviews(this.currentQuery, this.offset);
  }

  private getNewestReviews(offset: number) {
    this.nyTimesService.getMovieReviewList(offset).subscribe(this.handleResponse);
  }

  private searchMovieReviews(query: string, offset: number) {
    this.nyTimesService.searchMovieReview(query, offset).subscribe(this.handleResponse);
  }

  private handleResponse = (response: NYTimes.Response) => {
    this.listReviews = response.results;
    this.hasMore = response.has_more;
  }
}
