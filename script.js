document.getElementById('saveButton').addEventListener('click', saveButtonClick);
document.getElementById('memo').addEventListener('input', function() {
    updateCharCount();
    autoSave();
});
document.getElementById('bgColorSelect').addEventListener('change', updateBgColor);
// ローカルストレージに
let memos = JSON.parse(localStorage.getItem('memos')) || [];
// 自動保存機能
function autoSave() {
    const memoText = document.getElementById('memo').value;
    localStorage.setItem('autoSavedMemo', memoText);
}

function restoreAutoSavedMemo() {
    const savedMemo = localStorage.getItem('autoSavedMemo');
    if (savedMemo) {
        document.getElementById('memo').value = savedMemo;
        updateCharCount(); // 更新した文字数を表示
    }
}

// 保存ボタンのクリックイベント
function saveButtonClick() {
    const memoText = document.getElementById('memo').value;
    const font = document.getElementById('fontSelect').value;
    const fontSize = document.getElementById('fontSizeSelect').value;
    // メモが空でない場合に保存
    if (memoText.trim() !== "") {
        const memo = {
            text: memoText,
            font: font,
            fontSize: fontSize,
            id: Date.now()
        };
        memos.push(memo);
        localStorage.setItem('memos',JSON.stringify(memos));
        displaySavedMemos();
        document.getElementById('memo').value = "";
        updateCharCount();
    } else {
        alert('メモを入力してください。'); //エラーメッセージの追加
    }
}
// 文字数カウント
function updateCharCount() {
    const memoText = document.getElementById('memo').value;
    const charCountDiv = document.getElementById('charCount');
    charCountDiv.textContent = '文字数: ' + memoText.length;
}

function displaySavedMemos(){
    const savedMemosDiv = document.getElementById('savedMemos');
    savedMemosDiv.innerHTML = ""; // Clear existing memos
    memos.forEach(memo => {
        // メモアイテムの作成
        const memoItem = document.createElement('div');
        memoItem.className = 'memo-item';
        // メモヘッダーの作成
        const memoHeader = document.createElement('div');
        memoHeader.classHeader = 'memo-header';
        // 日付と時刻
        const memoTimestamp = document.createElement('span');
        const memoDate = new Date(memo.id);
        memoTimestamp.textContent = `${memoDate.toLocaleDateString()} ${memoDate.toLocaleTimeString()}`;
        // 削除する
        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-button';
        deleteButton.textContent = '削除';
        deleteButton.onclick = function() {
            deleteMemo(memo.id);
        };
        // 
        const memoContent = document.createElement('div');
        memoContent.className = 'memo-content';
        memoContent.textContent = memo.text;
        memoContent.style.fontFamily = memo.font;
        memoContent.style.fontSize = memo.fontSize;

        memoHeader.appendChild(memoTimestamp);
        memoHeader.appendChild(deleteButton);

        memoItem.appendChild(memoHeader);
        memoItem.appendChild(memoContent);
        savedMemosDiv.appendChild(memoItem);
    });
}
// ローカルストレージ
function deleteMemo(id) {
    memos = memos.filter(memo => memo.id !== id);
    localStorage.setItem('memos', JSON.stringify(memos));
    displaySavedMemos();
}
// ﾊﾞｯｸ画面の設定
function updateBgColor() {
    const bgColor = document.getElementById('bgColorSelect').value;
    document.body.style.backgroundColor = bgColor;
}

// フォントセレクトの変更イベント
document.getElementById('fontSelect').addEventListener('change', function() {
    document.getElementById('memo').style.fontFamily = this.value;
});

// フォントサイズセレクトの変更イベント
document.getElementById('fontSizeSelect').addEventListener('change', function() {
    document.getElementById('memo').style.fontSize = this.value;
});

function deleteMemo(id) {
    memos = memos.filter(memo => memo.id !== id);
    localStorage.setItem('memos', JSON.stringify(memos));
    displaySavedMemos();
}

window.onload = function() {
    displaySavedMemos();
    restoreAutoSavedMemo(); // ページロード時に自動保存されたメモを復元
    updateBgColor();
};
