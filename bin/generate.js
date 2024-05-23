#!/usr/bin/env node

import { translateLocalizations, saveTranslations, loadLocalizations } from '../src/index.js';
import fs from 'fs';
import path from 'path';

const configPath = path.join(process.cwd(), 'localization-config.json');

if (!fs.existsSync(configPath)) {
  console.error('Error: localization-config.json not found in the current directory.');
  process.exit(1);
}

const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
const { localizationFilePath, languages, apiKey, outputDir } = config;

try {
  const localizations = loadLocalizations(localizationFilePath);

  translateLocalizations(localizations, languages, apiKey)
    .then(translations => {
      saveTranslations(translations, outputDir);
      console.log('Localizations generated successfully.');
    })
    .catch(error => {
      console.error(error.message);
    });
} catch (error) {
  console.error(error.message);
  process.exit(1);
}