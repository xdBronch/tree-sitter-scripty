import XCTest
import SwiftTreeSitter
import TreeSitterScripty

final class TreeSitterScriptyTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_scripty())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading Scripty grammar")
    }
}
