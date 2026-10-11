'use strict';
//取得
let addButton = document.getElementById('addButton');
let taskInput = document.getElementById('taskInput');

//🔸追加ボタンを押したら実行
addButton.addEventListener('click',function(e){
    //taskを取得
    let task = taskInput.value;

    //空の文字列であればアラートを出す
    if(task === ''){
        alert('タスクを入力してください');
        return;
    }

    //要素を作成
    const todoItem = document.createElement('li');
    const todoCheckBox = document.createElement('input');
    const todoLavel = document.createElement('label');

    todoCheckBox.type = 'checkbox';

    

    //li要素にclassを追加
    todoItem.classList.add('class1');
    

    //li要素の中にtaskを入れる
    todoItem.textContent = task;

    //ulを見つける
    let todoList = document.getElementById('todoList');

    //labelとcheckboxを合体
    todoLavel.appendChild(todoCheckBox);
    todoItem.appendChild(todoLavel);

    //ulの中にliを表示
    todoList.appendChild(todoItem);
    
    

    //inputの文字列をクリアする
    taskInput.value = '';

    console.log(todoItem);
},false);



//🔸削除
let removeButton = document.getElementById('removeButton');
removeButton.addEventListener('click',function(e){
//ulリストを取得
let todoList = document.getElementById('todoList');
todoList.removeChild(todoList.lastElementChild);

},false);


//🔸クリックで取消線
todoList.addEventListener('click',function(e){
    // console.log(e.target.tagName);
    if(e.target.tagName === 'LI'){
          e.target.classList.toggle('completed');
    }
},false);

//🔸エンターキーで追加をする
taskInput.addEventListener('keydown' ,function(e){
    // Enterキーが押された、かつ「日本語入力の確定（変換）」のEnterではないとき
    if(e.key === 'Enter' && !e.isComposing){
        e.preventDefault();// フォームの意図しない送信や画面のリロードを防ぐ
        addButton.click(); // すでにあるクリック処理をそのまま実行する
    }
},false);