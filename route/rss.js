var phantom = require('phantom'),
	cheerio = require('cheerio'),
	request = require('request'),
	url = require('url'),
	o2x = require('object-to-xml');

module.exports = function(app) {
    var getContent = function(url, callback) {
        phantom.create(function(ph) {
            ph.createPage(function(page) {
                page.open(url, function(status) {
                    page.evaluate(function(selector) {
                        return $(selector).html();
                    }, function(result) {
                        ph.exit();
                        return callback(result);
                    }, 'html');
                });
            });
        }, {
            dnodeOpts: {
                weak: false
            }
        });
    };
    app.get('/rss/:domain', function(req, res) {
        if (req.query.url) {
            var uri = req.query.url;
            var urlObj = url.parse(uri);
            getContent(uri, function(result) {
                var $ = cheerio.load(result);
                var rss = {
                    channel: {
                        title: $('title').html(),
                        domain: req.query.url,
                        description: $('meta[name="description"]').attr('content'),
                        image: $('meta[itemprop="image"]').attr('content'),
                        language: $('span.cat-title.subcat-title').html(),
                        pubDate: null,
                        lastBuildDate: null,
                        docs: null,
                        generator: null,
                        managingEditor: null,
                        webMaster: null,
                        item: null
                    }
                };
                var arr = [];
                $('ul.courses.mt10.mt0-force-md li').each(function() {
                    arr.push({
                        title: $(this).find('span.title').html(),
                        link: $(this).find('a.fxw').attr('src'),
                        image: $(this).find('img.course-img').attr('src')
                    });
                });
                rss.channel.item = arr;
                res.header('Content-Type', 'text/xml');
                res.send(o2x({
                    '?xml version="1.0" encoding="utf-8"?': null,
                    rss: rss
                }));
            });
        }
    });
}