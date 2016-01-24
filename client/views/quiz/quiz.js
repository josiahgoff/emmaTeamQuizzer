Template['quiz'].helpers({
  'quiz': function() {
    var template = Template.instance(),
      data = template.data;

    console.log(data.problems);
    return data;
  }
});

Template['quiz'].events({});
