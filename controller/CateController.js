window.CateController = function($scope, $http) {
    var apiUrl = 'http://localhost:3000/category';
    var statusUrl = 'http://localhost:3000/status'; 
  
    $scope.category = [];
    $scope.editCategory = {};
    $scope.status = [];
    $scope.kiemTraDuLieu = {};
    $scope.nextId = 1; // Biến đếm ID
  
    var getStatus = function() {
        $http.get(statusUrl).then(function(response) {
            if(response.status == 200) {
                $scope.status = response.data;
            }
        });
    };
  
    var getCategory = function() {
        $http.get(apiUrl).then(function(response){
            if(response.status == 200){
                $scope.category = response.data;
                if ($scope.category.length === 0) { // Kiểm tra nếu danh sách danh mục trống
                    $scope.nextId = 1; // Reset giá trị nextId về 1 nếu danh sách trống
                } else {
                    // Xác định ID lớn nhất và tăng giá trị nextId
                    var maxId = Math.max.apply(Math, $scope.category.map(function(category) { return category.id; }));
                    $scope.nextId = maxId + 1;
                }
                getStatus();
            }
        });
    };
  
    getCategory();
  
    $scope.onEdit = function(id) {
        getEditCategory(id);
    };
  
    var getEditCategory = function(id) {
        $http.get(apiUrl + "/" + id).then(function(response){
            if(response.status == 200){
                $scope.editCategory = response.data;
                $('#editModal').modal('show');
            }
        });
    };
  
    $scope.onAdd = function() {
        $scope.inputValue = {};
        $('#addModal').modal('show');
    };
  
    $scope.confirmAdd = function () {
        if (!$scope.inputValue || !$scope.inputValue.image || !$scope.inputValue.name || !$scope.inputValue.status) {
            $scope.kiemTraDuLieu.image = true;
            $scope.kiemTraDuLieu.name = true;
            $scope.kiemTraDuLieu.status = true;
            return; // Dừng hàm nếu dữ liệu không hợp lệ
        }
    
        // Gán id mới cho danh mục
        $scope.inputValue.id = $scope.nextId;
    
        $http.post(apiUrl, $scope.inputValue)
            .then(function(response) {
                if(response.status !== 200) {
                    getCategory();
                    alert("Đã thêm danh mục mới thành công!");
                    $('#addModal').modal('hide');
                }
               
            })
            .catch(function (error) {
                console.log("Lỗi khi thêm danh mục mới:", error);
                if(error.status !== 200) { // Kiểm tra nếu trạng thái lỗi không phải 200 (không phải lỗi khi thêm mới)
                    alert("Đã xảy ra lỗi khi thêm danh mục mới. Vui lòng thử lại sau.");
                }
            });
    };
    
    
    $scope.confirmEdit = function () {
        $http({
            method: "PUT",
            url: apiUrl + "/" + $scope.editCategory.id,
            data: $scope.editCategory 
        })
        .then(function () {
            getCategory();
            alert("Bạn đã chỉnh sửa thành công!");
            $('#editModal').modal('hide');
        })
        .catch(function (error) {
            console.log("Lỗi khi cố gắng cập nhật danh mục:", error);
            alert("Đã xảy ra lỗi khi cố gắng cập nhật danh mục. Vui lòng thử lại sau.");
        });
    };
  
    $scope.confirmDelete = function () {
        if ($scope.idDelete) {
            $http({
                method: "DELETE",
                url: apiUrl + "/" + $scope.idDelete 
            })
            .then(function () {
                getCategory();
                alert("Bạn đã xóa thành công");
            })
            .catch(function (error) {
                console.log("Lỗi khi xóa danh mục:", error);
                alert("Đã xảy ra lỗi khi xóa danh mục. Vui lòng thử lại sau.");
            });
        } else {
            console.log("ID xóa không hợp lệ.");
        }
    };
    
    
    
    
  
    $scope.saveId = function (id) {
        $scope.idDelete = id;
    };
  
    $scope.getStatusName = function(statusId) {
        var statusName = '';
        angular.forEach($scope.status, function(status) {
            if(status.id === statusId) {
                statusName = status.name;
            }
        });
        return statusName;
    };

    
  };
  