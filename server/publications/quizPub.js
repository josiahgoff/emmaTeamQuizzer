Meteor.publish('quiz', function(id) {
  check(id, String);

  var quiz = Quizzes.find({
    _id: id
  });

  return quiz;
});
