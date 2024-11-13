const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');  // 加载gulp插件 源码映射工具
const babel = require('gulp-babel');            // 转码器
const concat = require('gulp-concat');          // 缩码器

gulp.task('default',()=>{
    return gulp.src('app/*.jsx')                // gulp.src查询所有的app/文件夹下的.jsx文件
            .pipe(sourcemaps.init())            // 初始化映射工具
            .pipe(babel({
                presets:['es2015','react']      // 执行源码映射
            }))
            .pipe(concat('all.js'))             // 将所有.jsx代码合并到all.js文件
            .pipe(sourcemaps.write('.'))        // 将完成后的代码写入源码映射文件
            .pipe(gulp.dest('dist'));           // 将文件输出至dist文件夹下
})