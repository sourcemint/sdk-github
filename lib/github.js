
const GITHUB = require("github");
const Q = require("sourcemint-util-js/lib/q");


function getApi(credentials) {

    var github = new GITHUB({
        version: "3.0.0"
    });

    return credentials.requestFor("github.com/sourcemint/sdk-github/0", "username").then(function(username) {
	    return credentials.requestFor("github.com/sourcemint/sdk-github/0", "password").then(function(password) {

			github.authenticate({
				type: "basic",
			    username: username,
			    password: password
			});

			return github;
		});
	});
}


exports.getUserInfo = function(credentials) {
	return getApi(credentials).then(function(api) {
		var deferred = Q.defer();
		api.user.get({}, function(err, result) {
			if (err) return deferred.reject(err);
			return deferred.resolve(result)
		});
		return deferred.promise;
	});
}
