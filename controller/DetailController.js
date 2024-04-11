window.DetailController = function ($scope, $routeParams, $compile) {
    var apiUrl = "http://localhost:3000/products";
    var categoriesUrl = "http://localhost:3000/category"; // URL để lấy danh sách category
    var products = null;
    var categories = null;
    var id = $routeParams.id;

    // Function to get category name based on ID
    var getCategoryName = function(categoryId) {
        var category = categories.find(c => c.id === categoryId);
        return category ? category.name : '';
    };

    // Function to get data
    var getData = function(){
        // Lấy danh sách sản phẩm
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                products = data;
                // Sau khi lấy danh sách sản phẩm, gọi hàm để lấy danh sách danh mục
                getCategories();
            })
            .catch(function(error) {
                console.error('Error!', error);
                // Handle error if needed
            });
    };

    // Function to get categories
    var getCategories = function() {
        // Lấy danh sách danh mục
        fetch(categoriesUrl)
            .then(response => response.json())
            .then(data => {
                categories = data;
                // Sau khi lấy danh sách danh mục, hiển thị chi tiết sản phẩm
                showDetail();
            })
            .catch(function(error) {
                console.error('Error!', error);
                // Handle error if needed
            });
    };

   // Function to display product detail
    var showDetail = function() {
    let detail = document.querySelector('.detail');
    let listProduct = document.querySelector('.listProduct');
    let thisProduct = products.find(value => value.id == id);

    if (!thisProduct) {
        window.location.href = "/";
    }

    detail.querySelector('.image img').src = thisProduct.image;
    detail.querySelector('.name').innerText = thisProduct.name;
    detail.querySelector('.category').innerText = getCategoryName(thisProduct.category); // Thay đổi hiển thị ID thành tên danh mục
    detail.querySelector('.price').innerText = `${thisProduct.price.toLocaleString('vi-VN')} VNĐ`; // Sử dụng cú pháp của JavaScript để định dạng số và thêm ký hiệu VNĐ
    detail.querySelector('.description').innerText = thisProduct.description;

    listProduct.addEventListener('mouseover', function(event) {
        let targetProduct = event.target.closest('.item');
        if (targetProduct) {
            let productId = targetProduct.dataset.productId;
            let productToShow = products.find(product => product.id == productId);
            if (productToShow) {
                detail.querySelector('.image img').src = productToShow.image;
                detail.querySelector('.name').innerText = productToShow.name;
                detail.querySelector('.category').innerText = getCategoryName(productToShow.category);
                detail.querySelector('.price').innerText = formatCurrency(productToShow.price);
                detail.querySelector('.description').innerText = productToShow.description;
            }
        }
    });
    
    // Function to format currency
    function formatCurrency(price) {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    }
    
    

    (products.filter(value => value.id != id)).forEach(product => {
        let newProduct = document.createElement('a');
        newProduct.href = `#!/shop/detail_product/${product.id}`; // Thay đổi đường dẫn
        newProduct.classList.add('item');
        newProduct.setAttribute('ng-click', `onDetail(${product.id})`);
        newProduct.innerHTML = `
            <img src="${product.image}" alt="">
            <h2>${product.name}</h2>
            <div class="price">{{ ${product.price} | number }} VNĐ</div>`; // Sử dụng cú pháp của AngularJS để hiển thị giá tiền tệ
        listProduct.appendChild(newProduct);
    });

    angular.element(listProduct).injector().invoke(['$compile', '$rootScope', function ($compile, $rootScope) {
        $compile(listProduct)($rootScope);
        $rootScope.$digest();
    }]);

    $compile(listProduct)($scope);
    };


    
    // Call the getData function to fetch and display product details
    getData();
};
