Template['quizNew'].helpers({});

Template['quizNew'].events({
  'submit #new-quiz': function(e) {
    e.preventDefault();
    var options = {},
      formData = $(e.target).serializeArray();

    options.problemCount = _.findWhere(formData, {
      name: 'problem_count'
    }).value;

    options.difficulty = _.findWhere(formData, {
      name: 'difficulty'
    }).value;

    Meteor.call('startQuiz', options, function(error, result) {
      if (error) {
        alert(error);
      } else {
        Router.go('quiz', result)
      }
    });
  }
});
