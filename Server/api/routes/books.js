const books = require('../../models/books')

module.exports = function(router) {

    //POST: Get meeting note document
    router.post('/books/post', function(req, res) {
        let note = new books(req.body)
        note.save(function(err, note) {
            if(err) {
                return res.status(400).json(err)
            }
            res.status(200).json(note)
        })
    })

    router.get('/books/get', function(req, res) {
        books.find({}, (err, books) => {
            if(err) {
                res.json({ success: false, message: err});
            }
            else {
                if(!books) {
                    res.json({success: false, message: 'No books found.'});
                }
                else {
                    res.json({success: true, books: books});
                }
            }
        })
    })

    router.get('/books/get/:isbn', (req, res) => {
        if(!req.params.isbn) {
            res.json({success: false, message: 'No id provided'})
        }
        else {
            books.findOne({isbn: req.params.isbn}, (err, books) => {
                if(err) {
                    res.json({success: false, message: err})
                }
                else {
                    if(!books) {
                        res.json({success: false, message: 'No books found.'});
                    }
                    else {
                        res.json({success: true, books: books});
                    }
                }
            })
        }
    })

    router.put('/books/put/:isbn', (req, res) => {
        if(!req.params.isbn) {
            res.json({ success: false, message: 'No books id provided' })
        }
        else {
            books.findOne({isbn: req.params.isbn}, (err, books) => {
                if(err) {
                    res.json({success: false, message: "Not a valid books id"})
                }
                else {
                    books.isbn = req.body.isbn
                    books.title = req.body.title
                    books.author = req.body.author
                    books.pageCount = req.body.pageCount
                    books.price = req.body.price
                    books.Url = req.body.Url
                    books.shortDescription = req.body.shortDescription
                    books.category = req.body.category
                    books.save((err) => {
                        if(err) {
                            res.json({success: false, message: err})
                        }
                        else {
                            res.json({success: true, message: 'books Updated!'})
                        }
                    })
                }
            })
        }
    })

    router.delete('/books/delete/:isbn', (req, res) => {
        if(!req.params.isbn) {
            res.json({success: false, message: 'No id provided'})
        }
        else {
            books.findOne({isbn: req.params.isbn}, (err, books) => {
                if(err) {
                    res.json({success: false, message: err})
                }
                else {
                    books.remove((err) => {
                        if(err) {
                            res.json({success: false, message: err})
                        }
                        else {
                            res.json({success: true, message: 'books Deleted!'})
                        }
                    })
                }
            })
        }
    })

    router.route("/books/delete").delete(function(req, res) {
        books.deleteMany({}, function(err, result) {
          if (err) {
            res.send(err);
          } else {
            res.send(result);
          }
        });
      });


}
