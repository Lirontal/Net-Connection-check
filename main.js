var ping = require('ping');
var moment = require('moment'); // require
const prompt = require('prompt-sync')();

let TimesofFall = []
let lastCheck = true;
let delay=0;
let hosts = ['8.8.8.8', 'google.com', 'yahoo.com'];


async function startPings() {
    let countAlives = 0;

    for (let host of hosts) {
        let res = await ping.promise.probe(host);
        //console.log(res.alive);
        res.alive && countAlives++
        !res.alive && console.log(host)
    }
    if (countAlives < hosts.length - 1) {
        if (lastCheck) {
            TimesofFall.push(moment().format('DD/MM/YYYY, h:mm:ss a'))
            lastCheck = false;
        }
    }
    else {
        lastCheck = true;
    }
    console.log(`Connection has fallen ${TimesofFall.length} times`)
    TimesofFall.length && console.log(`Times: ${TimesofFall}`)

    runSelf();

}

function runSelf() {
    setTimeout(() => startPings(), delay * 1000);
}

setImmediate(() => {
    const inputDelay = prompt('Enter delay between each examination (in seconds)');
    delay=Number(inputDelay)

    console.log(`Starting to examine ${hosts.join(', ')} at ${moment().format('DD/MM/YYYY, h:mm:ss a')}`)
    console.log(`Delay: ${delay} seconds`)
    startPings()
});


