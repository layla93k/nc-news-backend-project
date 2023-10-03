exports.handleCustomErrors = ((err, req, res, next)=> {
    if (err.status) {
      res.status(err.status).send({msg: err.msg})
    }
    next(err)
    });


exports.handleSQLErrors = ((err, req, res, next) => {
        if (err.code === '22P02'){
       res.status(400).send({msg: 'Bad request'})
        }
        next(err)
      });

