/** 

  Custom Filters

**/



// Gets the calendar date
// Or regular format date if not Today or Tomorrow
app.filter('momentDate', function() {
  return function(date) {



    var calendarDate = moment( new Date(date) ).calendar();

    if ( calendarDate.indexOf('Today') > -1 ) {
      return 'Today';
    } else if ( calendarDate.indexOf('Tomorrow') > -1 ) {
      return 'Tomorrow'
    } else {
      return moment(date).format('dddd D MMM YYYY');
    }

  }
});

app.filter('capitalize', function() {
  return function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
});



