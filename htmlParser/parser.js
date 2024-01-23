class Node {
  children = null;
  nodeType;

  constructor({ children, nodeDetail }) {
    this.children = children;
    this.nodeDatail = detail;
  }
}

class Element {
  tagName;
  attributes = {};

  constructor({ tagName, attributes }) {
    this.tagName = tagName;
    this.attributes = attributes;
  }
}

function createText(data) {
  return new Node({ children: [], nodeDatail: data });
}

function createElement(name, attrs, children) {
  return new Node({ children, nodeDetail: new Element({ tagName: name, attributes: attrs }) });
}

class HTMLParese {
  constructor(input, position) {
    this.input = input;
    this.position = position;
  }

  getCharacter() {
    return this.input[this.position];
  }

  isStartWith(str) {
    const characterArray = Array.from(str);
    let cur = this.position;
    return characterArray.every((c) => this.input[cur++] === c);
  }

  isEndOfInput() {
    return this.position >= this.input.length;
  }

  makeInputIterator = function* (input, start = 0) {
    for (let i = start; i < input.length; i++) {
      yield [i, input[i]];
    }
  };

  consumeCharacter() {
    const inputIterator = this.makeInputIterator(this.input, this.position);
    const [_, currentCharacter] = inputIterator.next().value;
    this.position++;
    return currentCharacter;
  }

  consumeWhile(fn) {
    let result = "";
    while (!this.isEndOfInput() && fn(this.getCharacter())) {
      result += this.consumeCharacter();
    }
    return result;
  }

  consumeWhitespace() {
    this.consumeWhile(function (character) {
      return character === " " ? true : false;
    });
  }

  parse() {
    const nodes = this.parseNodes();
    return nodes.length === 1 ? nodes.pop() : createElement("html", {}, nodes);
  }

  parseNodes() {
    let nodes = [];

    while (true) {
      this.consumeWhitespace();
      if (this.isEndOfInput() || this.isStartWith("</")) break;
      nodes.push(this.parseNodes());
    }

    return nodes;
  }

  parseNode() {
    if (this.getCharacter() === "<") return this.parseElement();
    return this.parseText();
  }

  parseElement() {
    assert(this.consumeCharacter() === "<", "character is not <");
    const tagName = this.parseName();
    const attributes = this.parseAttributes();

    assert(this.consumeCharacter() === ">", "character is not >");

    const children = this.parseNodes();

    assert(this.consumeCharacter() === "<", "character is not <");
    assert(this.consumeCharacter() === "/", "character is not /");
    assert(this.parseName() === tagName, "There is no tag name in closing tag");
    assert(this.consumeCharacter() === ">", "character is not >");

    return createElement(tagName, attributes, children);
  }

  parseName() {
    return this.consumeWhile(function (chr) {
      if (
        numberCharacters.indexOf(chr) !== -1 ||
        lowerAlphabet.indexOf(chr) === -1 ||
        upperAlphabet.indexOf(chr) === -1
      )
        return true;
      return false;
    });
  }

  parseAttributes() {
    let attributes = {};
    while (true) {
      this.consumeWhitespace();
      if (this.getCharacter() === ">") break;
      const { name, value } = this.parseAttr();
      attributes[name] = value;
    }
    return attributes;
  }

  parseAttr() {
    const name = this.parseName();
    assert(this.consumeCharacter() === "=", "there is no '='");

    const value = this.parseAttrValue();

    return { name, value };
  }

  parseAttrValue() {
    const quote = this.consumeCharacter();
    assert(quote === '""', "open quote error");

    const value = this.consumeWhile(function (chr) {
      return chr !== quote ? true : false;
    });
    assert(this.consumeCharacter() === quote, "close quote error");
    return value;
  }

  parseText() {
    return createText(
      this.consumeWhile(function (chr) {
        return character !== "<" ? true : false;
      })
    );
  }
}
