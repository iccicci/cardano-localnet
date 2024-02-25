const overrides = { catch: { after: false }, for: { after: false }, if: { after: false }, switch: { after: false }, while: { after: false } };

const rules = {
  "@typescript-eslint/no-empty-function":       "off",
  "@typescript-eslint/no-empty-interface":      "off",
  "@typescript-eslint/no-non-null-assertion":   "off",
  "@typescript-eslint/type-annotation-spacing": ["error", { after: true, before: false, overrides: { arrow: { before: true } } }],
  "arrow-body-style":                           ["error", "as-needed"],
  "arrow-parens":                               ["error", "as-needed"],
  "arrow-spacing":                              "error",
  "brace-style":                                ["error", "1tbs", { allowSingleLine: true }],
  curly:                                        ["error", "multi-or-nest"],
  eqeqeq:                                       ["error"],
  "func-style":                                 ["error", "expression"],
  "import/first":                               "error",
  "import/newline-after-import":                "error",
  "import/no-duplicates":                       "error",
  indent:                                       ["error", 2],
  "key-spacing":                                ["error", { align: { afterColon: true, beforeColon: false, on: "value" } }],
  "keyword-spacing":                            ["error", { before: true, overrides }],
  "linebreak-style":                            ["error", "unix"],
  "no-console":                                 "warn",
  "no-mixed-spaces-and-tabs":                   ["error", "smart-tabs"],
  "nonblock-statement-body-position":           ["error", "beside"],
  "prefer-const":                               ["error", { destructuring: "all" }],
  "prefer-template":                            "error",
  semi:                                         ["error", "always"],
  "simple-import-sort/exports":                 "error",
  "simple-import-sort/imports":                 "error",
  "sort-keys":                                  "off",
  "sort-keys/sort-keys-fix":                    "error",
  "space-before-function-paren":                ["error", { anonymous: "never", asyncArrow: "always", named: "never" }],
  "space-unary-ops":                            ["error", { nonwords: false, overrides: { "!": true }, words: true }]
};

module.exports = {
  env:           { amd: true, browser: true, es6: true, jquery: true, node: true },
  extends:       ["plugin:@typescript-eslint/recommended"],
  parser:        "@typescript-eslint/parser",
  parserOptions: { ecmaVersion: 9, sourceType: "module" },
  plugins:       ["import", "simple-import-sort", "sort-keys"],
  root:          true,
  rules
};
