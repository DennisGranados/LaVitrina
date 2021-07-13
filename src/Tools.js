function Capitalize(str) {
  let temp = str.toLowerCase().trim();

  return temp.charAt(0).toUpperCase() + temp.slice(1);
}

export default Capitalize;
