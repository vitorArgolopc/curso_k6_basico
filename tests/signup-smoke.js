import http from 'k6/http';
import { check, sleep } from 'k6';

import uuid from './libs/uuid.js';

export const options = {
  vus: 1,
  duration: '1m',
  http_req_duration: ['p(95)<2000'], // 95% das requisi��es devem responder em at� 2s
  http_req_failed: ['rate<0.01'] //1% das requisi��es podem ocorrer erro
}

export default function () {
  const url = 'http://localhost:3333/signup'

  const payload = JSON.stringify(
    {email: `${uuid.v4().substring(24)}@qa.qacademy.com.br`, password: 'pwd123'}
    )
  
  const headers = {
    'headers': {
      'Content-Type' : 'application/json'
    }
  }
  const res = http.post(url, payload, headers)
  console.log(res.body)
  check(res,{
    'status should be 201': (r) => r.status === 201
  })

  sleep(1);
}
