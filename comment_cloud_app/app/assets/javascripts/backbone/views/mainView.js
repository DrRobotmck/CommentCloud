var MainView = Backbone.View.extend({
	el: '#container',
	initialize: function() {
		console.log('Initialized main view');
		SC.initialize({
			client_id: '456177910e695bec31abd882ed77fedb',
      redirect_uri: 'http://localhost:3000/home'
		});
		this.getUser();
	},
	getUser: function() {
		SC.connect(function() {
      SC.get('/me', function(user) {
      	console.log(user)
      	this.user = user;
      }.bind(this));
    }.bind(this));
	},
	makeTrack: function() {
		var model = this.collection.get('c3');
		console.log(model.get('origin').permalink_url)
		SC.oEmbed(model.get('origin').permalink_url,{maxheight:'500',color:'ffffff', autoplay: true}, function(oembed){
				$('#embedder').append(oembed.html)
			}
		)

	}
});