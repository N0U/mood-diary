export const handleSubmitError = promise => promise.catch(x => console.error(x));

export const noSubmit = fn => e => {
  e.preventDefault();
  fn();
  return false;
};