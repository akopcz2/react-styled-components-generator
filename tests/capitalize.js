/**
 * 
 * @param {string} el 
 * Capitalizes first letter of arguemnt that is passed in
 */
function capitalize(el){
  if (typeof el === 'string') {
    return el.charAt(0).toUpperCase() + el.slice(1);
  } else {
    return false;
  }
}

module.exports = capitalize;