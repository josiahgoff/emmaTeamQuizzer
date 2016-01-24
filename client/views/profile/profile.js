Template['profile'].helpers({
  quizzes: function() {
    var template = Template.instance();

    return Quizzes.find({
      userId: template.data._id
    }, {
      sort: {
        createdAt: -1
      }
    });
  }
});

Template['profile'].events({});
