/// <reference types="chrome"/>

// Popup script for Quick Link Jump
document.addEventListener('DOMContentLoaded', () => {
  console.log('Quick Link Jump popup loaded');

  // オプションページを開くボタンのイベントリスナー
  const optionsButton = document.getElementById('openOptions');
  if (optionsButton) {
    optionsButton.addEventListener('click', () => {
      chrome.runtime.openOptionsPage();
    });
  }
});

export {}; 