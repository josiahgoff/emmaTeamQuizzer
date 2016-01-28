Template['profile'].helpers({
  quizzes: function() {
    var template = Template.instance();
    console.log(template.data);
    return Quizzes.find({
      userId: template.data._id
    }, {
      sort: {
        createdAt: -1
      }
    });
  },

  complete: function() {
    return this.status === 'complete';
  },

  possibleScore: function() {
    return this.problems.length;
  }
});

Template['profile'].events({});
