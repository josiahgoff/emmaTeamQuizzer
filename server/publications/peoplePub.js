Meteor.publish('people', function() {
  return People.find();
});

Meteor.publishComposite('userProfile', function(userId) {
  check(userId, String);

  return {
    find: function() {
      return Meteor.users.find({
        _id: userId
      });
    },
    children: [{
      find: function(user) {
        return Quizzes.find({
          userId: user._id
        });
      }
    }]
  }
});
