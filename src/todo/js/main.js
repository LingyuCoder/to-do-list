define("../static/todo/js/main.min.js", function(require, exports) {
	var angular = require('angularjs');
	angular.module("TodoList", [])
		.controller("todoControler",
			function($scope) {
				//获取localStorage本地存储
				var storage = window.localStorage;
				/*****************************************/
				/*              Todo任务类               */
				/*****************************************/
				function Todo(text, date, done) {
					if (!this instanceof Todo) {
						return new Todo(text);
					}
					this.text = text;
					this.date = date || new Date();
					this.done = done || false;
				}
				//转换任务状态
				Todo.prototype.change = function() {
					this.done = !this.done;
					$scope.freshStorage();
				};

				/*****************************************/
				/*              任务操作逻辑             */
				/*****************************************/

				//用于展示的任务列表
				$scope.todoList = [];

				//监听输入按键，回车时添加任务
				$scope.keypress = function($event) {
					if ($event.keyCode === 13 && $scope.todoInput) {
						$scope.add();
					}
				};

				//添加任务到任务列表
				$scope.add = function() {
					$scope.todoList.push(new Todo($scope.todoInput));
					$scope.todoInput = "";
					$scope.freshStorage();
				};

				//计算剩余任务
				$scope.remain = function() {
					var done = 0;
					var i, m;
					var tmp = $scope.todoList;
					for (i = tmp.length; i--;) {
						done += tmp[i].done;
					}
					return tmp.length - done;
				};

				//移除单个任务
				$scope.remove = function(todo) {
					$scope.todoList.splice($scope.todoList.indexOf(todo), 1);
					$scope.freshStorage();
				};

				//移除所有已完成任务
				$scope.deleteDone = function() {
					var i, m;
					var list = $scope.todoList;
					var remain = [];
					for (i = 0, m = list.length; i < m; i++) {
						if (!list[i].done) {
							remain.push(list[i]);
						}
					}
					$scope.todoList = remain;
					$scope.freshStorage();
				};

				//移除所有任务
				$scope.deleteAll = function() {
					$scope.todoList = [];
					$scope.freshStorage();
				};

				/*****************************************/
				/*              本地存储支持             */
				/*****************************************/

				//若支持localStorage，从本地取出信息进行初始化
				$scope.getFromStorage = function() {
					var listInStorage;
					var i, m;
					if (storage) {
						listInStorage = JSON.parse(storage.getItem("todoList"));
						if (listInStorage) {
							for (i = 0, m = listInStorage.length; i < m; i++) {
								$scope.todoList.push(new Todo(listInStorage[i].text, new Date(listInStorage[i].date), listInStorage[i].done));
							}

						}
					}
				};

				//将当前任务列表刷入localstorage
				$scope.freshStorage = function() {
					if (storage) {
						storage.setItem("todoList", JSON.stringify($scope.todoList));
					}
				};

				$scope.getFromStorage();
			});
});