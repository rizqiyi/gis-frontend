const truncate = (words: string, end: number, limit: number): string => {
  if (words.length > limit) {
    return `${words.substring(0, end)}...`
  }

  return words
}

export default truncate
