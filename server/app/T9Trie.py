
from typing import List, Dict

# T9 mapping as per a typical phone keypad.
T9_MAPPING = {
    "a": "2", "b": "2", "c": "2",
    "d": "3", "e": "3", "f": "3",
    "g": "4", "h": "4", "i": "4",
    "j": "5", "k": "5", "l": "5",
    "m": "6", "n": "6", "o": "6",
    "p": "7", "q": "7", "r": "7", "s": "7",
    "t": "8", "u": "8", "v": "8",
    "w": "9", "x": "9", "y": "9", "z": "9",
}


def word_to_t9(word: str) -> str:
    """
    Convert a word into its T9 digit representation.
    For any letter not in T9_MAPPING (should not happen for [A-Za-z]),
    it returns None
    """
    t9_sequence = []
    for char in word.lower():
        if char not in T9_MAPPING:
            return None
        t9_sequence.append(T9_MAPPING[char])
    return ''.join(t9_sequence)


class TrieNode:
    def __init__(self):
        self.children: Dict[str, TrieNode] = {}
        self.words: List[str] = []


class T9Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word: str):
        """
        Insert a word into the trie using its T9 representation.
        For example, "gone" becomes "4663".
        """

        t9_digits = word_to_t9(word)
        if not t9_digits:
            print(f"Warning: Skipping invalid word '{word}'")
            return

        node = self.root
        for digit in t9_digits:
            if digit not in node.children:
                node.children[digit] = TrieNode()
            node = node.children[digit]
        node.words.append(word)

    def _find_prefix_matches(self, node: TrieNode) -> List[str]:
        """
        Recursively collect all words in the subtree starting
        from the given node. This is a helper function for prefix matching.
        """
        result = []
        stack = [node]
        while stack:
            current = stack.pop()
            result.extend(current.words)
            stack.extend(current.children.values())
        return result

    def search(self, digits: str) -> List[str]:
        """
        Search for words matching the given T9 digit sequence.

        Requirements:
          - If the input consists solely of digits (without a trailing '0'),
            then perform prefix matching. For example, "4663" returns all words
            whose T9 code starts with "4663".
          - If the input is terminated by a '0',
            then perform strict matching using the digits preceding the '0'.
            For example, "46630" returns only the words whose T9 code exactly
            equals "4663".

        Parameters:
            digits (str): The T9 digit sequence
            (e.g., "4663" for prefix matching or "46630" for strict matching).

        Returns:
            List[str]: A list of matching words.
        """

        if not digits or not digits.isdigit():
            return []

        node = self.root
        strict_mode = digits.endswith("0")
        digits = digits[:-1] if strict_mode else digits

        for digit in digits:
            if digit not in node.children:
                return []
            node = node.children[digit]

        return list(node.words) if strict_mode else self._find_prefix_matches(node)
