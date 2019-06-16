#!/usr/bin/env bash
OPTS=(
  "--language_in=ES6"
  "--language_out=ES5"
  "--module_resolution=NODE"
  "--process_common_js_modules"
  "--compilation_level=ADVANCED_OPTIMIZATIONS"
  "--js_output_file=build/linter.js"
  "--entry_point=src/index.js"

  "./src/*.js"
  "./src/collections/*.js"
  "./node_modules/esprima/dist/esprima.js"
)
set -ex
java -jar node_modules/google-closure-compiler-java/compiler.jar $(echo ${OPTS[*]})