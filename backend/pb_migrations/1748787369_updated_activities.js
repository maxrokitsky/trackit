/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1262591861")

  // remove field
  collection.fields.removeById("autodate222754019")

  // add field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "date222754019",
    "max": "",
    "min": "",
    "name": "started_at",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "date"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1262591861")

  // add field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "autodate222754019",
    "name": "started_at",
    "onCreate": true,
    "onUpdate": false,
    "presentable": false,
    "system": false,
    "type": "autodate"
  }))

  // remove field
  collection.fields.removeById("date222754019")

  return app.save(collection)
})
