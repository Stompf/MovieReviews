import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import * as $ from 'jquery';

import 'rxjs/add/operator/map';

@Injectable()
export class NYTimesService {
  private apiKey = '06d60b2fa5d74462963f4644d42fa78a';
  private http: Http;

  constructor(http: Http) {
    this.http = http;
  }


  getMovieReviewList(offset: number) {
    let url = 'https://api.nytimes.com/svc/movies/v2/reviews/all.json';
    url += '?' + $.param({
      'api-key': this.apiKey,
      'offset': offset,
      'order': 'by-publication-date'
    });

    return this.http.get(url).map(response => response.json() as NYTimes.Response);
  }

  searchMovieReview(query: string, offset: number) {
    let url = 'https://api.nytimes.com/svc/movies/v2/reviews/search.json';
    url += '?' + $.param({
      'api-key': this.apiKey,
      'query': query,
      'offset': offset
    });

    return this.http.get(url).map(response => response.json() as NYTimes.Response);
  }
}
