var fs = require('fs');
var express = require('express');
var router = express.Router();

router.get('/books', function (req, res) {
    fs.readFile('./src/files/data.json', 'utf-8', function (err, data) {
        if (err) {
            res.json({status: 'failed', msg: 'no books found'});
        } else {
            res.json({status: 'success', books: JSON.parse(data)});
        }
    })
});

router.get('/books-by-year/:year', function (req, res) {
    var year = req.params.year;
    var data = fs.readFileSync('./src/files/data.json', 'utf-8');
    var books = JSON.parse(data);
    var filteredBooks = books.filter(function (book) {
        if (year == 'ALL') return true;
        else return book.year == year;
    });
    res.json({status: 'success', books: filteredBooks});
});

router.post('/book', function(req, res) {
    var title = req.body.title,
        author = req.body.author,
        publisher = req.body.publisher,
        year = req.body.year,
        isbn = req.body.isbn;

    if (!title || !author || !publisher || !year || !isbn) {
        res.status(400).json({status: 'failed', msg: 'title, author, publisher, year and isbn are required.'});
        return;
    }
    
    var dataText = fs.readFileSync('./src/files/data.json', 'utf-8');
    var data = JSON.parse(dataText);
    var id = 1;
    if (data.length > 0) {
        id = data[data.length-1].id + 1;
    }
    
    var bookData = {
        id: id,
        title: title,
        author: author,
        publisher: publisher,
        year: year,
        isbn: isbn
    }

    data.push(bookData);

    fs.writeFileSync('./src/files/data.json', JSON.stringify(data, null, 4));
    res.json({status: 'success', msg: 'The book is added successfully!'});
});

router.put('/book', function(req, res) {
    var id = req.body.id,
        title = req.body.title,
        author = req.body.author,
        publisher = req.body.publisher,
        year = req.body.year,
        isbn = req.body.isbn;

    if (!title || !author || !publisher || !year || !isbn) {
        res.status(400).json({status: 'failed', msg: 'title, author, publisher, year and isbn are required.'});
        return;
    }
    
    var dataText = fs.readFileSync('./src/files/data.json', 'utf-8');
    var data = JSON.parse(dataText);
    
    // find book with id
    var book = undefined;
    for (var i = 0; i < data.length; ++i) {
        if (data[i].id === parseInt(id)) {
            book = data[i];
            break;
        }
    }

    if (book) {
        book.title = title;
        book.author = author;
        book.publisher = publisher;
        book.year = year;
        book.isbn = isbn;
    }

    fs.writeFileSync('./src/files/data.json', JSON.stringify(data, null, 4));

    res.json({status: 'success', msg: 'The book is updated successfully!'});
});

router.delete('/book/:id', function(req, res) {
    var id = parseInt(req.params.id);

    var dataText = fs.readFileSync('./src/files/data.json', 'utf-8');
    var data = JSON.parse(dataText);

    data = data.filter(function (book) {
        return book.id !== id;
    });

    fs.writeFileSync('./src/files/data.json', JSON.stringify(data, null, 4));
    res.json({status: 'success', msg: 'The book was deleted.'});
});

module.exports = router;
