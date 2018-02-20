"use strict";
/*jslint browser:true, todo: true*/
/*global chrome, URL, Blob*/

// interval to open / refresh tabs in seconds
var INTERVAL = 5;

// list of URLS to check
var URL_LIST = [
    'https://www.google.com/',
    'https://www.facebook.com/'
];

console.log('starting the extension');

function refreshOpenTab(url) {
    var code = 'window.location.reload();';

    chrome.tabs.query({
    }, function (tabs) {
        // refresh first found one
        var i, isFound = false;
        for (i = 0; i < tabs.length; i += 1) {
            //console.log(" checking for " + url + " against " + tabs[i].url)
            if (tabs[i].url === url) {
                console.log("Found! " + url);
                chrome.tabs.executeScript(tabs[i].id, {code: code});
                isFound = true;
            }
        }

        if (!isFound) {
            chrome.tabs.create({ url: url });
        }
    });
}

function backgroundJob() {
    var i;

    for (i = 0; i < URL_LIST.length; i += 1) {
        refreshOpenTab(URL_LIST[i]);
    }
}

setInterval(backgroundJob, INTERVAL * 1000);
