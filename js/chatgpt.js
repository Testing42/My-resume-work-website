const fs = require('fs');
const axios = require('axios');

const pa11yReportPath = './pa11y-report.json';
const chatGptApiKey = process.env.CHATGPT_API_KEY;

async function sendReportToChatGpt() {
  try {
    const report = JSON.parse(fs.readFileSync(pa11yReportPath, 'utf8'));

    const message = `Here's the ADA compliance report:\n\n${JSON.stringify(report, null, 2)}`;

    const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
      prompt: message,
      max_tokens: 150,
      n: 1,
      stop: null,
      temperature: 0.7
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${chatGptApiKey}`
      }
    });

    console.log('Report sent to ChatGPT:', response.data.choices[0].text);
  } catch (error) {
    console.error('Error sending report to ChatGPT:', error);
    process.exit(1);
  }
}

sendReportToChatGpt();
