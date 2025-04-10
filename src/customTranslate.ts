/*
 * @Author: guoshouying
 * @Date: 2025-04-09 14:54:14
 * @LastEditors: guoshouying
 * @LastEditTime: 2025-04-09 14:54:38
 * @FilePath: \wlh_web_pro\src\customTranslate.ts
 */
import translations from './translationsGerman';

export default function customTranslate(template, replacements) {
  replacements = replacements || {};

  // Translate
  template = translations[template] || template;

  // Replace
  return template.replace(/{([^}]+)}/g, function(_, key) {
    return replacements[key] || '{' + key + '}';
  });
}
