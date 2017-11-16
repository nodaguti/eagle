import { Client as EventHubClient } from 'azure-event-hubs';
import DB from './_kvs';

const connectionString = 'HostName=washi.azure-devices.net;SharedAccessKeyName=iothubowner;SharedAccessKey=7RGaz4Yx01oSWrW2pSUmHkvP8eihElMfz5q98a2wAdI=';
const client = EventHubClient.fromConnectionString(connectionString);

const registerListeners = async ({ onError, onMessage }) => {
  const partitionIds = await client
    .open()
    .then(client.getPartitionIds.bind(client));

  for (let partitionId of partitionIds) {
    const receiver = await client.createReceiver('$Default', partitionId, { 'startAfterTime': Date.now() })
    console.log(`Created partition receiver: ${partitionId}`);
    receiver.on('errorReceived', onError);
    receiver.on('message', onMessage);
  }
};

(async () => {
  await registerListeners({
    onMessage: (msg) => {
      console.log(JSON.stringify(msg.body));
      DB.set('telemetry', JSON.stringify(msg.body));
    },
    onError: (err) => console.error(err),
  });

  console.log('listener registered!');
})();

const api = {
  async telemetry(ctx) {
    const telemetry = DB.get('telemetry');

    ctx.body = JSON.parse(telemetry);
    ctx.status = 200;
  },
};

export default function (router) {
  router.get('/api/device/telemetry', api.telemetry);
}
