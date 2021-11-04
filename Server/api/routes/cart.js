const cart = require('../../models/cart')

module.exports = function(router) {

    router.post('/cart/post', function(req, res) {
        let note = new cart(req.body)
        note.save(function(err, note) {
            if(err) {
                return res.status(400).json(err)
            }
            res.status(200).json(note)
        })
    })

    router.get('/cart/get', function(req, res) {
        cart.find({}, (err, cart) => {
            if(err) {
                res.json({ success: false, message: err});
            }
            else {
                if(!cart) {
                    res.json({success: false, message: 'No cart found.'});
                }
                else {
                    res.json({success: true, cart: cart});
                }
            }
        })
    })

    router.get('/cart/get/:isbn', (req, res) => {
        if(!req.params.isbn) {
            res.json({success: false, message: 'No id provided'})
        }
        else {
            cart.findOne({isbn: req.params.isbn}, (err, cart) => {
                if(err) {
                    res.json({success: false, message: err})
                }
                else {
                    if(!cart) {
                        res.json({success: false, message: 'No cart found.'});
                    }
                    else {
                        res.json({success: true, cart: cart});
                    }
                }
            })
        }
    })

    router.put('/cart/put/:isbn', (req, res) => {
        if(!req.body.isbn) {
            res.json({ success: false, message: 'No cart id provided' })
        }
        else {
            cart.findOne({isbn: req.body.isbn}, (err, cart) => {
                if(err) {
                    res.json({success: false, message: "Not a valid cart id"})
                }
                else {
                    cart.isbn = req.body.isbn
                    cart.title = req.body.title
                    cart.author = req.body.author
                    cart.publish_date = req.body.publish_date
                    cart.publisher = req.body.publisher
                    cart.numOfPages = req.body.numOfPages
                    cart.save((err) => {
                        if(err) {
                            res.json({success: false, message: err})
                        }
                        else {
                            res.json({success: true, message: 'cart Updated!'})
                        }
                    })
                }
            })
        }
    })

    router.delete('/cart/delete/:isbn', (req, res) => {
        if(!req.params.isbn) {
            res.json({success: false, message: 'No id provided'})
        }
        else {
            cart.findOne({isbn: req.params.isbn}, (err, cart) => {
                if(err) {
                    res.json({success: false, message: err})
                }
                else {
                    cart.remove((err) => {
                        if(err) {
                            res.json({success: false, message: err})
                        }
                        else {
                            res.json({success: true, message: 'cart Deleted!'})
                        }
                    })
                }
            })
        }
    })

    router.route("/cart/delete").delete(function(req, res) {
        cart.deleteMany({}, function(err, result) {
          if (err) {
            res.send(err);
          } else {
            res.send(result);
          }
        });
      });


}
