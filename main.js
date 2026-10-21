'use strict';
//取得
const addButton = document.getElementById('addButton');
const taskInput = document.getElementById('taskInput');
const todoList = document.getElementById('todoList');

//『todoData』のロッカーから中身を出して、文字から配列に戻し、**ノート(tasks)**に入れる。
// ロッカーが空っぽなら、空のノートで始める
let tasks = JSON.parse(localStorage.getItem('todoData')) || [];

function reader (){
	//描き直すときは、まずノート(tasks)を文字にして、『todoData』のロッカーにしまう」
	localStorage.setItem('todoData' , JSON.stringify(tasks));

	todoList.innerHTML = ''; //いったんulの中を全部消す

	tasks.forEach(function(task , i){
		//li要素を作成
		const todoItem = document.createElement('li');
		const todoCheckBox = document.createElement('input');
		const todoLabel = document.createElement('label');
		
		todoCheckBox.type = 'checkbox';
		
		//削除ボタンの要素を作成
		const removeButton = document.createElement('button');
		const iconTrash = document.createElement('i');
		iconTrash.classList.add('fa-solid','fa-trash-can','removeButton');
		removeButton.appendChild(iconTrash);
		
		//li要素にclassを追加
		todoItem.classList.add('todoItems');
		
		//タスクに番号を振る
		todoItem.dataset.index = i;
		if(task.isDone){
			todoCheckBox.checked = true;
			todoItem.classList.add('completed');
		}

		//lavel要素の中にチェックボックスとtaskを入れる
		todoLabel.append(todoCheckBox,task.text);
	
		//labelと削除ボタンを合体
		todoItem.append(todoLabel, removeButton);
	
		//ulの中にliを表示
		todoList.appendChild(todoItem);
	
		//削除アイコンをクリックでli要素を削除
		removeButton.addEventListener('click', function(e){
			const button = e.target.closest('button');
			if(button){
				const list = button.closest('li');
				const index = list.dataset.index;
				tasks.splice(index, 1);
				reader();
			}
		},false);
	})
}

//🔸追加ボタンを押したら実行
addButton.addEventListener('click',function(e){

	//taskを取得
    const text = taskInput.value.trim();

    //空の文字列であればアラートを出す
    if(text === ''){
        alert('タスクを入力してください');
        return;
    }
	tasks.push({ text: text, isDone: false });
	reader();

	taskInput.value = '';
});


//🔸クリックで取消線(ローカルストレージ保存用)
todoList.addEventListener('click',function(e){
	if(e.target.type === 'checkbox'){
		const list = e.target.closest('li');
		//console.log(list.dataset.index);
		const index = list.dataset.index; // li のメモから番号を読む
		tasks[index].isDone = e.target.checked; // ノートのその番号に、チェックの状態を書く
		reader(); //書き直す
	}
})

//🔸エンターキーで追加をする
taskInput.addEventListener('keydown' ,function(e){
    // Enterキーが押された、かつ「日本語入力の確定（変換）」のEnterではないとき
    if(e.key === 'Enter' && !e.isComposing){
        e.preventDefault();// フォームの意図しない送信や画面のリロードを防ぐ
        addButton.click(); // すでにあるクリック処理をそのまま実行する
    }
},false);

reader();