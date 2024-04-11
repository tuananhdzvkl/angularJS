window.ShopController = function($scope, $http, $location){
    var apiUrl = 'http://localhost:3000/products';
    $scope.products = [];
    $scope.currentPage = 1;
    $scope.productsPerPage = 8; // Số lượng sản phẩm trên mỗi trang
    $scope.totalPages = 1;
    
    // Hàm lấy danh sách sản phẩm
    var getProducts = function() {
        $http.get(apiUrl).then(function(response){
            if(response.status == 200){
                $scope.products = response.data;
                $scope.totalPages = Math.ceil($scope.products.length / $scope.productsPerPage); // Cập nhật totalPages
            }
        });
    };
    
    // Gọi hàm lấy danh sách sản phẩm khi controller được khởi tạo
    getProducts();
    $scope.sectionText = "Shop"; // Đoạn chữ mặc định trong section

    $scope.onDetail = function(id){
        $location.path(`shop/detail_product/${id}`);
    };

    $scope.calculateIndexes = function() {
        var startIndex = ($scope.currentPage - 1) * $scope.productsPerPage;
        var endIndex = Math.min(startIndex + $scope.productsPerPage, $scope.products.length); // Kiểm tra endIndex
        return [startIndex, endIndex];
    };
    
    $scope.getPageNumbers = function() {
        var pageNumbers = [];
        for (var i = 1; i <= $scope.totalPages; i++) {
            pageNumbers.push(i);
        }
        return pageNumbers;
    };
}