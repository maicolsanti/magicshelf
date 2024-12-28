const notFoundHandler = (req, res) => {
  res.status(404).send('La rotta richiesta non è stata trovata');
};

export default notFoundHandler;
