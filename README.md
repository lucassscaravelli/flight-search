# Flight-Search

## Status

[![Build Status](https://travis-ci.org/lucassscaravelli/flight-search.svg?branch=master)](https://travis-ci.org/lucassscaravelli/flight-search) [![Coverage Status](https://coveralls.io/repos/github/lucassscaravelli/flight-search/badge.svg?branch=master)](https://coveralls.io/github/lucassscaravelli/flight-search?branch=master)

## Para rodar o projeto basta:

1. ```git clone https://github.com/lucassscaravelli/flight-search.git```
2. ```cd flight-search```
2. ```docker build -t flight-search .```
3. ```docker run -p 8080:80 -d flight-search```
4. Acessar a url ```http://0.0.0.0:8080/home```

## Tecnologias utilizadas
* Framework: [react](https://reactjs.org/)
* Design and Theme: [antd](https://ant.design/)
* Css Preprocessor: [less](http://lesscss.org/)
* DataFlow Lib: [reflux](https://github.com/reflux/refluxjs)
* Package Manager: [yarn](https://yarnpkg.com)
* Module Bundler: [webpack](https://webpack.js.org/)
* Testing Framework: [jest](https://jestjs.io/)
