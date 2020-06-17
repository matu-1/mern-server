
const pick = (obj, keys) => {
  let newObj = {};
  for (const key of keys) {
    if(obj[key]) newObj[key] = obj[key];
  }
  return newObj;
}

module.exports = {
  pick,
}