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
  // console.log(problem);
  return {
    solution: solution,
    choices: choices
  };
}

function getRandomDoc(collection, excludes) {
  excludes = excludes || [];

  var n = getRandomIntInclusive(1, collection.find().count()),
    doc = collection.find({}, {
      skip: n,
      limit: 1
    }).fetch();

  return doc[0];
}

function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

Meteor.methods({
  startQuiz: function() {

    // if (!this.userId) {
    //   throw new Meteor.Error("not-logged-in",
    //     "Must be logged in to take the quiz.");
    // }



    return buildQuiz(People);
  }
});
