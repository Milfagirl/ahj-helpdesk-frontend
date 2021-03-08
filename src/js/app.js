/* eslint-disable import/named */
/* eslint-disable import/no-cycle */
/* eslint-disable import/extensions */
/* eslint-disable no-unused-vars */
/* eslint-disable semi */
import { ajaxGetTicket, ajaxNewTicket, ajaxInfo, ajaxTicketChange, ajaxDeleteTicket } from './api.js'
import data from './data.js'

export const listTable = document.querySelector('.list table')
export const container = document.querySelector('.container')
export const list = document.querySelector('.list')
export const modal = document.querySelector('.modal')
const btnAdd = document.querySelector('#add')
const formAdd = document.getElementById('formAdd')
const resetNew = document.querySelector('.resetNew')
const tr = document.querySelectorAll('tr')

export const getlistItem = (element, value) => {
  const row = `<tr data-id = ${value.id} class = 'list-table-tr'>
                    <td><input type="checkbox" id=${value.id} name=${value.id}>
                    <label for=${value.id} class='tr-text'>${value.text}</label>
                    </td>
                    <td>${value.date}</td>
                    <td>${value.time}</td>
                    <td><button data-id = "edit" class = "edit">&#128393</button><button data-id = "delete" class="delete">&#10006</button></td>
                </tr>`;
  element.insertAdjacentHTML('beforeEnd', row);
}

window.addEventListener('load', () => {
  ajaxGetTicket()
})

btnAdd.addEventListener('click', (e) => {
  e.preventDefault()
  formAdd.style.display = 'block'
})

list.addEventListener('click', (e) => {
  data.getSelected = e.target.closest('tr') && Number(e.target.closest('tr').dataset.id)
  console.log(data.getSelected)
})

formAdd.addEventListener('submit', async (e) => {
  e.preventDefault()
  const formData = new FormData(formAdd)
  let dataObj = {}
  for (let pair of formData.entries()) {
    dataObj = { ...dataObj, [pair[0]]: pair[1] }
    console.log(pair[0] + ', ' + pair[1]);
  }
  console.log(dataObj)
  data.getSelected ? ajaxTicketChange(data.getSelected, dataObj) : ajaxNewTicket(dataObj)
  formAdd.reset()
})

resetNew.addEventListener('click', (e) => {
  e.preventDefault()
  formAdd.reset()
  formAdd.style.display = 'none'
})

document.addEventListener('click', (e) => {
  if (e.target.dataset.id === 'edit') {
    ajaxInfo(data.getSelected)
    formAdd.style.display = 'block'
  }
  if (e.target.dataset.id === 'delete') {

    const customConfirm = `<div class = 'customConfirm'>
                           <div style="text-align:center">Удалить тикет</div>
                           <div style="text-align:center">Вы уверены, что хотите удалить тикет № ${data.getSelected}?</div>
                           <div style = "display:flex;justify-content: flex-end;">
                           <button class ="btn btn-secondary ok" style = "border-radius:5px">Ok</button>
                           <button class = "btn btn-secondary delete" style = "margin-left: 5px; border-radius:5px">Отмена</button>
                           </div>
                           </div>`;

    (document.querySelector('body')).insertAdjacentHTML('afterbegin', customConfirm)
    const elem = document.querySelector('.customConfirm')
    elem.querySelector('.ok').onclick = () => {
      console.log(data.getSelected)
      if (!data.getSelected) {
        confirm('Проставьте галочку на выбранный тикет')
      } else {
        ajaxDeleteTicket(data.getSelected)
        elem.remove()
      }
    }
    elem.querySelector('.delete').onclick = () => elem.remove()
    // ajaxDeleteTicket(data.getSelected)
  }
})