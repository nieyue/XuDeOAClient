import { XuDeOAClientPage } from './app.po';

describe('xu-de-oaclient App', function() {
  let page: XuDeOAClientPage;

  beforeEach(() => {
    page = new XuDeOAClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
