Meteor.publish('quiz', function () {
  return quiz.find();
});
