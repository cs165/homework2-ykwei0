const MATCH_LIST = {
  'there': 'their',
  'their': 'there',
  'they\'re': 'there',
  'There': 'Their',
  'Their': 'There',
  'They\'re': 'There',
  'THERE': 'THEIR',
  'THEIR': 'THERE',
  'THEY\'RE': 'THERE'
};

function transformTextNodes(node) {
  // TODO(you): Implement this function! See HW spec for details.
  if(node.nodeType === Node.TEXT_NODE) {
    //cut to words
    let word = node.textContent.split(' ');
    for (let i = 0; i < word.length; i++){
      //delete WS and check if it is in MATCH_LIST
      if (MATCH_LIST.hasOwnProperty(word[i].trim())){
        word[i] = word[i].replace(word[i].trim(), MATCH_LIST[word[i].trim()]);
      }
    }
    node.textContent = word.join(' ');
  }
  for (const child of node.childNodes) {
    transformTextNodes(child);
  }
}

transformTextNodes(document.body);

// Log statement to test that the extension loaded properly.
console.log('Evil extension loaded!');
console.log('Extension updated');
