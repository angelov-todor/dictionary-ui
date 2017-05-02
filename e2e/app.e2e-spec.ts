import { DictionaryUiPage } from './app.po';

describe('dictionary-ui App', () => {
  let page: DictionaryUiPage;

  beforeEach(() => {
    page = new DictionaryUiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
