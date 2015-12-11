/** 

  Custom Filters

**/



// Gets the calendar date
// Or regular format date if not Today or Tomorrow
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

app.filter('capitalize', function() {
  return function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
});



