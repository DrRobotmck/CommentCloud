CommentView = Backbone.View.extend({
  className: 'comment',
  initialize: function() {
    this.render();
  },
  render: function() {
    console.log('hi', this.model)
    this.$el.html(HandlebarsTemplates['comments'](this.model));
  },
  animate: function() {
    var top = 700;
    console.log('hi', top)
    var interval;
    interval = setInterval(function() {
      if (top >= -500){
        this.$el.css('top', (top -= 10)+ 'px');
      } else {
        clearInterval(interval);
        this.remove();
      }
    }.bind(this),100);
  }
});