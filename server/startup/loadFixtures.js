function loadFixture(fixtures, collection) {
  var i;

  for (i = 0; i < fixtures.length; i += 1) {
    //collection.remove({ });
    collection.insert(fixtures[i]);
  }
}

Meteor.startup(function() {
  if (People.find().count() === 0) {
    loadFixture(Fixtures.people, People);
    console.log(People.find().fetch());
  }
});
