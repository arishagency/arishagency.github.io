"use strict";

var Promise = require("bluebird"),
    glob = require("glob"),
    moment = require("moment"),
    RSS = require("rss"),
    dates = require("../lib/dates"),
    resolvePaths = require("../lib/paths"),
    compileDrafts = require("../lib/drafts"),
    fs = require("fs"),
    globalVar = JSON.parse(fs.readFileSync("./site.json", "utf8"));

module.exports = function (rootPath) {
    return new Promise(function(resolve, reject) {
        var gulpVersion = require("gulp/package").version;

        glob(globalVar.distFolder + "/content/posts/*.json", {
            cwd: "."
        }, function (err, files) {
            if (err) {
                reject(err);
            } else {
                var posts = [];

                files.forEach(function (file) {
                    var fileData = JSON.parse(fs.readFileSync(file, "utf8"));

                    if (fileData.status && fileData.status === "draft" && !compileDrafts()) {
                        return;
                    }

                    var metaData = {
                        title: fileData.title,
                        description: resolvePaths.resolve(fileData.body, globalVar.url),
                        url: globalVar.url + "/" + fileData.slug + "/",
                        tags: (fileData.tags ? (fileData.tags.split ? fileData.tags.split(" ") : fileData.tags) : undefined), // tags can be either string or array
                        date: fileData.date
                    };

                    posts.push(metaData);
                });

                if (posts.length) {

                    var feed = new RSS({
                        title: globalVar.title,
                        description: globalVar.description,
                        generator: "Gulp " + gulpVersion,
                        site_url: globalVar.url,
                        feed_url: globalVar.url + "/rss.xml",
                        ttl: 60
                    });

                    posts.sort(dates.sortFunc);

                    posts.forEach(function (item) {
                        feed.item({
                            title: item.title,
                            description: item.description,
                            url: item.url,
                            guid: item.url,
                            categories: item.tags,
                            date: moment(item.date, "YYYY-MM-DD").toDate()
                        });
                    });

                    var xml = feed.xml();

                    fs.writeFile(globalVar.distFolder + "/rss.xml", xml, {
                        encoding: "utf8"
                    }, function (err) {
                        if (err) {
                            reject(err);
                        }
                        resolve();
                    });
                } else {
                    resolve();
                }
            }
        });
    });
};
