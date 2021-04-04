loadJson = function (url) {
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


if (typeof err !== 'function') err = function () {
    var str = ':: ';
    for (var i in arguments) {
        str += arguments[i];
        str += ', ';
    }
    console.error(str);
    return str;
}
