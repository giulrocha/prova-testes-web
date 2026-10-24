import homePage from '../support/pages/HomePage';
import productsPage from '../support/pages/ProductsPage';
import productDetailPage from '../support/pages/ProductDetailPage';

describe('Suíte 02: Catálogo de Produtos e Busca (Test Cases 8 e 9)', () => {
  beforeEach(() => {
    // 1. Launch browser & 2. Navigate to url
    homePage.visitHome();
  });

  it('Test Case 8: Verify All Products and product detail page', () => {
    // 3. Verify that home page is visible successfully
    homePage.verifyHomePageVisible();

    // 4. Click on 'Products' button
    homePage.clickProducts();

    // 5. Verify user is navigated to ALL PRODUCTS page successfully & 6. The products list is visible
    productsPage.verifyAllProductsPageVisible();

    // 7. Click on 'View Product' of first product
    productsPage.clickFirstProductView();

    // 8. User is landed to product detail page & 9. Verify details: name, category, price, availability, condition, brand
    productDetailPage.verifyProductDetailsVisible();
  });

  it('Test Case 9: Search Product', () => {
    const searchTerm = 'Dress';

    // 3. Verify that home page is visible successfully
    homePage.verifyHomePageVisible();

    // 4. Click on 'Products' button
    homePage.clickProducts();

    // 5. Verify user is navigated to ALL PRODUCTS page successfully
    productsPage.verifyAllProductsPageVisible();

    // 6. Enter product name in search input and click search button
    productsPage.searchProduct(searchTerm);

    // 7. Verify 'SEARCHED PRODUCTS' is visible & 8. Verify all the products related to search are visible
    productsPage.verifySearchedProductsVisible();
  });
});
