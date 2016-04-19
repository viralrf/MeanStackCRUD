
var app = angular.module('MeanApp',[]);

app.controller('indexCtrl',function($scope,$http){
	
	$scope.listaPlayers = [];
	$scope.player = {weapon: 'M3 Super 90 Assault Shotgun'};
	
	$scope.getPlayers = function(){
		$http({
			method: 'GET',
			url: '/getplayers'
		}).then(function successCallback(response){
			$scope.listaPlayers = response.data;
			$scope.player = {weapon: 'M3 Super 90 Assault Shotgun'};
			console.log('get success');
		},function errorCallback(response){
			console.log('get error');
		});
	}
	
	$scope.getPlayers();
	
	var checkBlank = function(player){
		if(
		player.nick   !== undefined && 
		player.weapon !== undefined && 
		player.frags  !== undefined &&
		player.nick   !== ""        && 
		player.weapon !== ""        && 
		player.frags  !== ""
		) return true;
		return false;
	}
	
	$scope.addPlayer = function(){
		if(checkBlank($scope.player)){
			$http({
				method: 'POST',
				url: '/addplayer',
				data: $scope.player
			}).then(function successCallback(response){
				console.log('add success');
			},function errorCallback(response){
				console.log('add error');
			});
			$scope.getPlayers();	
		}
	}
	
	$scope.updatePlayer = function(){
		if(checkBlank($scope.player)){
			$http({
				method: 'PUT',
				url: '/updateplayer',
				data: $scope.player
			}).then(function successCallback(response){
				console.log('update success');
			},function errorCallback(response){
				console.log('update error');
			});
		$scope.getPlayers();
		}
	}
	
	$scope.deletePlayer = function(player){
		$http({
			method: 'POST',
			url: '/deleteplayer',
			data: player
		}).then(function successCallback(response){
			console.log('delete success!');
		}, function errorCallback(response){
			console.log('delete error ._.');
		});
		$scope.getPlayers();
	}
	
	$scope.editar = function(player){
		$scope.player.nick = player.nick;
		$scope.player.weapon = player.weapon;
		$scope.player.frags = player.frags;
	}
	
	$scope.limpiar = function(){
		$scope.player = {weapon: 'M3 Super 90 Assault Shotgun'};
	}
	
});