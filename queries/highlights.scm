(identifier) @variable
((identifier) @variable.builtin
  (#match? @variable.builtin "^\\$"))

(path_expression
  member: (identifier) @property)

(call
  function: (path_expression
    member: (identifier) @function.call))

(call
  function: (identifier) @function.call)

(number) @number
(boolean) @boolean
(string) @string

[
  "."
  ","
  "("
  ")"
] @punctuation
