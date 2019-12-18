# Custom widget for NLP

## NTP
Time is an important point in our system. We have to keep synchronization between each services to ensure consistency
regarding logging, tracking, ...
We are using `ntp-time-sync` to do that and we have to configure the ntp server pool as a comma separated string in
the env `NTP_SERVER_POOL=0.pool.ntp.org,1.pool.ntp.org,2.pool.ntp.org`. This information is read at the startup and
a clock perform synchronisation at a frequency defined in the configuration `NTP_SYNC_DELAY=5000` (the duration is in
milliseconds).
[ntp-time-sync](https://www.npmjs.com/package/ntp-time-sync)

Timesync between node may be manage using a peer to peer approach.
[timesync](https://www.npmjs.com/package/timesync).

## Timezone
We are using `moment` and `moment-timezone` to manage date. The timezone is provided through the env var `SERVER_TIMEZONE`. We are initializing date using this kind of code
```javascript
const moment = require('moment-timezone');
//...
const {SERVER_TIMEZONE} = process.env;
//...
function getDate(config) {
  return moment().tz(config['SERVER_TIMEZONE']).format();
}
//...
```
[moment-timezone](https://momentjs.com/timezone/docs/) & [moment](https://momentjs.com/docs/)

## Env

Current configuration of the env

```bash
HOST=0.0.0.0
PORT=5432
INDEX_NAME=ratings
ELASTIC_URL=http://localhost:9200
ELASTIC_USERNAME=
ELASTIC_PASSWORD=
NTP_SYNC_DELAY=5000
SERVER_TIMEZONE=Europe/Zurich
```

If `ELASTIC_USERNAME` or `ELASTIC_PASSWORD` is empty, no auth will be used for elasticsearch.