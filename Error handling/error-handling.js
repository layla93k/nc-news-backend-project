exports.handleCustomErrors = ((err, req, res, next)=> {
  if (err.status) {
    res.status(err.status).send({msg: err.msg})
  }
  next(err)
  });




exports.handleSQLErrors = ((err, req, res, next) => {
        if (err.code === '22P02' || err.code === '23502'){
       res.status(400).send({msg: 'bad request'})
        } else if (err.code === '23503') {
          res.status(404).send({msg: 'username not found'})
        } else if (err.code === '08P01') {
          res.status(400).send({msg: 'you have not included all relevant properties in your request'})
        } else if (err.code === '23503') {
          res.status(400).send({msg: 'invalid properties in request'})
        }
        next(err)
      });

    