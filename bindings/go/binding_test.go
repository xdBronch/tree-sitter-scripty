package tree_sitter_scripty_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_scripty "github.com/xdBronch/tree-sitter-scripty/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_scripty.Language())
	if language == nil {
		t.Errorf("Error loading Scripty grammar")
	}
}
