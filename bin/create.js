#! /usr/bin/env node
const shell = require('shelljs');
const currentPath = process.cwd();
const PROCESS_ARGS = process.argv.slice(2);
const beautify = require('js-beautify').js;
const fs = require('fs');

//Cap First Letter
String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

//Error Messages


// Look for src Folders
if (fs.existsSync(`${currentPath}/src/`)) {
   shell.exec('echo THE SRC FOLDER WAS FOUND')
   shell.exec('echo Generating Templates');
} else {
  shell.exec('echo The folder was not found. To use cst you ');
  shell.exec('echo Aborting cst')
  return;
}

async function createReactComponent(componentName){
  return new Promise((resolve, reject) => {
    componentName = componentName.capitalize();
    var reactComponent = `import React, { Component } from 'react';

    class ${componentName} extends Component {
      render() {
        return (
          <div>
          </div>
        );
      }
    }
    
    export default ${componentName};
    `
    writeTemplate(componentName, reactComponent);
    resolve(componentName, reactComponent)
  });
}

async function createStyledComponent(componentName){
  return new Promise((resolve, reject) => {
    componentName = componentName.capitalize();
    var styledComponent = `import styled from 'styled-components';`
    writeStyledTemplate(componentName, styledComponent);
    resolve(componentName, styledComponent)
  });
}

async function writeTemplate(templateName, templateData){
  return new Promise((resolve, reject) => {
      fs.writeFile(`${currentPath}/src/components/${templateName}/`  + 'index.js', templateData, {flag:"w+"}, (err) => {
          if (err) throw err;
          resolve(`Created ${templateName}`);
      });
  });
}

async function writeStyledTemplate(templateName, templateData){
  return new Promise((resolve, reject) => {
      fs.writeFile(`${currentPath}/src/components/${templateName}/`  + 'styled.js' , beautify(templateData, { indent_size: 0, space_in_empty_paren: true }), {flag:"w+"}, (err) => {
          if (err) throw err;
          resolve(`Created ${templateName}`);
      });
  });
}

async function createDirectory(componentName){
  if (!fs.existsSync(componentName)){
    componentName = componentName.capitalize();
    fs.mkdirSync(`${currentPath}/src/components/${componentName}`);
  }
}

async function processArguments(args){
  const createDirectories = args.map(createDirectory);
  const createStyledComponents = args.map(createStyledComponent)
  const createReactComponents = args.map(createReactComponent)
  await Promise.all(createDirectories, createStyledComponents, createReactComponents);
  shell.exec('echo Done Generating ' + args.length);
}


/** MAIN FUNCTION */
processArguments(PROCESS_ARGS);