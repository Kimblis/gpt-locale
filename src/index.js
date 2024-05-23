import axios from 'axios';
import fs from 'fs';
import path from 'path';

const API_URL = 'https://your-backend-service.com/api/translate';

export const translateLocalizations = async (localizations, languages, apiKey) => {
  try {
    const response = await axios.post(API_URL, {
      localizations,
      languages
    }, {
      headers: { 'Authorization': `Bearer ${apiKey}` }
    });

    return response.data.translations;
  } catch (error) {
    throw new Error(`Error translating localizations: ${error.message}`);
  }
};

export const saveTranslations = (translations, outputDir) => {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  Object.keys(translations).forEach(lang => {
    const filePath = path.join(outputDir, `${lang}.json`);
    fs.writeFileSync(filePath, JSON.stringify(translations[lang], null, 2));
  });
};

export const loadLocalizations = (filePath) => {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Localization file not found: ${filePath}`);
  }
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
};