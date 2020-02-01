(function () {
    'use strict';

    var CLASS_DATA_TARGET = "dataTarget";
    var CLASS_INCLUDER = "includer";
    var ATTRIB_NAME = "attribName";
    var VIDEO_SOURCE = "vid_src";
    var PUBLISHED_AT = "publishedAt"
    var SECTION_NAME = "secname";
    var ERROR_404 = "Page not found.";
    var HTML_SUFFIX = ".html";
    var YT_PREFIX = "https://www.youtube.com/embed/";
    var ERROR_PAGE = "/Error404.html";
    var WATCH_PAGE = "watch.html";
    var HOME_URL = "/data/home.json";
    var RELATED = "related";
    var TRACK_URL = "trackUrl";
    var pageData = null;
    var homeData = null;
    var isHome;
    var dateOtions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    var TOTAL_RELATED = 5;
    var getUrl = function () {
        var currentUrl = window.location.href;
        if (currentUrl.indexOf(WATCH_PAGE) == -1) {
            console.log("Getting home page data");
            isHome = true;
            return HOME_URL;
        }
        isHome = false;
        var url = new URL(currentUrl);
        var dataValue = url.searchParams.get("v");
        console.log(dataValue);
        return "/data/" + dataValue + ".json";
    }

    var getUrlData = function (url) {
        var xhttp = new XMLHttpRequest();
        var result;
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    result = JSON.parse(this.responseText);
                    console.log("Page data loading complete...");
                }
                if (this.status == 404) {
                    console.log("Page data loading failed...");
                    window.location.href = ERROR_PAGE;
                }
            }
        };
        xhttp.open("GET", url, false);
        xhttp.send();
        return result;
    }

    var setPageData = function () {
        var elmnt;
        var index;
        var attribName;
        var pdate;
        var dataTargets = document.getElementsByClassName(CLASS_DATA_TARGET);
        for (index = 0; index < dataTargets.length; index++) {
            elmnt = dataTargets[index];
            attribName = elmnt.getAttribute(ATTRIB_NAME);
            if (!!attribName) {
                if (attribName == VIDEO_SOURCE) {
                    elmnt.src = YT_PREFIX + pageData[attribName];
                } else if (attribName == PUBLISHED_AT) {
                    pdate = new Date(pageData[attribName]);
                     elmnt.innerHTML = "Published on " + pdate.toLocaleDateString("en-US", dateOtions)
                } else if (attribName == TRACK_URL) { 
                    elmnt.setAttribute("data-href", "http://www.arputhangal.com/watch.html?v=" + pageData[VIDEO_SOURCE]);
                } else {
                    elmnt.innerHTML = pageData[attribName];
                }
            }
        };
    }

    var setPageDocument = function () {
        var elmnt;
        var index;
        var xhttp;
        var sectionName;
        console.log("Setting page document...")
        var includers = document.getElementsByClassName(CLASS_INCLUDER);
        console.log("Processing " + includers.length + " includers");

        for (index = 0; index < includers.length; index++) {
            elmnt = includers[index];
            sectionName = elmnt.getAttribute(SECTION_NAME);
            if (!!sectionName) {
                xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function () {
                    if (this.readyState == 4) {
                        if (this.status == 200) {
                            elmnt.innerHTML = this.responseText;
                            setPageData();
                        }
                        if (this.status == 404) {
                            elmnt.innerHTML = ERROR_404;
                        }
                        elmnt.removeAttribute(SECTION_NAME);
                        setPageDocument();
                    }
                }
                xhttp.open("GET", sectionName + HTML_SUFFIX, false);
                xhttp.send();
                return;
            }
        };
    }

    var collectionHtmlPrefix = '<div class="thumbnail u-pull-left "> <a href="watch.html?v=';
    var collectionHtmlSuffix = '"><img src="https://img.youtube.com/vi/';
    var collectionHtmlEnd = '/mqdefault.jpg" /></a></div>';

    var getRandomRelated = function() {
        var shuffled = homeData.sort(() => 0.5 - Math.random());
        var selected = shuffled.slice(0, TOTAL_RELATED);
        return selected;
    }
    var createCollection = function () {
        var collectionDataDiv = document.getElementById("colData");
        var colHtml = '';
        var collectionIds;
        if (!!isHome) {
            collectionIds = pageData;
        } else {
            collectionIds = getRandomRelated();
        }
        collectionIds.forEach(function (urlId) {
            console.log(urlId);
            colHtml += collectionHtmlPrefix + urlId + collectionHtmlSuffix + urlId + collectionHtmlEnd;
        });
        collectionDataDiv.innerHTML = colHtml;
    }
    
    var url = getUrl();
    pageData = getUrlData(url);
    homeData = getUrlData(HOME_URL);
    setPageDocument();
    createCollection();
})();
