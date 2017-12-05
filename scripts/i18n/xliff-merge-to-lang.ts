import * as path from 'path';
import * as fs from 'fs-extra';
import * as xmldom from 'xmldom';

const languages = ['en', 'bg'];
const localePath = path.join(__dirname, '../../src/locale/');

Promise.resolve()
  .then(() => console.log('Starting messages._tpl_.xlf to messages.{lang}.xlf merge'))
  .then(() => {
    const readFromFile = `${localePath}messages._tpl_.xlf`;
    console.log(`Reading updated messages from "${readFromFile}" ...`);
    return fs.readFile(readFromFile, {encoding: 'utf-8'});
  })
  .then((xliffData) => {
    const xliffDom = (new xmldom.DOMParser()).parseFromString(xliffData);
    const languagesToMerge = languages.filter(lang => lang !== 'en');
    return Promise.all(languagesToMerge.map((lang) => {
      const xliffLangFile = `${localePath}messages.${lang}.xlf`;
      console.log(`Reading translations from "${xliffLangFile}" ...`);
      return fs.readFile(xliffLangFile, {encoding: 'utf-8'})
        .then((xliffLangData): {xliffLangDom: Document, xliffMergedDom: Document} => {
          return {
            xliffLangDom: (new xmldom.DOMParser()).parseFromString(xliffLangData),
            xliffMergedDom: xliffDom.cloneNode(true) as Document
          };
        })
        .then(({xliffLangDom, xliffMergedDom}: {xliffLangDom: Document, xliffMergedDom: Document}) => {
          console.log(`Merging updated messages into "${xliffLangFile}" ...`);
          xliffMergedDom.getElementsByTagName('file').item(0).setAttribute('target-language', lang);
          Array.prototype.forEach.call(
            xliffMergedDom.getElementsByTagName('trans-unit'),
            (mergedTransUnitNode: Element) => {
              const mergedTransUnitTargetNode = mergedTransUnitNode.getElementsByTagName('target').item(0);
              const langTransUnitNode = xliffLangDom.getElementById(mergedTransUnitNode.getAttribute('id'));
              const langTransUnitTargetNode = langTransUnitNode && langTransUnitNode.getElementsByTagName('target').item(0);
              if (langTransUnitTargetNode && langTransUnitTargetNode.childNodes.length > 0) {
                while (mergedTransUnitTargetNode.firstChild) {
                  mergedTransUnitTargetNode.removeChild(mergedTransUnitTargetNode.firstChild);
                }
                Array.prototype.forEach.call(
                  langTransUnitNode.getElementsByTagName('target').item(0).childNodes,
                  (langTargetNodeChild: Element) => {
                    mergedTransUnitTargetNode.appendChild(langTargetNodeChild.cloneNode(true));
                  }
                );
              } else {
                // mark a missing <target/> node with a comment
                mergedTransUnitTargetNode.parentNode.insertBefore(
                  xliffMergedDom.createComment(' place here missing translation in <target></target>'),
                  mergedTransUnitTargetNode
                );
                // make sure we remove the <target/> node so at least build warns us later
                mergedTransUnitTargetNode.parentNode.removeChild(mergedTransUnitTargetNode);
              }
            }
          );
          const xliffMergedData = xliffMergedDom.toString() + '\n';
          const writeToFile = `${localePath}messages.${lang}.xlf`;
          console.log(`Writing to "${writeToFile}" ...`);
          return fs.writeFile(writeToFile, xliffMergedData, {encoding: 'utf-8'});
        });
    }));
  })
  .then(() => console.log('Done!'))
  .catch((err) => {
    console.log('Fail!');
    console.log(err);
    process.exit(1);
  });
