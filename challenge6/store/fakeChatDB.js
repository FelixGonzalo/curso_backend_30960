module.exports = class FakeChatDB {
  constructor() {
    this.messages = []
  }

  getAllMessages() {
    return this.messages
  }

  addMessage({ email, date, message }) {
    const newMessage = { email, date, message }
    this.messages.push(newMessage)
    return newMessage
  }
}
