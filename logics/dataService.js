function DataService() {
    this.getData = function(req, res, next) {
        var result = [3,7,6];
        res.json(result);
    };
}

exports.DataService = new DataService();
