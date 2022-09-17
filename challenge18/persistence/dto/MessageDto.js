class MessageDto {
  constructor({ id, date, text, author }) {
    this.id = id
    this.date = date
    this.text = text
    this.author = {
      id: author.id,
      name: author.name,
      lastname: author.lastname,
      nick: author.nick,
      avatar: author.avatar,
      age: author.age,
    }
  }
}

export default function formatDTO(messages) {
  if (Array.isArray(messages)) {
    return messages.map(obj => new MessageDto(obj))
  } else {
    return new MessageDto(messages)
  }
}