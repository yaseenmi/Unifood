class stringProcessor {
  constructor() {
    this.capitalizeEachWord = this.capitalizeEachWord.bind(this);
  }
  static capitalizeEachWord(text) {
    text = text.split(' ');    
    let newText = ``;
    for (let word of text)    
      newText += word[0].toUpperCase() + word.slice(1) + ` `;    
    return newText.trim();
  }
  static encodeURLWord(text) {
    text = text.toLowerCase().replaceAll(` `, `-`).trim();
    return text;
  }
  static decodeURLWord(text) {
    text = text.toLowerCase().replaceAll(`-`, ` `).trim();
    return text;
  }
  static escapeSQ(text)
  {
    text = text = text.trim().replaceAll(`'`, `''`);
    return text;
  }
}

export default stringProcessor;
