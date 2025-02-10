import pytest
from app.T9Trie import T9Trie


@pytest.fixture
def t9_trie():
    """
    Fixture to create a T9Trie with some sample words.
    The following words are assumed:
      - "gone" → T9 code "4663"
      - "hoof" → T9 code "4663"
      - "inoffensive" → T9 code "46633367483"
    """
    trie_instance = T9Trie()
    words = [
        "gone", "hoof", "inoffensive", "Hello", "test",
        "apple", "Gone", "Zoo", "123", "h@llo"
    ]
    for word in words:
        trie_instance.insert(word)
    return trie_instance


def test_strict_matching(t9_trie):
    # Test exact matches
    assert t9_trie.search("46630") == [
        "gone", "hoof", "Gone"]  # Original order
    assert sorted(t9_trie.search("46630"), key=str.lower) == [
        "gone", "Gone", "hoof"]
    assert t9_trie.search("4660") == []  # No exact match


def test_prefix_matching(t9_trie):
    # Test prefix matches
    results = t9_trie.search("4663")
    assert sorted(results, key=str.lower) == [
        "gone", "Gone", "hoof", "inoffensive"]
    assert "inoffensive" in results  # Verify prefix match


def test_empty_search(t9_trie):
    # Test empty input
    assert t9_trie.search("") == []


def test_invalid_characters_handling(t9_trie):
    # Test words with non-alphabet characters
    assert "123" not in t9_trie.search("1230")
    assert "h@llo" not in t9_trie.search("45560")


def test_sorting_order(t9_trie):
    # Test lexicographical order ignoring case
    results = t9_trie.search("4663")
    assert results == ["gone", "hoof", "Gone",
                       "inoffensive"]  # Original insertion order
    sorted_results = sorted(results, key=lambda x: x.lower())
    assert sorted_results == ["gone", "Gone", "hoof", "inoffensive"]
