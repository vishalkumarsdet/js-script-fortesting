import http from 'k6/http';
import { sleep } from 'k6';
import { check } from 'k6';
import { Trend, Rate, Counter } from 'k6/metrics';

// This will export to HTML as filename "result.html" AND also stdout using the text summary
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

export let options = {
    stages: [
        { duration: '30s', target:10 },  // Ramp-up to 20 users over 30 seconds
        { duration: '1m', target: 20 },   // Maintain 20 users for 1 minute
        { duration: '30s', target: 0 }  // Ramp-up to 50 users over 30 seconds
        // { duration: '2m', target: 50 },   // Maintain 50 users for 2 minutes
        // { duration: '30s', target: 100 }, // Ramp-up to 100 users over 30 seconds
        // { duration: '3m', target: 100 },  // Maintain 100 users for 3 minutes
        // { duration: '30s', target: 50 },  // Ramp-down to 50 users over 30 seconds
        // { duration: '1m', target: 50 },   // Maintain 50 users for 1 minute
        // { duration: '30s', target: 20 },  // Ramp-down to 20 users over 30 seconds
        // { duration: '1m', target: 20 },   // Maintain 20 users for 1 minute
        // { duration: '30s', target: 0 }    // Ramp-down to 0 users over 30 seconds
    ],
    thresholds: {
        http_req_duration: ['p(95)<500'], // 95% of requests must complete below 500ms
    },
    summaryTrendStats: ['avg', 'p(95)', 'max', 'med'], // Include additional summary statistics in the HTML report
    ext: {
        loadimpact: {
            name: 'Sample API Load Test', // Test name for the report
            projectID: 12345, // Replace with your project ID (optional)
        },
    },
    // Define thresholds for custom metrics if needed
};

// Define custom metrics if needed
let errorRate = new Rate('errors');
let successRate = new Rate('success');

export default function () {
    // Define the URL endpoint for your POST request
  const url = 'example.com';

  // Define the JSON request body
  const payload = JSON.stringify({
    "accrues": [
        {
            "accrualId": "d9e1eeda-c94a-4acc-b9c7-686bfa059a47",
            "memberId": "23812345",
            "gamekey": "deal-or-no-deal",
            "amount": {
                "amount": 1,
                "currency": "GBP"
            },
            "progressiveId": {
                "gameProgressiveId": "DealOrNoDealStateful3USA", //gameId
                "referenceId": "bd7af5a6-e86f-d4dc-78a9-4cc4814df9ef" // Pool UUID
            }
        }
    ],
    "website": "ballycasinonj"
  });

  // Define HTTP headers
  const headers = {
    'Content-Type': 'application/json',
  };

  // Send POST request
  const response = http.post(url, payload, { headers: headers });

    // let response = http.get('localhost:8080/progressive/accrues');
    
    // Verify response
    let checkRes = check(response, {
        'is status 200': (r) => r.status === 200
    });
    
    // Record custom metrics based on verification result
    if (checkRes) {
        successRate.add(1);
    } else {
        errorRate.add(1);
    }

    // Add a sleep to simulate user pacing
    sleep(1);
}

export function handleSummary(data) {
    return {
      "result.html": htmlReport(data),
      stdout: textSummary(data, { indent: " ", enableColors: true }),
    };
  }

// Generate HTML report at the end of the test
// export function handleSummary(data) {
//     return {
//         'summary.html': htmlReport(data), // Save HTML report to a file named 'summary.html'
//     };
// }
