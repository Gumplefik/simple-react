import { isString, isArray } from "./utils/type";

export function createElement(type, attributes, ...children) {
  let element;
  if (isString(type)) {
    element = new ElementWrapper(type);
  } else {
    element = new type();
  }

  console.log(attributes)
  for (let key in attributes) {
    element.setAttribute(key, attributes[key]);
  }

  function insertChildren(children) {
    isArray(children) &&
      children.forEach((child) => {
        if (isString(child)) {
          child = new TextWrapper(child);
        } else if (isArray(child)) {
          return insertChildren(child)
        }
        element.appendChild(child);
      });
  }

  insertChildren(children)

  return element
}

class ElementWrapper {
  constructor(type) {
    this.root = document.createElement(type);
  }

  appendChild(component) {
    this.root.appendChild(component.root)
  }

  setAttribute(name, value) {
    this.root.setAttribute(name, value)
  }
}

class TextWrapper {
  constructor(text) {
    this.root = document.createTextNode(text)
  }
}

export class Component {
  constructor() {
    this.props = Object.create(null)
    this.state = null
    this.children = []
    this._root = null
  }

  setAttribute(name, value) {
    this.props[name] = value
    // this.root.setAttribute(name, value)
  }

  setState(newState) {
    if (this.newState === null) {
      return
    }
    let oldState = this.state || {}
    this.state = {
      ...oldState,
      ...newState
    }
    this.reRender()
  }

  appendChild(component) {
    this.children.push(component);
    this.reRender()
  }

  renderAttribute() {
    for (let key in this.props) {
      if (/^on([\s\S]+)/.test(key)) {
        this._root.addEventListener(RegExp.$1, this.props[key])
      } else {
        this._root.setAttribute(key, this.props[key]);
      }
    }
  }

  reRender() {
    this._root = this.render.root
  }

  get root() {
    if (!this._root) {
      this._root = this.render().root
      this.renderAttribute() 
    }
    return this._root
  }
}


export function render(component, parentElement) {
  parentElement.appendChild(component.root)
}