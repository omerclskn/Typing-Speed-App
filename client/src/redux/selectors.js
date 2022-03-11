export const allWordsSelector = (state) => state.typing.words;
export const selectedWordSelector = (state) => state.typing.selectedWord;
export const statusSelector = (state) => state.typing.status;
export const languageSelector = (state) => state.typing.language;
export const typingStartSelector = (state) => state.typing.typingStart;
export const successWordNumberSelector = (state) => state.typing.successWordNumber;
export const wrongWordNumberSelector = (state) => state.typing.wrongWordNumber;
export const totalKeystrokesSelector = (state) => state.typing.totalKeystrokes;