var books = [];
var currentBookIndex = 0;

var app = angular.module('viewBooksApp', []);
app.controller('viewBooksController', function($scope, $http) {
    $scope.movies = [];

    $scope.getBooks = function() {
        $http({
            method: 'GET',
            url: BASE_URL + '/books'
        }).then(function(res) {
            console.log(res);
            console.log(res.data);
            if (res.data.status === 'success') {
                books = res.data.books;
                $scope.book = books[currentBookIndex];
                
                $scope.prevDisabled = currentBookIndex === 0 ? true : false;
                $scope.nextDisabled = currentBookIndex === books.length - 1 ? true : false;
            } else {
                $scope.addResults = res.data.msg;
            }
        }, function(res) {
            console.log(res);
        });
    };

    $scope.getBooks();

    $scope.getPreviousBook = function () {
        if (currentBookIndex > 0) {
            currentBookIndex--;
            $scope.book = books[currentBookIndex];
        }

        $scope.prevDisabled = currentBookIndex === 0 ? true : false;
        $scope.nextDisabled = currentBookIndex === books.length - 1 ? true : false;
    }

    $scope.getNextBook = function () {
        if (currentBookIndex < books.length - 1) {
            currentBookIndex++;
            $scope.book = books[currentBookIndex];
        }
        
        $scope.prevDisabled = currentBookIndex === 0 ? true : false;
        $scope.nextDisabled = currentBookIndex === books.length - 1 ? true : false;
    }
});
