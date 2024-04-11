window.AddController = function($scope, $http, $location) {
    var apiUrl = "http://localhost:3000/products";
    var categoryUrl = "http://localhost:3000/category"; // URL API danh mục

    $scope.categories = []; // Mảng chứa danh sách danh mục

    // Kiểm tra dữ liệu có hợp lệ hay không
    $scope.kiemTraDuLieu = {
        id: false,
        name: false,
        image: false,
        price: false,
        category: false,
    };

    // Hàm lấy danh sách category
    var getCategories = function() {
        $http.get(categoryUrl).then(function(response) {
            if(response.status == 200) {
                $scope.categories = response.data;
            }
        });
    };

    getCategories();
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


    $scope.onSubmit = function() {
        let flag = false;
        if (!$scope.inputValue || !$scope.inputValue.id) {
            $scope.kiemTraDuLieu.id = true;
            flag = true;
        }
        if (!$scope.inputValue || !$scope.inputValue.name) {
            $scope.kiemTraDuLieu.name = true;
            flag = true;
        }
        if (!$scope.inputValue || !$scope.inputValue.image) {
            $scope.kiemTraDuLieu.image = true;
            flag = true;
        }
        if (!$scope.inputValue || !$scope.inputValue.price) {
            $scope.kiemTraDuLieu.price = true;
            flag = true;
        }
        if (!$scope.inputValue || !$scope.inputValue.category) {
            $scope.kiemTraDuLieu.category = true;
            flag = true;
        }
        if (!flag) {
            var newItem = {
                ...$scope.inputValue,
            };

            $http.post(apiUrl, newItem)
                .then(function(response) {
                    if (response.status == 201) {
                        $location.path('/product');
                    }
                });
        }
    };
}
