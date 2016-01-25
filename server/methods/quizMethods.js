var levels = {
  easy: {
    choices: 4,
    multiplier: 1
  },
  medium: {
    choices: 8,
    multiplier: 2
  },
  hard: {
    choices: 16,
    multiplier: 4
  }
};

function buildQuiz(collection, options) {
  options = options || {};
  options.problemCount = options.problemCount || 10;
  options.difficulty = options.difficulty || 'easy';

  var problems = new Array(),
    score = 0;

  for (var i = 0; i < options.problemCount; i++) {
    problems.push(buildProblem(collection, {
      choiceCount: levels[options.difficulty].choices
    }));
  }

  var quizId = Quizzes.insert({
    problems: problems,
    score: score,
    difficulty: options.difficulty,
    userId: options.userId,
    createdAt: new Date()
  });

  return Quizzes.findOne({
    _id: quizId
  });
}

function buildProblem(collection, options) {
  options = options || {};
  options.solution = options.solution || getRandomDoc(collection);
  options.choiceCount = options.choiceCount || 4;

  var choices = new Array();
  choices.push(options.solution);

  for (var i = 0; i < (options.choiceCount - 1); i++) {
    var choice = getRandomDoc(collection);

    if (_.findWhere(choices, {
        _id: choice._id
      })) {
      i--;
    } else {
      choices.push(choice);
    }
  }

  return {
    id: Random.id(),
    solution: options.solution,
    choices: _.shuffle(choices)
  };
}

function getRandomDoc(collection) {
  var n = _.random(collection.find().count() - 1),
    doc = collection.find({}, {
      skip: n,
      limit: 1
    }).fetch();

  return doc[0];
}

function gradeQuiz(quizId) {
  var quiz = Quizzes.find({
    _id: quizId
  }).fetch()[0];

  var score = tallyScore(quiz);

  Quizzes.update({
    _id: quizId
  }, {
    $set: {
      score: score,
      points: score * levels[quiz.difficulty].multiplier,
      status: 'complete'
    }
  });

  return quizId;
}

function tallyScore(quiz) {
  var score = 0;

  _.each(quiz.problems, function(problem) {
    score = score + problem.points;
  });

  return score;
}

Meteor.methods({
  startQuiz: function(options) {
    check(options, Object);

    if (!this.userId) {
      throw new Meteor.Error("not-logged-in",
        "Must be logged in to take the quiz.");
    }

    options.userId = this.userId;

    return buildQuiz(People, options);
  },

  submitAnswer: function(quizId, problemId, answer) {
    check(quizId, String);
    check(problemId, String);
    check(answer, String);

    if (!this.userId) {
      throw new Meteor.Error("not-logged-in",
        "Must be logged in to take the quiz.");
    }

    var quiz = Quizzes.findOne({
      _id: quizId
    });

    var problem = _.findWhere(quiz.problems, {
      id: problemId
    });

    if (!problem) {
      throw new Meteor.Error("problem-missing",
        "A problem with the id `" + problemId + "` does not exist!");
    }

    var problemIndex = _.indexOf(quiz.problems, problem);

    problem.answerSubmitted = answer;
    problem.correct = answer === problem.solution._id;
    problem.points = problem.correct ? 1 : 0;

    Quizzes.update({
      "_id": quizId,
      "problems.id": problemId
    }, {
      "$set": {
        'problems.$.answerSubmitted': answer,
        'problems.$.correct': answer === problem.solution._id,
        'problems.$.points': problem.correct ? 1 : 0
      }
    });

    var quiz = Quizzes.findOne({
      _id: quizId
    });

    return quiz;
  },

  'submitQuiz': function(quizId) {
    check(quizId, String);

    if (!this.userId) {
      throw new Meteor.Error("not-logged-in",
        "Must be logged in to take the quiz.");
    }

    return gradeQuiz(quizId);
  }
});
