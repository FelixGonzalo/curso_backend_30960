module.exports = {
  config: { 
    alias: { 
      p: "PORT",
      m: "MODE",
      daoproduct: "DAO_PRODUCT",
    },
    default: { 
      PORT: 8080,
      MODE: "FORK",
      DAO_PRODUCT: "Memory",
    }
  }
}