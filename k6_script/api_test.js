import http from 'k6/http';
import { sleep } from 'k6';
import { check } from 'k6';
import { Trend, Rate, Counter } from 'k6/metrics';
import { htmlReport } from 'https://jslib.k6.io/k6-html-report/0.0.11/index.js';

export let options = {
    stages: [
        { duration: '30s', target: 20 },  // Ramp-up to 20 users over 30 seconds
        { duration: '1m', target: 20 },   // Maintain 20 users for 1 minute
        { duration: '30s', target: 50 },  // Ramp-up to 50 users over 30 seconds
        { duration: '2m', target: 50 },   // Maintain 50 users for 2 minutes
        { duration: '30s', target: 100 }, // Ramp-up to 100 users over 30 seconds
        { duration: '3m', target: 100 },  // Maintain 100 users for 3 minutes
        { duration: '30s', target: 50 },  // Ramp-down to 50 users over 30 seconds
        { duration: '1m', target: 50 },   // Maintain 50 users for 1 minute
        { duration: '30s', target: 20 },  // Ramp-down to 20 users over 30 seconds
        { duration: '1m', target: 20 },   // Maintain 20 users for 1 minute
        { duration: '30s', target: 0 }    // Ramp-down to 0 users over 30 seconds
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
    let response = http.get('https://your-api-endpoint.com/');
    
    // Verify response
    let checkRes = check(response, {
        'is status 200': (r) => r.status === 200,
        'is content type HTML': (r) => r.headers['Content-Type'] === 'text/html;charset=ISO-8859-1',
        'is title correct': (r) => r.body.includes('<title>Error 400 Bad Request</title>'),
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

// Generate HTML report at the end of the test
export function handleSummary(data) {
    return {
        'summary.html': htmlReport(data), // Save HTML report to a file named 'summary.html'
    };
}
