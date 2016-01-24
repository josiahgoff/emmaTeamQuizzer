Quizzes = new Mongo.Collection('quizzes');

ProblemSchema = new SimpleSchema({
  id: {
    type: String
  },
  choices: {
    type: [Object],
    blackbox: true
  },
  solution: {
    type: Object,
    blackbox: true
  },
  answerSubmitted: {
    type: String,
    optional: true
  },
  correct: {
    type: Boolean,
    optional: true
  },
  points: {
    type: Number,
    defaultValue: 0
  }
});

Quizzes.attachSchema(
  new SimpleSchema({
    problems: {
      type: [ProblemSchema]
    },
    points: {
      type: Number,
      optional: true
    },
    score: {
      type: Number
    },
    status: {
      type: String,
      defaultValue: 'incomplete'
    },
    userId: {
      type: String
    },
    createdAt: {
      type: Date,
      denyUpdate: true
    }
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
