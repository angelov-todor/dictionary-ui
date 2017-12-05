import * as path from 'path';
import * as fs from 'fs-extra';
import * as xmldom from 'xmldom';

const xliffTpl = `<?xml version="1.0" encoding="UTF-8"?>
<xliff version="1.2" xmlns="urn:oasis:names:tc:xliff:document:1.2">
  <file source-language="en" datatype="plaintext" original="ng2.template" target-language="en">
    <body></body>
  </file>
</xliff>

`;

const localePath = path.join(__dirname, '../../src/locale/');

Promise.resolve()
  .then(() => console.log('Starting messages.xlf to messages.tpl.xlf'))
  .then(() => {
    const readFromFile = `${localePath}messages.xlf`;
    console.log(`Reading from "${readFromFile}" ...`);
    return fs.readFile(readFromFile, {encoding: 'utf-8'});
  })
  .then((xliffData) => {
    const xliffDom = (new xmldom.DOMParser()).parseFromString(xliffData);
    const xliffTplDom = (new xmldom.DOMParser()).parseFromString(xliffTpl);
    const xliffBodyNode = xliffTplDom.getElementsByTagName('body').item(0);
    const indentNode = xliffTplDom.createTextNode('  ');
    const newlineNode = xliffTplDom.createTextNode('\n');
    function insertIndent(parent: Node, indentSize = 1) {
      parent.appendChild(newlineNode.cloneNode());
      for (let i = 0; i < indentSize; i++) {
        parent.appendChild(indentNode.cloneNode());
      }
    }
    // xliffBodyNode.appendChild(newlineNode.cloneNode(true));
    Array.prototype.forEach.call(
      xliffDom.getElementsByTagName('trans-unit'),
      (transUnitNode: Element) => {
        const tplTransUnitNode = transUnitNode.cloneNode();
        Array.prototype.forEach.call(
          transUnitNode.childNodes,
          (transUnitNodeChild: Node) => {
            if (transUnitNodeChild.nodeName === 'source') {
              // keep everything from the <source> elements
              const sourceNode = transUnitNodeChild;
              insertIndent(tplTransUnitNode, 4);
              tplTransUnitNode.appendChild(
                sourceNode.cloneNode(true)
              );
              const tplTargetNode = xliffTplDom.createElement('target');
              tplTargetNode.appendChild(xliffTplDom.createComment(' put translation here '));
              insertIndent(tplTransUnitNode, 4);
              tplTransUnitNode.appendChild(
                tplTargetNode.cloneNode(true)
              );
            } else if (transUnitNodeChild.nodeName === 'note') {
              // keep everything from the <source> elements
              const noteNode = transUnitNodeChild;
              insertIndent(tplTransUnitNode, 4);
              tplTransUnitNode.appendChild(
                noteNode.cloneNode(true)
              );
            }
          }
        );
        insertIndent(tplTransUnitNode, 3);
        insertIndent(xliffBodyNode, 3);
        xliffBodyNode.appendChild(tplTransUnitNode);
      }
    );
    insertIndent(xliffBodyNode, 2);
    const xliffTplData = xliffTplDom.toString() + '\n';
    return xliffTplData;
  })
  .then(xliffTplData => {
    const writeToFile = `${localePath}messages._tpl_.xlf`;
    console.log(`Writing to "${writeToFile}" ...`);
    return fs.writeFile(writeToFile, xliffTplData, {encoding: 'utf-8'});
  })

  .then(() => console.log('Done!'))
  .catch((err) => {
    console.log('Fail!');
    console.log(err);
    process.exit(1);
  });
