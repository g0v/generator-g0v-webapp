'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');


var G0vWebappGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = yeoman.file.readJSON(path.join(__dirname, '../package.json'));

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.npmInstall();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // have Yeoman greet the user
    console.log(this.yeoman);

    // replace it with a short and sweet description of your generator
    console.log(chalk.magenta('You\'re using the fantastic G0vWebapp generator.'));

    var prompts = [{
      name: 'appName',
      message: 'What do you want to call your app?'
    }];

    this.prompt(prompts, function (props) {
      this.appName = props.appName;

      done();
    }.bind(this));
  },

  app: function () {
    this.mkdir('app');
    this.mkdir('app/partials');
    this.mkdir('app/app');
    this.mkdir('app/app/controllers');
    this.mkdir('app/app/directives');
    this.mkdir('app/app/services');
    this.mkdir('app/assets');
    this.mkdir('app/assets/img');
    this.mkdir('app/assets/styles');
    this.mkdir('app/src');
    this.mkdir('app/test');

    this.template('_package.json', 'package.json');
    this.template('_bower.json', 'bower.json');
    this.template('_deploy', 'deploy');
  },

  projectfiles: function () {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
    this.copy('bowerrc', '.bowerrc');
    this.copy('gitignore', '.gitignore');
    this.copy('gulpfile.ls', 'gulpfile.ls');

  }
});

module.exports = G0vWebappGenerator;
