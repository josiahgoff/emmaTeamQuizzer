var OnBeforeActions = {
  requireLogin: function() {
    if (!Meteor.user()) {
      if (Meteor.loggingIn()) {
        this.render(this.loadingTemplate);
      } else {
        this.render(this.loginTemplate);
      }
    } else {
      this.next();
    }
  }
};

Router.onBeforeAction(OnBeforeActions.requireLogin, {
  except: ['home']
});

Router.route('/', {
  name: 'home',

  action: function() {
    this.render('home');
    SEO.set({
      title: 'Home -' + Meteor.App.NAME
    });
  }
});
