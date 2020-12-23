var app = angular.module('addBookApp', []);
app.controller('addBookController', function($scope, $http) {
    $scope.hideStatus = true;
    $scope.addBook = function() {
        $http({
            method: 'POST',
            url: BASE_URL + '/book',
            data: {
                'title': $scope.title,
                'author': $scope.author,
                'publisher': $scope.publisher,
                'year': $scope.year,
                'isbn': $scope.isbn
            }
        }).then(function(res) {
            if (res.statusText === 'OK') {
                $scope.title = '';
                $scope.author = '';
                $scope.publisher = '';
                $scope.year = '';
                $scope.isbn = '';
                $scope.status = 'The book is successfully added!';
            } else {
                $scope.status = res.statusText;
            }
        }, function(res) {
            $scope.status = res.data.msg;
        });
    };
});
