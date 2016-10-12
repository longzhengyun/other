require.config({
	paths:{
		'domReady': 'library/require/domReady',
		'angular': 'library/angular/angular.min',
		'uiRouter': 'library/angular/angular-ui-router'
	},
	shim:{
		'angular':{
			exports: 'angular'
		},
		'uiRouter':{
			deps: ['angular']
		}
	},
	deps: [
        './bootstrap'
    ]
});