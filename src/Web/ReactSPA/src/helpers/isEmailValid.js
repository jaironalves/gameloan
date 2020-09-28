export default email => {
  if (!email) return true
  return /\S+@\S+\.\S+/.test(email)
}
