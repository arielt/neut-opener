"use strict";
/*jslint browser:true, todo: true*/
/*global chrome, URL, Blob*/

// interval to open / refresh tabs in seconds
var INTERVAL = 60;

// list of URLs to check
var URL_LIST = [
    'https://vimeo.com/242439781?autoplay=1&autopause=0',
    'https://vimeo.com/257848317?autoplay=1&autopause=0'
];

var createdTabIds = [];

function createCallback(tab) {
    createdTabIds.push(tab.id);
}

// old implementation, not in use
function refreshOpenTab(url) {
    var code = 'window.location.reload();';

    chrome.tabs.query({
    }, function (tabs) {
        // refresh first found one
        var i, isFound = false;
        for (i = 0; i < tabs.length; i += 1) {
            if (tabs[i].url === url) {
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
    var i, url;

    // close created tabs
    chrome.tabs.remove(createdTabIds);
    createdTabIds = [];

    // open tabs
    for (i = 0; i < URL_LIST.length; i += 1) {
        // refreshOpenTab(URL_LIST[i]);
        url = URL_LIST[i];
        chrome.tabs.create({ url: url }, createCallback);
    }
}

// run first job immediatelly
backgroundJob();

// schedule following jobs
setInterval(backgroundJob, INTERVAL * 1000);
