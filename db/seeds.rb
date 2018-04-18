# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
notes = Note.create(
  [
    {
      title: "Appointment",
      content: "Appointment for tomorrow"
    },
    {
      title: "Recipe",
      content: "Put grocery list here"
    },
    {
      title: "shows",
      content: "Gravity falls, steven universe"
    },
    {
      title: "To DO",
      content: "feed animals, do hw, test"
    }
  ])