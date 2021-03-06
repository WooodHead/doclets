var structure = require('./structure')
var _ = require('underscore')

var tools = module.exports.tools = {
  modulename: function (longname) {
    if (longname === '_GLOBAL') {
      return 'global'
    } else if (longname.indexOf('module:') > -1) {
      return longname.split('module:')[1]
    } else {
      return longname
    }
  },
  splitName: function (doclet) {
    var match = doclet.longname.match(/(module:)?([^\.#~]+)(\.|#|~)(.+)/)
    if (match) {
      var splitIndex = match[4].lastIndexOf('.')
      if (splitIndex < 0) {
        splitIndex = match[4].lastIndexOf('#')
      }
      if (splitIndex < 0) {
        splitIndex = match[4].lastIndexOf('~')
      }
      return {
        module: match[2],
        name: splitIndex > -1 ? match[4].substr(splitIndex + 1) : match[4],
        parent: splitIndex > -1 ? match[4].substr(0, splitIndex + 1) : ''
      }
    } else {
      return {
        module: '',
        name: doclet.longname,
        parent: ''
      }
    }
  },
  idFromLongname: structure.idFromLongname,
  sortByName: function (doclets) {
    return _.sortBy(doclets, function (doclet) {
      return doclet.name
    })
  },
  shortName: function (longname) {
    var parts = longname.split('~')
    if (parts && parts[1]) {
      return parts[1]
    } else {
      return longname
    }
  }
}

module.exports.getApiParams = function (doclet) {
  doclet.initUrls()
  return {
    doclet: doclet,
    childs: structure.childs,
    getPlaygrounds: structure.getPlaygrounds,
    '_': _,
    tools: tools,
    versionsPath: './',
    articlesPath: doclet.version + '/',
    apiPath: ''
  }
}

module.exports.getArticleParams = function (doclet, article) {
  return {
    doclet: doclet,
    article: article,
    childs: structure.childs,
    '_': _,
    tools: tools,
    versionsPath: '../',
    articlesPath: '',
    apiPath: '../' + doclet.version
  }
}

module.exports.getAccountParams = function (repos) {
  return {
    repoSettings: _.sortBy(repos, function (repo) {
      return repo.name
    }),
    _: _
  }
}
