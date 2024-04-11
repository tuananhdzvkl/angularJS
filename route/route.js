//muốn sử dụng được router trong angular js thì nhớ code đúng đoạn code sau
angular.module('appRouter',['ngRoute']).config(function($routeProvider){
    $routeProvider.when('/home',{ //định nghĩa route
        templateUrl: 'view/trangchu.html', //đường dẫn tới view
    })
    .when('/shop',{ //định nghĩa route
        templateUrl: 'view/product/shop.html', //đường dẫn tới view
        controller: ShopController,
    })
    .when('/list_category',{ //định nghĩa route
        templateUrl: 'view/category/list.html', //đường dẫn tới view
        controller: CateController,
    })
    .when('/list_category/edit_category/:id',{ //định nghĩa route
        templateUrl: 'view/category/list.html', //đường dẫn tới view
        controller: CateController,
    })
    .when('/list_product',{
        templateUrl: 'view/product/list.html',
        controller: ListController,
    })
    .when('/addProduct',{
        templateUrl: 'view/product/add.html',
        controller: AddController,
    })
    .when('/list_product/detail_product/:id',{
        templateUrl: 'view/product/list.html',
        controller: ListController,
    })
    .when('/shop/detail_product/:id',{
        templateUrl: 'view/product/detail.html',
        controller: DetailController,
    })
    .when('/list_product/edit_product/:id',{
        templateUrl: 'view/product/list.html',
        controller: ListController,
    })
    .when('/contact',{ //định nghĩa route
        templateUrl: 'view/contact.html', //đường dẫn tới view
    })
});