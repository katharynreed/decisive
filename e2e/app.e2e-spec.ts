import { DecisiveAppPage } from './app.po';

describe('decisive-app App', () => {
  let page: DecisiveAppPage;

  beforeEach(() => {
    page = new DecisiveAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
