const gulp  = require('gulp');
const clean = require('gulp-clean');
const ts    = require('gulp-typescript');

/** Cria um projeto virtual lendo o arquivo de configuraçao do projeto*/
const tsProject = ts.createProject('tsconfig.json');

gulp.task('scripts', ['static'], () => { // depende de static
    const tsResult = tsProject.src() // Aqui está pego o codigo fonte do src typescript
        .pipe(tsProject()); //a  função tsProject passada para o pipe vai pegar o fonte da chamada anterior e compilar o código

    return tsResult.js // javascript gerado pelo tsProject
        .pipe(gulp.dest('dist')); // diretorio onde será gerado o arquivo
});

gulp.task('static', ['clean'], () => { // depende de clean
    return gulp.src(['src/**/*.json']) // todos os arquivos fontes no formato json serão copiados para dist
        .pipe(gulp.dest('dist'));
});

gulp.task('clean', () => {
    return gulp.src('dist') // sempre que um arquivo for removido no src ele será removido no dist
        .pipe(clean());
});

// gulp.task('build', ['clean', 'static', 'scripts']);
gulp.task('build', ['scripts']); // como o scripts depende do static e do clean eles serão executados, não precisa explicitá-los

gulp.task('watch', ['build'], () => {
    return gulp.watch(['src/**/*.ts', 'src/**/*.json'], ['build']); // toda a vez que houver uma mudança em um ts ou json ele irá executar a tarefa build
});

gulp.task('default', ['watch']); // tarefa que será executada ao utilizar o gulp sem nenhum argumento