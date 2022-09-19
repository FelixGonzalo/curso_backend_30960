export default {
  config: { 
    alias: { 
      p: "PORT",
      m: "MODE",
      daoproduct: "DAO_PRODUCT",
      daomessage: "DAO_MESSAGE"
    },
    default: { 
      PORT: 8080,
      MODE: "FORK",
      DAO_PRODUCT: "Memory",
      DAO_MESSAGE: "Memory",
    }
  }
}