require 'bundler/setup'
require 'hanami/setup'
require 'hanami/model'
require_relative '../lib/todoapp'
require_relative '../apps/api_v1/application'
require_relative '../apps/web/application'

Hanami.configure do
  mount ApiV1::Application, at: '/api/v1'
  mount Web::Application, at: '/'
  model do
    ##
    # Database adapter
    #
    # Available options:
    #
    #  * SQL adapter
    #    adapter :sql, 'sqlite://db/todoapp_development.sqlite3'
    #    adapter :sql, 'postgresql://localhost/todoapp_development'
    #    adapter :sql, 'mysql://localhost/todoapp_development'
    #
    adapter :sql, ENV['DATABASE_URL']

    ##
    # Migrations
    #
    migrations 'db/migrations'
    schema     'db/schema.sql'
  end

  mailer do
    root 'lib/todoapp/mailers'

    # See http://hanamirb.org/guides/mailers/delivery
    delivery :test
  end

  environment :development do
    # See: http://hanamirb.org/guides/projects/logging
    logger level: :debug
  end

  environment :production do
    logger level: :info, formatter: :json

    mailer do
      delivery :smtp, address: ENV['SMTP_HOST'], port: ENV['SMTP_PORT']
    end
  end
end
