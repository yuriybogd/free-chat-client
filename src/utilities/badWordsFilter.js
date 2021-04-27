export const badWordsFilter = (RegExp, message) => {
  return message.match(RegExp)
}