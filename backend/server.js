var moment = require('moment');
const http = require('http');
const Koa = require('koa');
const Router = require('koa-router');
const cors = require('koa2-cors');
const koaBody = require('koa-body');

const app = new Koa();
app.use(cors());
app.use(koaBody({
  json: true,
}));

moment.locale('ru')
const router = new Router();

let nextId = 1;
let ticket = [
  {
    id: nextId++, text: 'Поменять краску в принтере', date: '10.03.2019', time: '08:40',
  },
  {
    id: nextId++, text: 'Переустановить Wind', date: '15.03.2019', time: '12:35',
  },
  {
    id: nextId++, text: 'Установить обновление', date: '15.03.2019', time: '12:40',
  }
];
nextId = 1;
let ticketFull = [
  {
    id: nextId++, fullText: 'Поменять краску в принтере', date: '10.03.2019', time: '08:40',
  },
  {
    id: nextId++, fullText: 'Переустановить Wind', date: '15.03.2019', time: '12:35',
  },
  {
    id: nextId++, fullText: 'Установить обновление', date: '15.03.2019', time: '12:40',
  }
];

router.get('/allTickets', async (ctx) => {
  ctx.response.body = ticket;
});

router.post('/setTickets', async (ctx) => {
  const date = moment().format('L')
  const time = moment().format('LT')
  const {
    text, fullText
  } = ctx.request.body;
  const id = ticket.length+ 1;
  ticket.push({
    id, text, date, time
  });
  ticketFull.push({
    id, fullText, date, time
  });
  ctx.response.body = ticketFull;
});

router.get(`/allTickets/:id`, async (ctx) => {
  const id = Number(ctx.params.id);
  const text = (ticket.find((o) => o.id === id)).text
  const fullText = (ticketFull.find((o) => o.id === id)).fullText
  ctx.response.body = { text, fullText };
});

router.post('/setTickets/:id', async (ctx) => {
  const date = moment().format('L')
  const time = moment().format('LT')
  const {
    text, fullText
  } = ctx.request.body;
  const id = ctx.params.id
  ticket.map((o) => {
    if (o.id === Number(id)) {
      o.text = text
      o.date = date
      o.time = time
    }
  })
  ticketFull.map((o) => {
    if (o.id === Number(id)) {
      o.fullTtext = fullText
      o.date = date
      o.time = time
    }
  })
  ctx.response.body = ticketFull;
});

router.post('/deleteTicket/:id', async (ctx) => {
  const id = Number(ctx.params.id)

  ticket = ticket.filter((arr) => arr.id !== id);
  nextId = 1
  ticket.map(arr => arr.id = nextId++)
  ticketFull = ticketFull.filter((arr) => arr.id !== id);
  nextId = 1
  ticketFull.map(arr => arr.id = ticketFull.indexOf(arr) + 1)
  ctx.response.body = ticketFull;
});

app.use(router.routes());
app.use(router.allowedMethods());


const port = process.env.PORT || 7070;
const server = http.createServer(app.callback());
server.listen(port, () => console.log('server started on http://localhost: 7070'));
