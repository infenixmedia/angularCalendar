/*
	AngularJS Calendar Directive
	Developed by Infenix Media and Jose Martinez
	www.infenixmedia.com
*/

angular.module('ifxCalendar',[])
.directive('calendar',[function(){
  return {
  	restrict: 'A',
    replace: false,
    scope: true,
    template:'<div class="cTitle"><ul><li><i class="fa fa-caret-left" ng-click="changeMonth(false)"></i></li><li>{{ month | date:\'MMMM yyyy\' }}</li><li><i class="fa fa-caret-right" ng-click="changeMonth(true)"></i></li></ul></div><div class="cLabels"><ul><li ng-repeat="day in days track by $index">{{ day }}</li></ul></div><div class="cDays"><ul><li ng-repeat="day in calendar track by $index" ng-class="day.class">{{ day.date | date:\'d\' }}</li></ul></div>',
    link: function(s,e){

    	s.month = new Date();
      	s.days = ['S','M','T','W','T','F','S'];
      	s.calendar = build(s.month);

      	s.changeMonth = function(e){
      		e ? s.month.setMonth(s.month.getMonth()+1) : s.month.setMonth(s.month.getMonth()-1);
      		s.calendar = build(s.month);
      	}

      	function build(date){
	        var firstDay = new Date(date.getFullYear(),date.getMonth(),1);
	        var days = []
	        var i,createDate,previous,lastDate;

	        //if first day of month does not start on sunday (0)
	        if(firstDay.getDay()!=0){
	        	previous = new Date(date.getFullYear(),date.getMonth(),0).getDate() - firstDay.getDay() + 1;
	          	
	          	for(i=0;i<firstDay.getDay();i++){
	            	createDate = new Date(date.getFullYear(),date.getMonth() - 1,previous + i);
	            	days.push({date:createDate,class:'inactive'});
	          	}
	        }

	        //build calendar days for current month
	        lastDate = new Date(date.getFullYear(),date.getMonth()+1,0);

	        for(i=0;i<lastDate.getDate();i++){
	          	createDate = new Date(date.getFullYear(),date.getMonth(),i+1); 
	          	days.push({date:createDate,class:'active'});
	        }

	        //if last day of the month is not saturday (6)
	        if(lastDate.getDay()!=6){
	          	for(i=0;i<(6-lastDate.getDay());i++){
	            	createDate = new Date(date.getFullYear(),date.getMonth()+1,1+i);

	            	days.push({date:createDate,class:'inactive'});
	          	}
	        }

	        return days
	    }

      
    }
  }
}])
