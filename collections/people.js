People = new Mongo.Collection('people');

PeopleSchema = new SimpleSchema({
  _id: {
    type: String,
    optional: true
  },
  name: {
    type: String
  },
  position: {
    type: String
  },
  photo: {
    type: String
  },
  photo2: {
    type: String
  }
});

People.attachSchema(PeopleSchema);

// Collection2 already does schema checking
// Add custom permission rules if needed
if (Meteor.isServer) {
  People.allow({
    insert: function() {
      return true;
    },
    update: function() {
      return true;
    },
    remove: function() {
      return true;
    }
  });
}
