var app = angular.module('browseBooksApp', []);
app.controller('browseBooksController', function($scope, $http) {
    $scope.books = [];
    $scope.publishedYears = [];
    $scope.publishedYear = 'ALL';
    $scope.editFormIsShown = false;
    $scope.sortBy = 'id';

    $scope.getBooks = function() {
        $http({
            method: 'GET',
            url: BASE_URL + '/books',
        }).then(function(res) {
            $scope.books = res.data.books;

            var years = $scope.books.map(function (book) {
                return book.year;
            });

            // remove duplicate years
            years = [...new Set(years)];

            years.sort(function (a, b) {
                return a - b;
            });
            years.unshift('ALL');

            $scope.publishedYears = years;
        }, function(res) {
            console.log(res);
        });
    };

    $scope.getBooksByYear = function () {
        $http({
            method: 'GET',
            url: BASE_URL + '/books-by-year/' + $scope.publishedYear,
        }).then(function(res) {
            $scope.books = res.data.books;
        }, function(res) {
            console.log(res);
        });
    }
    
    $scope.getBooks();

    $scope.editBook = function (index) {
        var book = $scope.books[index];
        $scope.id = book.id;
        $scope.title = book.title;
        $scope.author = book.author;
        $scope.publisher = book.publisher;
        $scope.year = book.year;
        $scope.isbn = book.isbn;
        $scope.editFormIsShown = true;
    }

    $scope.updateBook = function() {
        $http({
            method: 'PUT',
            url: BASE_URL + '/book',
            data: {
                'id': $scope.id,
                'title': $scope.title,
                'author': $scope.author,
                'publisher': $scope.publisher,
                'year': $scope.year,
                'isbn': $scope.isbn
            }
        }).then(function(res) {
            if (res.data.status === 'success') {
                $scope.getBooks();
            } else {
                console.log(res.data);
            }
        }, function(res) {
            console.log(res);
        });

        $scope.editFormIsShown = false;
    };

    $scope.deleteBook = function (bookId) {
        $http({
            method: 'DELETE',
            url: BASE_URL + '/book/' + bookId,
        }).then(function(res) {
            if (res.data.status === 'success') {
                $scope.getBooks();
            } else {
                console.log(res.data.msg);
            }
        }, function(res) {
            console.log(res);
        });
    }

    $scope.sortBooks = function () {
        $scope.books.sort(function (a, b) {
            var propA = a[$scope.sortBy];
            var propB = b[$scope.sortBy];
            if (typeof propA === 'number') {
                return propA - propB;
            } else {
                if (propA.toLowerCase() < propB.toLowerCase()) return -1;
                else if (propA.toLowerCase() == propB.toLowerCase()) return 0;
                else return 1;
            }
        });
    }
});
