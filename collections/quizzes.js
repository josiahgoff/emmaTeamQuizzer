Quizzes = new Mongo.Collection('quizzes');

ProblemSchema = new SimpleSchema({
  choices: {
    type: [PeopleSchema]
  },
  solution: {
    type: PeopleSchema
  },
  answerSubmitted: {
    type: String,
    optional: true
  }
});

Quizzes.attachSchema(
  new SimpleSchema({
    problems: {
      type: [ProblemSchema]
    },
    score: {
      type: Number
    }
    // createdAt: {
    //   type: Date,
    //   denyUpdate: true
    // }
  })
);

// Collection2 already does schema checking
// Add custom permission rules if needed
if (Meteor.isServer) {
  Quizzes.allow({
    insert: function() {
      return true;
    },
    update: function() {
      return true;
    },
    remove: function() {
      return true;
    }
  });
}
