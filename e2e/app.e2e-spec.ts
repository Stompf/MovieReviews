import { MovieReviewsPage } from './app.po';

describe('movie-reviews App', () => {
  let page: MovieReviewsPage;

  beforeEach(() => {
    page = new MovieReviewsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
