// Define App Constants

if (Meteor.App) {
  throw new Meteor.Error(
    'Meteor.App already defined? see client/lib/constants.js');
}

Meteor.App = {
  NAME: 'Emma Team Quizzer',
  DESCRIPTION: 'Test your knowledge of the Emma team'
};
