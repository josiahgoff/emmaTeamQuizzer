Template['quiz'].created = function() {
  setProblemIndex(getNextProblemIndex(Template.instance().data.problems));
};

Template['quiz'].helpers({
  correctMessage: function(correct) {
    return correct ? 'Correct!' : 'Incorrect :(';
  },

  currentProblemIndex: function() {
    return getProblemIndex();
  },

  currentProblem: function() {
    return getCurrentProblem(Template.instance().data.problems);
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

  photoSrc: function(parent) {
    if (parent.answerSubmitted && parent.solution._id === this._id) {
      return this.photo2;
    } else {
      return this.photo;
    }
  },

  choiceChecked: function(parent) {
    return parent.answerSubmitted === this._id;
  },

  choiceDisabled: function(parent) {
    return parent.answerSubmitted ? true : false;
  },

  problemsCompleted: function() {
    var problems = Template.instance().data.problems,
      totalProblems = problems.length,
      nextIndex = getNextProblemIndex(problems);

    return nextIndex >= totalProblems;
  },

  quizCompleted: function() {
    return this.status == 'complete';
  },

  progressTracker: function() {
    var data = Template.instance().data,
      index = getProblemIndex() + 1;

    return index + '/' + data.problems.length;
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
          // console.log(result);
        }
      }
    );
  },

  'click .quiz-submit': function(e) {
    var $button = $(e.target);

    Meteor.call('submitQuiz', $button.val(), function(error, result) {
      if (error) {
        console.error(error);
      } else {
        // whatever
      }
    });
  },

  'click .next-problem': function(e) {
    e.preventDefault();

    setProblemIndex(getNextProblemIndex(Template.instance().data.problems));
  }
});

function setProblemIndex(problemIndex) {
  Session.set('quizProblemIndex', problemIndex);
}

function getProblemIndex() {
  var index = Session.get('quizProblemIndex');

  return index;
}

function nextProblem(problems) {
  var problem = problems[getProblemIndex()];

  return problem;
}

function getCurrentProblem(problems) {
  var i = getProblemIndex();

  return problems[i];
}

function getNextProblemIndex(problems) {
  return problems.getLastIndexByKey('answerSubmitted') + 1;
}
