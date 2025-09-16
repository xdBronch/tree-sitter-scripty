/**
 * @file scripty
 * @author xdBronch
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: "scripty",

  supertypes: $ => [
    $.expression,
  ],

  rules: {
    script: $ => $.expression,
    expression: $ => choice(
      $.identifier,
      $.path_expression,
      $.call,
      $.string,
      $.number,
      $.boolean,
    ),
    identifier: $ => seq(optional('$'), /[a-zA-Z_][a-zA-Z0-9_?!]*/),
    path_expression: $ => seq(
      field('path', $.expression),
      '.',
      field('member', $.identifier),
    ),
    call: $ => seq(
      field('function', $.expression),
      field('arguments', seq(
        '(',
        optionalCommaSep($.expression),
        ')'
      )),
    ),
    string: $ => choice(
      seq(
        '"',
        repeat(choice(
          alias(token.immediate(prec(1, /[^\\"\n]+/)), $.string_content),
          seq('\\', '"'),
        )),
        '"',
      ),
      seq(
        '\'',
        repeat(choice(
          alias(token.immediate(prec(1, /[^\\'\n]+/)), $.string_content),
          seq('\\', '\''),
        )),
        '\'',
      ),
    ),
    number: $ => /[0-9._]+/,
    boolean: $ => choice('true', 'false'),
  }
});

/**
 * Creates a rule to match optionally match one or more of the rules
 * separated by a comma  and optionally ending with a comma
 *
 * @param {Rule} rule
 *
 * @return {SeqRule}
 *
 */

function optionalCommaSep(rule) {
  return seq(commaSep(rule), optional(','));
}
/**
 * Creates a rule to optionally match one or more of the rules separated by a comma
 *
 * @param {Rule} rule
 *
 * @return {ChoiceRule}
 *
 */
function commaSep(rule) {
  return optional(commaSep1(rule));
}

/**
 * Creates a rule to match one or more of the rules separated by a comma
 *
 * @param {Rule} rule
 *
 * @return {SeqRule}
 *
 */
function commaSep1(rule) {
  return seq(rule, repeat(seq(',', rule)));
}
