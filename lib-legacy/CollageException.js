function CollageException(message)
{
  Error.call(this, message);
  this.name = "CollageScript Exception";
  this.message = message;
  this.stack = (new Error()).stack;
};
