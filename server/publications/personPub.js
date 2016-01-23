Meteor.publish('person', function () {
  return person.find();
});
