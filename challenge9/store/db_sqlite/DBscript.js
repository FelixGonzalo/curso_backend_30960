const { config } = require('./config.js')
const knex = require('knex')(config)

async function DBscript() {
  try {
    await knex.schema.dropTableIfExists('messages')
    console.log('messages table deleted')

    await knex.schema.createTable('messages', (table) => {
      table.increments('id').primary()
      table.string('email', 100).notNullable()
      table.timestamp('date').defaultTo(knex.fn.now())
      table.string('message', 100).notNullable()
    })

    console.log('messages table created')
  } catch (error) {
    console.error(error)
  } finally {
    knex.destroy()
  }
}

module.exports = { DBscript }
