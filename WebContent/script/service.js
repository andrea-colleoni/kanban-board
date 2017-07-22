/**
 * 
 */
angular.module('kanbanApp.service', [])
.factory('kanbanStorage', ['$http', '$log', function($http, $log) {
	var service = { };
	
	service.storageKey = function() {
		return 'kanbanTasks';
	}
	service.tasks = [];
	
	service.importanza = [
		{ valore: 0, testo: 'Urgente'},
		{ valore: 1, testo: 'Alta'},
		{ valore: 2, testo: 'Normale'},
		{ valore: 3, testo: 'Bassa'},
		{ valore: 4, testo: 'Non importante'}
	];
	
	service.addTask = function(task) {
		this.tasks.push(task);
		$log.info('Task ' + task.id + ' aggiunto');
	}
	
	service.removeTask = function(taskId) {
		var newTasks = this.tasks.filter(function(task){
			return task.id !== taskId;
		});
		this.tasks = newTasks;
		$log.info('Task ' + taskId + ' rimosso');
	}	
	
	service.saveToStorage = function() {
		localStorage.setItem(service.storageKey(), JSON.stringify(this.tasks));
		$log.info('Tasks salvati nello storage');
	}
	
	service.loadFromStorage = function() {
		var tasks = JSON.parse(localStorage.getItem(service.storageKey()));
		if (tasks)
			tasks.forEach(function(task) {
				service.addTask(task);
			});
		$log.info('Tasks caricati dallo storage');
	}
	
	service.newTask = function() {
		var maxId = this.tasks.reduce(function(prevVal, task) {
		    return Math.max(prevVal, task.id);
		}, 0);
		var newTask = {
				"id": maxId + 1,
				"titolo": "Nuovo task",
				"testo": "Descrizione del task",
				"dataApertura": new Date().toLocaleDateString(),
				"dataUltimaModifica": new Date().toLocaleDateString(),
				"importanza": 1,
				"stato": 0,
				"editMode": true			
		};
		$log.info('Nuovo task ' + newTask.id + ' creato');
		service.addTask(newTask);
		return newTask;
	}
	
	service.loadTestData = function() {
		$http({
			url: 'dati/tasks.json',
			method: 'get'
		})
		.then(
				function(response) {
					$log.debug(response);
					response.data.forEach(function(task) {
						service.addTask(task);
					});
					$log.info('Tasks caricati con $http');
				}, 
				function(error) {
					$log.error(error);
				});
	}
	
	return service;
}]);