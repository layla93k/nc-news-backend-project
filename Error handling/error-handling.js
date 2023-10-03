exports.handleCustomErrors = ((err, req, res, next)=> {
    if (err.status) {
      res.status(err.status).send({msg: err.msg})
    }
    next(err)
    });


exports.handleSQLErrors = ((err, req, res, next) => {
        if (err.code === '22P02' || err.code === '23502'){
       res.status(400).send({msg: 'bad request'})
        }
        next(err)
      });

