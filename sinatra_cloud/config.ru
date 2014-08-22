require_relative 'server'
require 'rack/ssl'
class CommentCloud < Sinatra::Base
  use Rack::SSL
    get '/' do 
      erb :main
    end
    get '/home' do 
      erb :main
    end
end

run(CommentCloud)
