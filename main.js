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

    //li要素を作成
    const todoItem = document.createElement('li');
    const todoCheckBox = document.createElement('input');
    const todoLavel = document.createElement('label');
    
    todoCheckBox.type = 'checkbox';
    
    //削除ボタンの要素を作成
    const removeButton = document.createElement('button');
    const iconTrash = document.createElement('i');
    iconTrash.classList.add('fa-solid','fa-trash-can','removeButton');
    removeButton.appendChild(iconTrash);
    

    //li要素にclassを追加
    todoItem.classList.add('todoItems');
    

    //li要素の中にtaskを入れる
    todoItem.textContent = task;

    //ulを見つける
    let todoList = document.getElementById('todoList');

    //labelとcheckboxを合体
    todoLavel.appendChild(todoCheckBox);
    todoItem.appendChild(todoLavel);
    todoItem.appendChild(removeButton);

    //ulの中にliを表示
    todoList.appendChild(todoItem);
    
    //inputの文字列をクリアする
    taskInput.value = '';

    //削除アイコンをクリックでli要素を削除
    removeButton.addEventListener('click', function(e){
        todoItem.remove();
    },false);

    console.log(todoItem);
},false);



//🔸削除
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