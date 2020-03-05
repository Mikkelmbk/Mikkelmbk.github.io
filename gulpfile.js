var connect = require("gulp-connect");
var { watchHTML, htmlTask } = require("./tasks/html");
var { jsTask, watchJS } = require("./tasks/js");
var { scssTask, watchSCSS } = require("./tasks/scss");
var { imageTask, watchImg } = require("./tasks/img");
var { mediaTask, watchMedia } = require("./tasks/media");

function watch(done){
	watchHTML(done);
	watchSCSS();
	watchJS();
	watchImg();
	watchMedia();

	connect.server({
		livereload: true,
		root: "dist",
		port:3000,
	});
}

function build(done){
	htmlTask();
	scssTask();
	jsTask();
	imageTask();
	mediaTask();
	done();
}

exports.default = watch;

exports.build = build;