/* eslint-disable semi */
class Data {
  constructor() {
    this.ticket = [];
    this.fullTicket = []
    this.selected = 0;
    this.text = ''
    this.fullText = ''
  }

  set getTicket(value) {
    const array = []
    value.map((o) => array.push(o))
    this.ticket = array;
  }

  get getTicket() {
    return this.ticket;
  }

  set getFullTicket(value) {
    this.fullTicket = value;
  }

  get getFullTicket() {
    return this.fullTicket;
  }

  set getSelected(value) {
    this.selected = value
  }

  get getSelected() {
    return this.selected
  }

  set getText(value) {
    this.text = value
  }

  get getText() {
    return this.text
  }

  set getFullText(value) {
    this.fullText = value
  }

  get getFullText() {
    return this.fullText
  }
}

const data = new Data()
export default data
