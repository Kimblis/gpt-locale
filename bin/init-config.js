#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

const templatePath = path.join(__dirname, '../templates/localization-config.json');
const destinationPath = path.join(process.cwd(), 'localization-config.json');

if (fs.existsSync(destinationPath)) {
  console.error('Error: localization-config.json already exists in the current directory.');
  process.exit(1);
}

fs.copyFileSync(templatePath, destinationPath);
console.log('localization-config.json has been created in the current directory.');