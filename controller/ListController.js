window.ListController = function($scope, $http) {
    var apiUrl = 'http://localhost:3000/products';
    var categoryUrl = 'http://localhost:3000/category';
    $scope.products = [];
    $scope.detailProducts = [];
    $scope.editProduct = [];
    $scope.categories = [];
    $scope.dataLoaded = false; // Biến để kiểm tra xem dữ liệu đã được tải hoàn toàn hay chưa
    $scope.currentPage = 1;
    $scope.productsPerPage = 5; // Số lượng sản phẩm trên mỗi trang
    $scope.totalPages = 1;

    // Hàm lấy danh sách sản phẩm
    var getProducts = function() {
        $http.get(apiUrl).then(function(response) {
            if(response.status == 200) {
                $scope.products = response.data;
                $scope.totalPages = Math.ceil($scope.products.length / $scope.productsPerPage);
                getCategories();
            }
        });
    };

    // Hàm lấy danh sách category
    var getCategories = function() {
        $http.get(categoryUrl).then(function(response) {
            if(response.status == 200) {
                $scope.categories = response.data;
                
            }
        });
    };

    // Hàm lấy tên của category dựa trên id
    $scope.getCategoryName = function(categoryId) {
        var categoryName = '';
        angular.forEach($scope.categories, function(category) {
            if(category.id === categoryId) {
                categoryName = category.name;
            }
        });
        return categoryName;
    };

    // Gọi hàm lấy danh sách sản phẩm khi controller được khởi tạo
    getProducts();

    // Chuyển hướng đến chi tiết sản phẩm
    $scope.onDetail = function(id) {
        getProductDetail(id);
    };

    // Lấy chi tiết sản phẩm
    var getProductDetail = function(id) {
        $http.get(apiUrl + "/" + id).then(function(response) {
            if(response.status == 200) {
                $scope.detailProducts = response.data;
                $scope.dataLoaded = true; // Đặt biến boolean thành true khi dữ liệu đã được tải xong
                // Hiển thị modal sau khi dữ liệu đã được tải hoàn toàn
                $('#detailModal').modal('show');
            }
        });
    };

    // Chuyển hướng đến sửa sản phẩm
    $scope.onEdit = function(id) {
        getEditProduct(id);
    };

    // Hàm lấy thông tin sản phẩm cần chỉnh sửa
    var getEditProduct = function(id) {
        $http.get(apiUrl + "/" + id).then(function(response){
            if(response.status == 200){
                $scope.editProduct = response.data;
                $scope.dataLoaded = true; // Đặt biến boolean thành true khi dữ liệu đã được tải xong
                // Hiển thị modal sau khi dữ liệu đã được tải hoàn toàn
                $('#editModal').modal('show');
            }
        });
    };

    // Xác nhận chỉnh sửa sản phẩm
    $scope.confirmEdit = function () {
        $http({
            method: "PUT",
            url: apiUrl + "/" + $scope.editProduct.id,
            data: $scope.editProduct // Gửi thông tin sản phẩm đã chỉnh sửa đến API
        })
        .then(function () {
            // Chỉnh sửa thành công, cập nhật lại danh sách sản phẩm
            getProducts();
            alert("Bạn đã chỉnh sửa thành công!");
        })
        .catch(function () {
            console.log("Lỗi API");
        });
    };

    // Xác nhận xóa sản phẩm
    $scope.confirmDelete = function () {
        $http({
            method: "DELETE",
            url: apiUrl + "/" + $scope.idDelete // Sử dụng apiUrl
        })
        .then(function () {
            // Xóa thành công, cập nhật lại danh sách sản phẩm
            getProducts();
            alert("Bạn đã xóa thành công");
        })
        .catch(function () {
            console.log("Lỗi API");
        });
    };

    // Lưu ID sản phẩm cần xóa
    $scope.saveId = function (id) {
        $scope.idDelete = id;
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
};
