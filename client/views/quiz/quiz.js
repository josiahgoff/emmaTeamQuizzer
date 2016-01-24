Template['quiz'].helpers({
  correctMessage: function(correct) {
    return correct ? 'Correct!' : 'Incorrect :(';
  },

  answerClasses: function(parent) {
    var classes = '';

    if (parent.answerSubmitted === this._id) {
      classes += ' submission';

      if (parent.solution._id !== this._id) {
        classes += ' incorrect';
      }
    }

    if (parent.answerSubmitted && parent.solution._id === this._id) {
      classes += ' correct';
    }

    return classes;
  },

  choiceChecked: function(parent) {
    return parent.answerSubmitted === this._id;
  },

  choiceDisabled: function(parent) {
    return parent.answerSubmitted ? true : false;
  }
});

Template['quiz'].events({
  'submit .problem-form': function(e) {
    e.preventDefault();
    var $form = $(e.target),
      formData = $form.serializeArray(),
      quizId = formData[0]['value'],
      problemId = formData[1]['name'],
      answer = formData[1]['value'];

    Meteor.call('submitAnswer', quizId, problemId, answer,
      function(error, result) {
        if (error) {
          console.error(error);
        } else {
          console.log(result);
        }
      }
    );
  }
});
