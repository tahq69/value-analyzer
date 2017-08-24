export default function data (n, diff = 20) {
  let result = [...new Array(n).keys()]
  let actual = 400
  return result.reduce(acc => {
    let {min, max} = gerRange(actual, diff)

    actual = getRandomInt(min, max)

    acc.push(actual)

    return acc
  }, [])
}

/**
 * Get a random integer between `min` and `max`.
 * @param  {number} min - min number
 * @param  {number} max - max number
 * @return {int} a random integer
 */
function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

/**
 * Get range for max and min values.
 * @param  {number} curr
 * @param  {number} diff
 * @param  {number} maxValue
 * @param  {number} minValue
 * @returns {{max: number, min: number}}
 */
function gerRange (curr, diff = 20, maxValue = 800, minValue = 0) {
  let max = curr + diff
  let min = curr - diff

  if (max > maxValue) {
    min -= max - maxValue
    max = maxValue
  }

  if (min < minValue) {
    max += minValue - min
    min = minValue
  }

  return {max, min}
}
