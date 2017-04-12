import { CrossOverPage } from './app.po';

describe('cross-over App', function() {
  let page: CrossOverPage;

  beforeEach(() => {
    page = new CrossOverPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
