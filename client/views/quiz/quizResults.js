Template['quizResults'].helpers({
  possibleScore: function() {
    return this.problems.length;
  },

  yourAnswer: function() {
    return _.findWhere(this.choices, {
      _id: this.answerSubmitted
    });
  },

  answeredPhoto: function(parent) {
    return parent.solution._id === parent.answerSubmitted ?
      parent.solution.photo2 : this.photo;
  },

  answerClasses: function() {
    return this.solution._id !== this.answerSubmitted ?
      ' incorrect' : '';
  }
});

Template['quizResults'].events({});
