require('dotenv').config();

const express = require('express')
const path = require('path');
const createError = require('http-errors');
const configViewEngine = require('./config/viewEngine');
const webRoutes = require('./routes/web')
const app = express() //app express
const port = process.env.PORT || 8081 // port
const hostname = process.env.HOST_NAME;
var middleware = require('./middware/middware')

//config template engine
configViewEngine(app)
middleware(app);
//khai bao route
app.use('/',webRoutes)

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });  

app.listen(port,hostname, () => {
  console.log(`App listening on port ${port}`)
})