var gulp = require("gulp");
var sourcemaps = require("gulp-sourcemaps");
var rename = require("gulp-rename");
var connect = require("gulp-connect");
var ejs = require("gulp-ejs");
var pug = require("gulp-pug");
var fs = require('fs');
var path = require("path");
let fileExt;



function htmlTask(done) {
	 fs.readdirSync('./src/html').forEach((file) => {

		if (fs.lstatSync(`./src/html/${file}`).isFile()) {
			fileExt = path.extname(file);
			if (fileExt == ".pug") {
				// console.log(`Vi er inde i Pug If statementet`);
				return gulp.src("src/html/*.pug")
					.pipe(sourcemaps.init())
					.pipe(pug({
						pretty: false,
						doctype: "html",
						locals: { //Variabler
							pageTitle: "Whatever"
						}
					}))
					.pipe(rename(function (path) {
						if (path.basename != "index") {
							path.dirname = path.basename;
							path.basename = "index";
							path.extname = ".html";
						}
						else {
							path.extname = ".html";
						}
					}))
					.pipe(gulp.dest("dist"))
					.pipe(connect.reload());
			}

			else if (fileExt == ".ejs") {
				console.log(`Vi er inde i Ejs If statementet`);
				return gulp.src("src/html/*.ejs")
					.pipe(sourcemaps.init())
					.pipe(ejs())
					.pipe(rename(function (path) {
						if (path.basename != "index") {
							path.dirname = path.basename;
							path.basename = "index";
							path.extname = ".html";
						}
						else {
							path.extname = ".html";
						}
					}))
					.pipe(gulp.dest("dist"))
					.pipe(connect.reload());
			}

			else if (fileExt == ".html") {
				// console.log(`Vi er inde i HTML If statementet`);
				return gulp.src("src/html/*.html")
					.pipe(sourcemaps.init())
					.pipe(rename(function (path) {
						if (path.basename != "index") {
							path.dirname = path.basename;
							path.basename = "index";
							path.extname = ".html";
						}
						else {
							path.extname = ".html";
						}
					}))
					.pipe(gulp.dest("dist"))
					.pipe(connect.reload());
			}
			else {
				console.log("Your files in the /src/html folder is not either pug, ejs or html, please use pug, ejs or html as your html template engine");
			}
		}
	})

	done();

}

function watchHTML() {
	return gulp.watch("src/html/**/*", { ignoreInitial: false }, htmlTask)
}





module.exports = {
	htmlTask,
	watchHTML,
}