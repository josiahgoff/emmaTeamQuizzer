Meteor.publish('usersTopTen', function() {
  return Meteor.users.find({}, {
    sort: {points: -1},
    limit: 10
  });
});
