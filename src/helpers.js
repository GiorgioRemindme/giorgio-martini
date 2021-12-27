export const getRandomArbitrary = (min, max) => {
  return Math.random() * (max - min) + min;
}


export const getRandomFromArray = (items) => {
  let result = items[Math.floor(Math.random() * items.length)]
  return result
}
