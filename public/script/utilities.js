

/**
 * @param {number} lower_bound the lower end of the random bound
 * @param {number} higher_bound the higher end of the random bound
 * @returns random within the range specified
 */
export function random(lower_bound, upper_bound) {
    return Math.floor(Math.random() * (upper_bound - lower_bound  + 1)) + lower_bound;
}