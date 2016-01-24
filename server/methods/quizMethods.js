function buildQuiz(collection, options) {
  options = options || {};
  options.problemCount = 3;

  var problems = new Array(),
    score = 0;

  for (var i = 0; i < options.problemCount; i++) {
    problems.push(buildProblem(collection));
  }

  var quizId = Quizzes.insert({
    problems: problems,
    score: score
  });

  return quizId;
}

function buildProblem(collection, solution) {
  solution = solution || getRandomDoc(collection);

  var choices = new Array();
  choices.push(solution);

  for (var i = 0; i < 3; i++) {
    choices.push(getRandomDoc(collection));
  }

  return {
    id: Random.id(),
    solution: solution,
    choices: choices
  };
}

function getRandomDoc(collection, excludes) {
  excludes = excludes || [];

  var n = _.random(1, collection.find().count()),
    doc = collection.find({}, {
      skip: n,
      limit: 1
    }).fetch();

  return doc[0];
}

Meteor.methods({
  startQuiz: function() {

    // if (!this.userId) {
    //   throw new Meteor.Error("not-logged-in",
    //     "Must be logged in to take the quiz.");
    // }

    return buildQuiz(People);
  },

  submitAnswer: function(quizId, problemId, answer) {
    check(quizId, String);
    check(problemId, String);
    check(answer, String);

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
  }
});
