// Handler for requests to unknown routes
const notFoundHandler = (req, res) => {
  // Send a 404 status code and a message when the route is not found
  res.status(404).send('The requested route was not found');
};


export default notFoundHandler;