import http from "k6/http";
import { group, check } from "k6";

export const options = {
  vus: 10,
  duration: "30s",
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<200'], 
  },
};

export default function () {
  group("auth", () => {
    const response = http.post(
      "http://localhost:3001/authentication",
      {
        email: "dfgfdg@sfdsdf.com",
        password: "sdfsdfsd!2341",
      },
      { "Content-Type": "application/json" }
    );
  
    check(response, {
      'is status 401': (r) => r.status === 401,
    });
  })
}
