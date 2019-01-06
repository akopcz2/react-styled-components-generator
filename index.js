const PROCESS_ARGS = process.argv.slice(2);
const beautify = require('js-beautify').js;
const fs = require('fs');

async function processArguments(args){
  /*
  const lengthOfArgs = args.length;
  const promises = args.map(createTemplate);
  await Promise.all(promises);
  */
  console.log(`DONE GENERATING`);
}


/** MAIN FUNCTION */
processArguments(PROCESS_ARGS);