const pptr = require('puppeteer-core');
const fs = require('fs');
(async () => {
    const browser = await pptr.launch({
        /*headless: false,*/
        executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe'
    });
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(120000);
    await page.goto('https://dramasq.cc/a/m3u8/?ref=_DqdQaHR0cHM6Ly92MTAuZGlvdXMuY2MvMjAyMTA4MTUvRjRhSVp3TFAvaW5kZXgubTN1OA',
        { waitUntil: "networkidle2" });

    //DONT use frame
    async function waitUntilStuffExistThenClick(var_string_dom_selector) {
        if (await page.$(var_string_dom_selector) !== null) {
            process.stdout.write("found ");
            console.log(var_string_dom_selector);
            try {
                await page.click(var_string_dom_selector);
            } catch (error) {
                console.log(error);
            }
        }
        else {
            cant_find_count++;
            process.stdout.write("X");
            if (cant_find_count > 20) {
                console.log("ERROR!cant_find_count > var_int_cant_find_count, stop!")
                return null;
            } else {
                return new Promise((resolve) => {
                    // wait 3s before calling fn(par)
                    setTimeout(() => resolve(waitUntilStuffExistThenClick(var_string_dom_selector)), 3000);
                });
            }
        }
    }
    await waitUntilStuffExistThenClick('.dplayer-video-wrap');

    page.on('response', response => {
        if (response.request().resourceType() === 'xhr') {
            var url = response.url();
            console.log(url);

            // specify the path to the file, and create a buffer with characters we want to write
            var path = url.substring(url.lastIndexOf('/') + 1);
            var bufferPromise = response.buffer();

            bufferPromise.then((buffer) => {
                // open the file in writing mode, adding a callback function where we do the actual writing
                fs.open(path, 'w', function (err, fd) {
                    if (err) {
                        throw 'could not open file: ' + err;
                    }

                    // write the contents of the buffer, from position 0 to the end, to the file descriptor returned in opening our file
                    fs.write(fd, buffer, 0, buffer.length, null, function (err) {
                        if (err) throw 'error writing file: ' + err;
                        fs.close(fd, function () {
                            console.log('wrote the file successfully');
                        });
                    });
                });
            });
        }
    });

    /*have error due to complex iframe ...
    var cant_find_count = 0;
    async function waitUntilStuffExistThenReturnFindObject(fucn_selector, var_int_delay_ms, var_int_cant_find_count) {
        if (fucn_selector !== null) {
            console.log("O");
            return fucn_selector;
        }
        else {
            cant_find_count++;
            process.stdout.write("X");
            if (cant_find_count > var_int_cant_find_count) {
                console.log("ERROR!cant_find_count > var_int_cant_find_count, stop!")
                return null;
            } else {
                return new Promise((resolve) => {
                    // wait 3s before calling fn(par)
                    setTimeout(() => resolve(waitUntilStuffExistThenReturnFindObject(fucn_selector, var_int_delay_ms, var_int_cant_find_count)), var_int_delay_ms);
                });
            }

        }
    }
    //const frame = page.frames().find(f => f.name() === 'iframe');
    const frame = await waitUntilStuffExistThenReturnFindObject(function () { return page.frames().find(f => f.name() === 'iframe') }, 20, 3000);

    //const button = await frame.$('.dplayer-video-wrap');
    //button.click();
    cant_find_count = 0;
    var button = await waitUntilStuffExistThenReturnFindObject(async function () { return await frame.$('.dplayer-video-wrap'); }, 20, 3000);
    const clickLogin = await frame.click('.dplayer-video-wrap');*/
})();