const displayMessage = text => {
  return {
    message: text,
    date: new Date().getTime()
  };
};
module.exports = {
  displayMessage
};
