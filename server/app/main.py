import os
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from app.T9Trie import T9Trie

origins = ['http://localhost:3000']


T9_TRIE = T9Trie()


def load_words():
    """
    Load words from the 'words.txt' file
    into the T9 Trie on application startup.
    """
    file_path = os.path.join(os.path.dirname(__file__), 'words.txt')

    print("Loading words from:", file_path)
    if not os.path.exists(file_path):
        print("Warning: words.txt not found!")
        return

    with open(file_path, 'r', encoding="utf-8") as file:
        words_added = set()
        for word in file:
            word = word.strip().lower()
            if word and word not in words_added:
                T9_TRIE.insert(word)
                words_added.add(word)


@asynccontextmanager
async def lifespan(app: FastAPI):
    load_words()
    yield
    print("Shutting down...")

app = FastAPI(
    lifespan=lifespan,
    title='T9 Words Service with Trie'
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/", tags=["Health check"])
def health_check():
    """Application's health check API"""
    return {"Hello": "World"}


@app.get("/words", tags=["T9 Words"], response_model=list[str])
def get_t9_words(
    digits: str = Query(..., min_length=1,
                        description="Non-empty sequence of decimal digits"),
):
    """
    Return a list of words from the vocabulary that match the T9 digits.

    - **strict** mode: word's T9 representation must equal the digits.
    - **prefix** mode: word's T9 representation must start with the digits.

    The resulting list is sorted lexicographically ignoring case.
    """
    if not digits or not digits.isdigit():
        raise HTTPException(
            status_code=400,
            detail="'digits' parameter must contain only numeric characters."
        )

    matched_words = T9_TRIE.search(digits)

    # Sort lexicographically ignoring case.
    matched_words.sort(key=lambda w: w)

    return matched_words
