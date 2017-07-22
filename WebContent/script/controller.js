/**
 * 
 */
angular.module('kanbanApp.controller', [])
.controller('taskController', [
				'$scope', 
				'kanbanStorage', 
				function($scope, ks){
	
	$scope.tasks = ks.tasks;
	$scope.importanza = ks.importanza;
	$scope.newTask = ks.newTask;
	$scope.saveToStorage = ks.saveToStorage;
	
	ks.loadFromStorage();
	//ks.loadTestData();
}]);