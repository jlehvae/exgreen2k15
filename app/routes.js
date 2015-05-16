module.exports = function(app) {
  // route to handle all angular requests
  app.get('*', function(req, res) {
      res.sendfile('./public/views/index.html'); // load our public/index.html file
  });
}
