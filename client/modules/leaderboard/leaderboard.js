Template['leaderboard'].helpers({
  users: function() {
    var users = Meteor.users.find({}, {
      sort: {points: -1},
      limit: 10
    }).fetch();

    return users;
  },
  rank: function(index) {
    return index + 1;
  }
});

Template['leaderboard'].events({
});
