//* Returns a random integer between lowerlim (included) and upperlim (excluded)
export const randomInt = (lowerLim: number = 1, upperLim: number) => {
    return Math.floor(Math.random()*(upperLim - lowerLim) + lowerLim)
}
