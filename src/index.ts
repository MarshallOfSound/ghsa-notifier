import { Webhooks, createNodeMiddleware } from '@octokit/webhooks';
// import { WebClient } from '@slack/web-api';
import * as http from 'http';

// const slackClient = new WebClient(process.env.SLACK_TOKEN);

const webhooks = new Webhooks({
  secret: process.env.WEBHOOK_SECRET || 'development',
});

webhooks.onAny(async (event: any) => {
  if (event.name === 'repository_advisory' && event.payload.action === 'reported') {
    console.log(event);
  }
});

http.createServer(createNodeMiddleware(webhooks)).listen(process.env.PORT);
