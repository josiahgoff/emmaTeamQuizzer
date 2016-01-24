Router.route('/quiz/new', function() {
  this.render('quizNew');
});

Router.route('/quiz/:_id', {
  name: 'quiz',
  waitOn: function() {
    return [
      Meteor.subscribe('quiz', this.params._id)
    ];
  },
  data: function() {
    return Quizzes.findOne(this.params._id);
  },
  action: function() {
    this.render('quiz');
  }
});
