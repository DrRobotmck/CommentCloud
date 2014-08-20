require 'sinatra'
require 'sinatra/reloader'
require 'pry'

get '/' do 
  erb :main
end
get '/home' do 
  erb :main
end