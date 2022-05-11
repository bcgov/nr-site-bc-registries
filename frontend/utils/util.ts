import * as path from 'path';
import * as fs from 'fs';
const filePath = path.resolve('./utils/postalCodes.json');

export function getPostalCodes() {
  try {
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }
  } catch (err) {
    return null;
  }
}
