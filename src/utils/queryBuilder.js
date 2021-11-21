export default queryBuilder = (query) => {
  return `?${new URLSearchParams(query).toString()}`
}