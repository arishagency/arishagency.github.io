"use strict";

var gulp = require("gulp"),
    Promise = require("bluebird"),
    compileHandlebars = require("gulp-compile-handlebars"),
    rename = require("gulp-rename"),
    glob = require("glob"),
    moment = require("moment"),
    _ = require("lodash"),
    compileOptions = require("../lib/compile-options"),
    tags = require("../lib/tags"),
    dates = require("../lib/dates"),
    resolvePaths = require("../lib/paths"),
    compileDrafts = require("../lib/drafts"),
    promiseList = require("../lib/promises"),
    fs = require("fs"),
    globalVar = JSON.parse(fs.readFileSync("./site.json", "utf8"));

module.exports = function (rootPath) {
    return new Promise(function(resolve, reject) {
        var gulpVersion = require("gulp/package").version;
        var compileOptionsObj = compileOptions(rootPath);

        glob(globalVar.distFolder + "/content/**/*.json", {
            cwd: "."
        }, function (err, files) {
            if (err) {
                reject(err);
            } else {
                var datePosts = {},
                    posts = [],
                    allPosts = [];

                files.forEach(function (file) {
                    var fileData = JSON.parse(fs.readFileSync(file, "utf8"));

                    if (fileData.status && fileData.status === "draft" && !compileDrafts()) {
                        return;
                    }

                    if (!fileData.date || !fileData.template) {
                        return;
                    }

                    // check and fill-in missing file meta data
                    fileData = compileOptionsObj.checkContent(fileData);

                    var metaData = {
                        title: fileData.title,
                        description: resolvePaths.resolve(fileData.body, "../.."),
                        url: "../../" + fileData.slug + "/",
                        tagStr: fileData.tags,
                        tags: (fileData.tags ? tags.getTagsAsLinks("../..", fileData.tags) : undefined),
                        date: fileData.date,
                        post_class: "post" + (fileData.tags ? tags.getTagClasses(fileData.tags) : fileData.slug),
                        meta: fileData
                    };

                    if (fileData.date && fileData.template === "post.hbs") {
                        posts.push(metaData);
                    }

                    if (fileData.date) {
                        var dateMonth = fileData.date.substr(0, 7); //2014-12
                        if (datePosts[dateMonth]) {
                            datePosts[dateMonth].push(metaData);
                        } else {
                            datePosts[dateMonth] = [metaData];
                        }
                    }
                });

                if (_.size(datePosts)) {
                    var promises = [];
                    posts.sort(dates.sortFunc);
                    allPosts = _.cloneDeep(posts);

                    for (var dateMonth in datePosts) {
                        // sort the dateMonth posts
                        datePosts[dateMonth].sort(dates.sortFunc);

                        var templateData = {
                            date: moment().format("YYYY-MM-DD"),
                            resourcePath: "../..",
                            generator: "Gulp " + gulpVersion,
                            meta_title: globalVar.title,
                            url: "../..",
                            site: globalVar,
                            posts: datePosts[dateMonth],
                            body_class: "home-template",
                            rss: "../.." + globalVar.rss,
                            dateStr: moment(dateMonth, "YYYY-MM").format("MMMM YYYY")
                        };

                        if (globalVar.maxItems && datePosts[dateMonth].length > globalVar.maxItems) {
                            // how many pages do we need to create?
                            var totalPages = Math.ceil(datePosts[dateMonth].length / globalVar.maxItems);

                            // shorten posts
                            var paginatedPosts = datePosts[dateMonth].splice(globalVar.maxItems);

                            for (var i = 1; i < totalPages; i++) {
                                var pageNumber = i + 1;
                                var nextPosts = paginatedPosts.splice(0, globalVar.maxItems);

                                // update the resource paths
                                nextPosts.forEach(function (post) {
                                    post.description = resolvePaths.resolve(post.meta.body, "../../../..");
                                    post.url = "../../../../" + post.meta.slug;
                                });

                                // create custom template data for this paginated page
                                var pageTemplateData = _.cloneDeep(templateData);
                                _.extend(pageTemplateData, {
                                    posts: nextPosts,
                                    resourcePath: "../../../..",
                                    url: "../../../..",
                                    rss: "../../../.." + globalVar.rss,
                                    allDates: dates.getAllDatesAsLinks("../../../..", allPosts),
                                    allTags: tags.getAllTagsAsLinks("../../../..", allPosts)
                                });
                                delete pageTemplateData.pages;

                                // add pagination data
                                if (pageNumber === 2) {
                                    pageTemplateData.prevUrl = "../../";
                                } else {
                                    pageTemplateData.prevUrl = "../" + (pageNumber - 1);
                                }

                                if (pageNumber < totalPages) {
                                    pageTemplateData.nextUrl = "../" + (pageNumber + 1);
                                }

                                pageTemplateData.totalPages = totalPages;

                                promises.push(new Promise(function (resolve, reject) {
                                    gulp.src(globalVar.editFolder + "/templates/index.hbs")
                                        .pipe(compileHandlebars(pageTemplateData, compileOptionsObj))
                                        .pipe(rename("index.html"))
                                        .pipe(gulp.dest(globalVar.distFolder + "/date/" + dateMonth + "/page/" + pageNumber))
                                        .on("error", reject)
                                        .on("end", resolve);
                                }));
                            }

                            templateData.nextUrl = "../../date/" + dateMonth + "/page/2";
                            templateData.totalPages = totalPages;
                        }

                        // update template
                        _.extend(templateData, {
                            allDates: dates.getAllDatesAsLinks("../..", allPosts),
                            allTags: tags.getAllTagsAsLinks("../..", allPosts)
                        });

                        promises.unshift(new Promise(function (resolve, reject) {
                            gulp.src(globalVar.editFolder + "/templates/index.hbs")
                                .pipe(compileHandlebars(templateData, compileOptionsObj))
                                .pipe(rename("index.html"))
                                .pipe(gulp.dest(globalVar.distFolder + "/date/" + dateMonth))
                                .on("error", reject)
                                .on("end", resolve);
                        }));
                    }

                    Promise.all(promiseList.filter(promises))
                        .then(function () {
                            resolve();
                        }, function (err) {
                            reject(err);
                        });
                } else {
                    resolve();
                }
            }
        });
    });
};
