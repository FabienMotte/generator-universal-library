'use strict';
var generators = require('yeoman-generator');
var file = require('file');
var path = require('path');
var chalk = require('chalk');
var yosay = require('yosay');
var kebabcase = require('lodash.kebabcase');
var trim = require('lodash.trim');
var Promise = require('bluebird');
var exec = Promise.promisify(require('child_process').exec);

module.exports = generators.Base.extend({
  prompting: function () {
    this.log(yosay(
      'Welcome to the ' + chalk.red('Universal library') + ' generator!'
    ));

    return Promise.all([exec('npm whoami').catch(function(e) {
      console.error('Error getting npm user name: run `npm login`');
      console.error(e);
    })])
    .then(function(result) {
      result = result ? result : {};
      this.username = trim(result[0]);
      return this._showPrompts();
    }.bind(this));
  },

  _showPrompts: function() {
    var config = this.user.git;
    config = this.user.git ? this.user.git : {};
    var prompts = [{
      type: 'input',
      name: 'user',
      message: 'What is the Github username/organization for this project?',
      default: this.username,
      store: true
    }, {
      type: 'input',
      name: 'repo',
      message: 'What is the repository/project name?',
      default: kebabcase(this.appname)
    }, {
      type: 'input',
      name: 'description',
      message: 'What is a short description for this project?'
    }, {
      type: 'input',
      name: 'author',
      message: 'Who is the author of this project?',
      default: config.name() + ' <' + config.email() + '>',
      store: true
    }];

    var self = this;
    return new Promise(function(resolve, reject) {
      self.prompt(prompts, function(props) {
        self.user = props.user;
        self.repo = props.repo;
        self.description = props.description;
        self.author = props.author;

        resolve();
      });
    });
  },

  writing: function() {

    var src = this.sourceRoot();
    var self = this;
    file.walkSync(src, function(dirPath, dirs, files) {
      var relativeDir = path.relative(src, dirPath);
      files.forEach(function(filename) {
        var target;
        var ignoreDir = relativeDir === 'src';
        var shouldCopy = !ignoreDir && !/index.js$/.test(filename);
        if (shouldCopy) {
          target = path.join(relativeDir, filename);
          self.template(target, target);
        }
      });
    });
    this.template('src/index.js', 'src/' + this.repo + '.js');
  },

  install: function () {
    this.installDependencies({
      bower: false,
      npm: true,
      skipInstall: this.options['skip-install']
    });
  }
});