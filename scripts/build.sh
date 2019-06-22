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
  "./src/models/*.js"
  "./src/models/errors/form/*.js"
  "./src/models/errors/heading/*.js"
  "./src/tests/*.js"
  "./src/tests/form/*.js"
  "./src/tests/form/space/*.js"
  "./src/tests/form/text-size/*.js"
  "./src/tests/heading/*.js"
  "./src/tests/heading/position/*.js"
  "./node_modules/esprima/dist/esprima.js"
  "./externs/*.js"
)
set -ex
java -jar node_modules/google-closure-compiler-java/compiler.jar $(echo ${OPTS[*]})