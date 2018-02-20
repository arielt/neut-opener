# Neut opener

Periodically opens listed URLs. Change list of URLs and interval, reload
the extension. If tab with URL is already open, it will be refreshed.

Supported browsers:

* Firefox

* Chrome

## List of URLs

Update list of URLs in src/background_page.js: URL_LIST.
URLs will be matched exactly.

Remember, browser usually doesn't show trailing slash
if the path is empty, meaning 'https://www.google.com/' is displayed as 'https://www.google.com'.
To make sure you put the right URL in the list, type it in the browser, load and copy it out.

## Interval

Update INTERVAL in src/background_page.js, time is in seconds.
