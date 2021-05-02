
//jlogs - > jdebugs;

// jlogs.js
if (typeof jlogs !== 'function') jlogs = function () {
    var str = ':: ';
    for (var i in arguments) {
        // console.log('--- jlogs', typeof arguments[i]);

        if (typeof arguments[i] === "undefined") {
            str += '';
        } else if (typeof arguments[i] === "boolean") {
            str += arguments[i];
        } else if (typeof arguments[i] === "number") {
            str += arguments[i];
        } else if (typeof arguments[i] === "string") {
            str += arguments[i];
            // str += arguments[i].innerHTML;
        } else if (typeof arguments[i] === "object") {
            str += JSON.stringify(arguments[i]);
        } else {
            str += xml2string(arguments[i]);
        }
        str += ', ';
    }
    console.log(str);
    return str;
}

/**
 *
 * @param url
 * @param success
 * @param error
 * @returns {html|boolean}
 */
function let_json(url, success, error) {
    var f = 'loadJson';


    if (typeof success !== 'function') {
        success = function () {
            jlogs(f, ' success ', "included");
        }
    }

    if (typeof error !== 'function') {
        error = function () {
            jlogs(f, ' error ', "Page not found.");
        }
    }
    jlogs(f, ' url ', url);

    if (url.length > 5) {

        /* Make an HTTP request using the attribute value as the url name: */
        var xhrObj = getXHRObject();
        // xhrObj.setRequestHeader("Content-Type","text/html; charset=UTF-8");
        // xhrObj.setRequestHeader("Content-Type","multipart/form-data; boundary=something");
        xhrObj.onreadystatechange = function () {

            if (this.readyState == 4) {
                // document.onload =
                loadJsonByStatus(this.status, this.responseText, url, success, error);

                /* Remove the attribute, and call this function once more: */
                // loadJson(url, success, error);
            }
        }
        xhrObj.open("GET", url, true);
        // xhrObj.responseType = 'text';
        xhrObj.setRequestHeader('Content-type', 'application/json; charset=utf-8');

        xhrObj.send();
        /* Exit the function: */
        return success(this);
    }
    return false;
}

// xhr.js
jlogs('exist?','getXHRObject');
/**
 * @returns {boolean}
 */
function getXHRObject() {
    var xhrObj = false;
    try {
        xhrObj = new XMLHttpRequest();
    } catch (e) {
        var progid = ['MSXML2.XMLHTTP.5.0', 'MSXML2.XMLHTTP.4.0',
            'MSXML2.XMLHTTP.3.0', 'MSXML2.XMLHTTP', 'Microsoft.XMLHTTP'];
        for (var i = 0; i < progid.length; ++i) {
            try {
                xhrObj = new ActiveXObject(progid[i]);
            } catch (e) {
                continue;
            }
            break;
        }
    } finally {

        return xhrObj;
    }
}

/**
 * @param status
 * @param responseText
 * @param url
 * @param success
 * @param error
 * @returns {*}
 */
function loadJsonByStatus(status, responseText, url, success, error) {
    var f = 'loadJsonByStatus';

    if (status == 200) {
        jlogs(f, ' loadJson loaded HTML: ', responseText);
        return success(JSON.parse(responseText), url);
    }
    if (status == 404) {
        getTarget(target).innerHTML = "loadJson Page not found.";
        return error(this, status);
    }
    return error(responseText);
}

function loadJson2(url) {
        jlogs(this.constructor.name, ' self.cfg.target ', self.cfg.target);

        if (typeof url === 'object') {
            //log(this.constructor.name, 'obj:', obj);
            var last = false;
            var len = url.length - 1;
            for (var i in url) {
                last = (len == i);
                jlogs(this.constructor.name, ' json url.length ', len, i, last);

                var script_url = self.getEnvUrl(url[i]);
                jlogs(this.constructor.name, ' json script_url ', script_url);

                try {
                    // if (last) {
                    includeJson(script_url, self.cfg.target, self.cfg.replace, self.success, self.error);
                    // } else {
                    //     var exe = includeJson(script_url, self.cfg.target, self.cfg.replace, self.success, self.error);
                    // }
                    jlogs(this.constructor.name, ' json ', script_url);
                } catch (e) {
                    err('! json ', script_url, e);
                    // error();
                }
            }
        } else {
            loadJson(self.getEnvUrl(url), self.cfg.target, self.cfg.replace, self.success, self.error);
            // err('apiunit obj: is not object:', obj);
        }

        return self;
};



if (typeof err !== 'function') err = function () {
    var str = ':: ';
    for (var i in arguments) {
        str += arguments[i];
        str += ', ';
    }
    console.error(str);
    return str;
}
