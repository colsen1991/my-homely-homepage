const BlogModel = require('./../../db/models/blogModel');

function getBlogIdList(req, res) {
  BlogModel.find({}, {_id: 1}, function (error, data) {
    if (error) {
      console.error(error);
      res.sendStatus(500);
    } else {
      res.send(data);
    }
  });
}

function getBlog(req, res) {
  BlogModel.findOne({_id: req.params.blogId}, function (error, data) {
    if (error) {
      console.error(error);
      res.sendStatus(500);
    } else {
      res.send(data);
    }
  });
}

function getBlogExcerpt(req, res) {
  BlogModel.findOne({_id: req.params.blogId}, {_id: 1, title: 1, excerpt: 1}, function (error, data) {
    if (error) {
      console.error(error);
      res.sendStatus(500);
    } else {
      res.send(data);
    }
  });
}

exports.getBlogIdList = getBlogIdList;
exports.getBlog = getBlog;
exports.getBlogExcerpt = getBlogExcerpt;