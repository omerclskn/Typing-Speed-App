import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl =
  "https://omerc-typing-speed-api.netlify.app/.netlify/functions/server";

export const getWordsAsync = createAsyncThunk(
  "words/getWords",
  async (language) => {
    const { data } = await axios.get(`${baseUrl}/getWords/${language}`);
    return data;
  }
);

export const typingSlice = createSlice({
  name: "typing",
  initialState: {
    words: [],
    typingStart: false,
    status: "idle",
    successWordNumber: 0,
    wrongWordNumber: 0,
    index: 0,
    selectedWord: "",
    totalKeystrokes: 0,
    language: "tr",
  },
  reducers: {
    startTyping: (state) => {
      state.isTyping = true;
    },
    checkWord: (state, action) => {
      if (state.selectedWord === action.payload) {
        state.successWordNumber++;
        state.words = state.words.map((word) => {
          if (state.selectedWord === word.value) {
            return { ...word, correctness: "true" };
          }
          return word;
        });
      } else {
        state.wrongWordNumber++;
        state.words = state.words.map((word, i) => {
          if (state.selectedWord === word.value) {
            return { ...word, correctness: "false" };
          }
          return word;
        });
      }
      state.selectedWord = state.words[++state.index].value;
    },
    incrementTotalKeystrokes: (state) => {
      state.totalKeystrokes++;
    },
    setTypingStart: (state, action) => {
      state.typingStart = action.payload;
    },
    reload: (state) => {
      state.words = [];
      state.typingStart = false;
      state.status = "idle";
      state.successWordNumber = 0;
      state.wrongWordNumber = 0;
      state.index = 0;
      state.selectedWord = "";
      state.totalKeystrokes = 0;
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
      state.words = [];
      state.typingStart = false;
      state.status = "idle";
      state.successWordNumber = 0;
      state.wrongWordNumber = 0;
      state.index = 0;
      state.selectedWord = "";
      state.totalKeystrokes = 0;
    },
  },
  extraReducers: {
    // get words
    [getWordsAsync.fulfilled]: (state, action) => {
      state.words = action.payload.reduce((acc, cur, index) => {
        acc[index] = {
          value: cur,
          correctness: "pending",
        };
        return acc;
      }, []);
      state.selectedWord = state.words[0].value;
      state.status = "succeeded";
    },
    [getWordsAsync.pending]: (state) => {
      state.status = "pending";
    },
    [getWordsAsync.rejected]: (state) => {
      state.status = "failed";
    },
  },
});

export default typingSlice.reducer;
export const {
  startTyping,
  checkWord,
  incrementTotalKeystrokes,
  setTypingStart,
  reload,
  setLanguage,
} = typingSlice.actions;
