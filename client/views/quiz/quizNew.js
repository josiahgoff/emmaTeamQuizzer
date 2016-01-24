Template['quizNew'].helpers({});

Template['quizNew'].events({
  'click #startQuiz': function(event, template) {
    Meteor.call('startQuiz', function(error, result) {
      if (error) {
        alert(error);
      } else {
        Router.go('quiz', result)
      }
    });
  }
});
