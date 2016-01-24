Router.route('/profile/:_id', {
  name: 'profile',
  waitOn: function() {
    return [
      Meteor.subscribe('userProfile', this.params._id)
    ];
  },
  data: function() {
    return Meteor.users.findOne(this.params._id);
  },
  action: function() {
    this.render('profile');
  }
});
