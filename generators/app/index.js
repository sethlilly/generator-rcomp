'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');
var mkdirp = require('mkdirp');

module.exports = yeoman.generators.Base.extend({

  constructor: function() {
    yeoman.generators.Base.apply(this, arguments);
    this.argument('appname', { type: String, required: true });
    this.appname = _.camelCase(this.appname);
    this.appname = _.upperFirst(this.appname);
  },

  initializing: function() {
    mkdirp.sync('./' + this.appname);
    this.destinationRoot(this.appname);
  },

  prompting: function() {
    this.log(yosay(
      'I\'m generating the ' + chalk.red(this.appname) + ' component now!'
    ));
  },

  writing: function() {
    this.fs.copyTpl(
      this.templatePath('_index.js'),
      this.destinationPath('index.js'),
      { componentName: this.appname }
    );
    this.fs.copyTpl(
      this.templatePath('_component.jsx'),
      this.destinationPath(this.appname + '.jsx'),
      { componentName: this.appname }
    );
    this.fs.copyTpl(
      this.templatePath('_component.scss'),
      this.destinationPath(this.appname + '.scss'),
      { componentName: this.appname }
    );
  },

  end: function() {
    this.log(chalk.green('Component generated!'));
  }

});
