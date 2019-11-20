const gulp  = require('gulp');
const clean = require('gulp-clean');
const ts    = require('gulp-typescript');

/** Cria um projeto virtual lendo o arquivo de configuraçao do projeto*/
const tsProject = ts.createProject('tsconfig.json');

gulp.task('default', () => {
    const tsResult = tsProject.src() // Aqui está pego o codigo fonte do src typescript
        .pipe(tsProject()); //a  função tsProject passada para o pipe vai pegar o fonte da chamada anterior e compilar o código

    return tsResult.js // javascript gerado pelo tsProject
        .pipe(gulp.dest('dist')); // diretorio onde será gerado o arquivo
});