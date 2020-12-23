var fs = require('fs');
var express = require('express');
var router = express.Router();

import { Gamedata } from './models'

const mon
goDBURI="mongodb+srv://rishabh:rishabh@cluster0.cue6r.mongodb.net/videogames?retryWrites=true&w=majority";



router.get('/books', async function (req, res) {
    // fs.readFile('./src/files/data.json', 'utf-8', function (err, data) {
    //     if (err) {
    //         res.json({status: 'failed', msg: 'no books found'});
    //     } else {
    //         res.json({status: 'success', books: JSON.parse(data)});
    //     }
    // })
    try {
        const gameData = await Gamedata.find();
        if(gameData.length === 0) {
          return res.status(404).json({
            status: 404,
            data: 'There is no result at this time'
          });
        }
        return res.status(200).json({
          status: 200,
          data: gameData
        });
      } catch (error) {
        return res.status(500).json({
          status: 500,
          message: error.message
        });
      }
});

router.post('/books', async function(req, res) {
    var title = req.body.title,
        author = req.body.author,
        publisher = req.body.publisher,
        year = req.body.year,
        isbn = req.body.isbn;

    if (!title || !author || !publisher || !year || !isbn) {
        res.status(400).json({status: 'failed', msg: 'title, author, publisher, year and isbn are required.'});
        return;
    }

    const newData = new Gamedata({
        title,
        author,
        publisher,
        year,
        isbn
      });
  
      try {
        const result = await newData.save();
        return res.status(201).json({
          status: 201,
          data: result
        });
      } catch (error) {
        return res.status(500).json({
          status: 500,
          error: error.message
        });
      }
    
    // var dataText = fs.readFileSync('./src/files/data.json', 'utf-8');
    // var data = JSON.parse(dataText);
    // var id = 1;
    // if (data.length > 0) {
    //     id = data[data.length-1].id + 1;
    // }
    
    // var bookData = {
    //     id: id,
    //     title: title,
    //     author: author,
    //     publisher: publisher,
    //     year: year,
    //     isbn: isbn
    // }

    // data.push(bookData);

    // fs.writeFile('./src/files/data.json', JSON.stringify(data, null, 4), function (err) {
    //     if (err) {
    //         res.json({status: 'failed', msg: 'the book was not saved'});
    //     } else {
    //         res.redirect('/browse-library.html');
    //     }
    // });
});

router.delete('/books/:id', async function(req, res) {
    var id = parseInt(req.params.id);

    // var dataText = fs.readFileSync('./src/files/data.json', 'utf-8');
    // var data = JSON.parse(dataText);

    // data = data.filter(function (book) {
    //     return book.id !== id;
    // });

    // fs.writeFile('./src/files/data.json', JSON.stringify(data, null, 4), function (err) {
    //     if (err) {
    //         res.json({status: 'failed', msg: 'the book was not deleted'});
    //     } else {
    //         res.json({status: 'success', msg: 'the book was deleted'});
    //     }
    // });
    try {
      const data = await Gamedata.findByIdAndDelete({ _id: id }).exec();
      if (!data) {
        return res.status(404).json({
          status: 404,
          error: 'Data not found'
        });
      }
      return res.status(200).json({
        status: 200,
        data: 'Data successfully deleted'
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: error.message
      });
    }
});

module.exports = router;
