var express = require('express');
var router = express.Router();
var dataService = require('../logics/dataService.js').DataService;
var fs = require('fs');
var path = require('path');
var mimeTypes = {
'.js': 'text/javascript',
'.css': 'text/css',
'.png': 'image/png',
'.jpg': 'image/jpeg',
'.jpeg': 'image/jpeg',
'.gif': 'image/gif',
'.ico': 'image/x-icon',
'.svg': 'image/svg+xml',
'.ttf': 'font/ttf',
'.otf': 'font/opentype',
'.woff': 'application/font-woff',
'.woff2': 'application/font-woff2',
'.eot': 'application/vnd.ms-fontobject'
};

router.get('/', function(req, res, next) {
  res.render('index', {});
});
router.post('/', function(req, res, next) {
  res.send('posted '+req.body.name);
});

router.get('/photoboard', function(req, res, next) {
  res.render('photoboard', {});
});
router.get('/photoboard/bootstrap/*', function (req, res, next) {
    req.url = req.url.replace('/photoboard/', '/');
    returnResourceFile(req, res);
});
router.get('/photoboard/fonts/*', function (req, res, next) {
    req.url = req.url.replace('/photoboard/', '/');
    returnResourceFile(req, res);
});
router.get('/photoboard/plugins/*', function (req, res, next) {
    req.url = req.url.replace('/photoboard/', '/');
    returnResourceFile(req, res);
});
router.get('/photoboard/img/*', function (req, res, next) {
    req.url = req.url.replace('/photoboard/', '/');
    returnResourceFile(req, res);
});
router.get('/photoboard/css/*', function (req, res, next) {
    req.url = req.url.replace('/photoboard/', '/');
    returnResourceFile(req, res);
});
router.get('/photoboard/js/*', function (req, res, next) {
    req.url = req.url.replace('/photoboard/', '/');
    returnResourceFile(req, res);
});

router.post('/api/getInitData', function(req, res, next) {
  console.log("getInitData:"+req.body.keyword_id+"|"+req.body.itemDisplay);
  dataService.getData(req, res, next);
});

function returnResourceFile(req, res) {
    var publicDirectory = fs.realpathSync('./public');
    var decodedUri = decodeURI(req.url);
    var fileFullPathArray = path.join(publicDirectory, decodedUri).split('?');
    var fileFullPath = fileFullPathArray[0];
    var st = fs.statSync(fileFullPath);
    var etag = '"' + st.size + '-' + Number(st.mtime) + '"';
    if( req.headers['if-none-match'] === etag ) {
        res.writeHead(304);
        res.end();
    } else {
        var ext = path.extname(path.basename(decodedUri).split('?')[0]);
        var mimeType = 'application/octet-stream';
        if (mimeTypes[ext]) {
            mimeType = mimeTypes[ext];
        }
        fs.exists(fileFullPath, function (exists) {
            if (exists) {
                fs.readFile(fileFullPath, function (err, data) {
                    if (err) {
                        res.writeHead(500);
                        res.end('Internal Server Error');
                    } else {
                        var headers = { 
                            'Content-Type': mimeType,
                            'Etag': etag
                        };
                        res.writeHead(200, headers);
                        res.end(data);
                    }
                });
            } else {
                res.writeHead(404);
                res.end('Nod found.');
            }
        });
    }
};

module.exports = router;
