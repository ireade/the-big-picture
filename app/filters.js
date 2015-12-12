/** 

  Custom Filters

**/

app.filter('momentDate', function() {
  return function(date) {

    var options = {
      lastDay : '[Yesterday at] LT',
      sameDay : '[Today at] LT',
      nextDay : '[Tomorrow at] LT',
      lastWeek : '[Last] dddd',
      nextWeek : '[Next] dddd',
      sameElse : 'dddd D MMM YYYY'
    }

    var calendarDate = moment( new Date(date) ).calendar(null, options);

    return calendarDate;

  }
});