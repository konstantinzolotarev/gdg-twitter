'use strict';

var async = require('async');
var facebook = require('machinepack-facebook');

/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	index: function(req, res) {

		facebook.getLoginUrl({
			appId: sails.config.facebook.appId,
			callbackUrl: sails.config.facebook.callbackUrl
		}).exec({
			error: function(err) {
				return res.serverError(err);
			},
			success: function(link) {
				return res.view({
					fbLink: link
				});
			}
		});
	},
	
	login: function(req, res) {
		var fbUser;

		async.waterfall([
			function getAccessToken(cb) {
        facebook.getAccessToken({
          appId: sails.config.facebook.appId,
          appSecret: sails.config.facebook.appSecret,
          code: req.query.code,
          callbackUrl: sails.config.facebook.callbackUrl
        }).exec(cb);
      },

      function fetchUserDetails(result, cb) {
        facebook.getUserByAccessToken({
          accessToken: result.token
        }).exec(cb);
      },

      function loadUser(user, cb) {
        fbUser = user;
        User.findOne({
          facebookId: user.id
        }).exec(cb);
      },

      function createUserIfNeeded(user, cb) {
        if (user && user.id) {
          return cb(null, user);
        }
        if (_.isFunction(user)) {
          cb = user;
        }
        User.create({
          email: fbUser.email,
          name: fbUser.name,
          gender: fbUser.gender,
          facebookId: fbUser.id
        }).exec(cb);
      }
		], function(err, user) {
			if (err) {
				return res.serverError(err);
			}
			return res.view({
				user: user
			});
		});
	}
};
