/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1262591861")

  // update field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "date473765221",
    "max": "",
    "min": "",
    "name": "ended_at",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "date"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1262591861")

  // update field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "date473765221",
    "max": "",
    "min": "",
    "name": "ended_at",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "date"
  }))

  return app.save(collection)
})
