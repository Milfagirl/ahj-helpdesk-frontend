/* eslint-disable import/no-cycle */
/* eslint-disable import/extensions */
/* eslint-disable semi */
import axios from 'axios'
import data from './data'
import { listTable, getlistItem, modal } from './app'

export const ajaxGetTicket = () => {
  axios.get('http://localhost:7070/allTickets')
    .then((response) => {
      listTable.innerHTML = ''
      data.getTicket = response.data
      data.getTicket.map((o) => getlistItem(listTable, o))
      data.getSelected = ''
    })
    .catch((error) => {
      console.log(error)
    })
}

export const ajaxGetFullTicket = (id) => {
  axios.get(`http://localhost:7070/fullTickets/${id}`)
    .then((response) => {
      data.getFullTicket = response.data
      const elem = document.querySelectorAll(`[data-p="${data.getSelected}"]`)[0]
      const newElem = `<p class='full'>${data.getFullTicket.fullText}</p>`
      elem.insertAdjacentHTML('beforeend', newElem)
      data.getSelected = ''
    })
    .catch((error) => {
      console.log(error)
    })
}

export const ajaxNewTicket = (formData) => {
  axios({
    method: 'post',
    url: 'http://localhost:7070/setTickets',
    data: JSON.stringify(formData),
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Credentials': true },
  })
    .then(() => {
      modal.style.display = 'none'
      ajaxGetTicket()
    })
    .catch((error) => {
      console.log(error)
    })
}

export const ajaxInfo = (id) => {
  axios.get(`http://localhost:7070/allTickets/${id}`)
    .then((response) => {
      console.log(response.data)
      data.getText = response.data.text
      data.getFullText = response.data.fullText
      console.log(data.getText)
      console.log(data.getFullText)
      document.forms.formAdd.text.value = data.getText
      document.forms.formAdd.fullText.value = data.getFullText
    })
    .catch((error) => {
      console.log(error)
    })
}

export const ajaxTicketChange = (id, formData) => {
  axios({
    method: 'post',
    url: `http://localhost:7070/setTickets/${id}`,
    data: JSON.stringify(formData),
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Credentials': true },
  })
    .then(() => {
      modal.style.display = 'none'
      data.getSelected = ''
      ajaxGetTicket()
    })
    .catch((error) => {
      console.log(error)
    })
}

export const ajaxDeleteTicket = (id) => {
  axios({
    method: 'post',
    url: `http://localhost:7070/deleteTicket/${id}`,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Credentials': true },
  })
    .then(() => {
      modal.style.display = 'none'
      ajaxGetTicket()
    })
    .catch((error) => {
      console.log(error)
    })
}
