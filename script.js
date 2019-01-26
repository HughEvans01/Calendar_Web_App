$(document).ready(loadYear);

var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "Novemeber", "December"];

function loadYear() {
  const now = new Date();
  for (i = 0; i < 12; i++) {
    const monthLength = new Date(now.getFullYear(), i - 1, 0).getDate();
    const firstDay = new Date(now.getFullYear(), i, 1);
    //Setup table
    $("#year").append("<p class='monthName'>" + monthNames[i] + "</p>");
    $("#year").append("<table id='" + i + "' class='month'></table>");
    $("#" + i).append("<tr><td>S</td><td>M</td><td>T</td><td>W</td><td>T</td><td>F</td><td>S</td></tr>");
    $("#" + i).append("<tr></tr>");
    //Add empty days to align following days correctly
    var n = firstDay.getDay();
    while (n>0){
      $("#" + i + " tr:last").append("<td></td>");
      n--;
    }
    for (j = 1; j <= monthLength; j++) {
      //Add day to calendar
      $("#" + i + " tr:last").append("<td></td>");
      $("#" + i + " tr:last td:last").html("<td>" + j + "</td>");
      //Apply formating
      $("#" + i + " tr:last td:last").attr("title", specialDays[i][j - 1]);
      if (j == now.getDate() && i == now.getMonth()) {
        $("#" + i + " tr:last td:last").css({ "background-color": "lightgreen" });
      } else if (specialDays[i][j - 1] != "") {
        $("#" + i + " tr:last td:last").css({ "background-color": "orange" });
      } else if (j < now.getDate() && i <= now.getMonth()) {
        $("#" + i + " tr:last td:last").css({ "background-color": "grey" });
      } else {
        $("#" + i + " tr:last td:last").css({ "background-color": "lightgrey" });
      }
      //Insert new row
      if ((firstDay.getDay()+j) % 7 == 0) {
        $("#" + i).append("<tr></tr>");
      }
    }
  }
}

var specialDays = [
  ["New Year's Day", "", "", "World Braille Day", "", "", "", "", "", "", "International Thank-You Day", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "", "", "", "Darwin Day", "", "Valentine's Day", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
  ["", "", "World Wildlife Day", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "World Meteorological Day", "", "", "", "", "", "", "", "", ""],
  ["", "World Autism Awareness Day", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "World Penguin Day", "", "", "", "", "", ""],
  ["", "", "", "", "International Midwives Day", "", "", "", "", "", "", "International Nurses Day", "", "", "International Day of Families", "", "", "", "", "World Bee Day", "", "", "", "", "", "", "", "", "", "", "", ""],
  ["Global Day of Parents", "", "World Bicycle Day", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "World Refugee Day", "", "", "", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "", "", "World Migratory Bird Day", "", "", "", "", "", "", "Nelson Mandela International Day", "", "", "", "", "", "", "", "", "", "", "", "International Day of Friendship", "", ""],
  ["", "", "", "", "", "", "", "", "", "", "", "", "", "World Lizard Day", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "International Day of Peace", "", "", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "World Teachers’ Day", "", "", "", "", "", "", "", "", "", "", "World Food Day", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "Halloween", ""],
  ["", "", "", "", "World Tsunami Awareness Day", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "Universal Children’s Day", "", "", "", "", "", "", "", "", "", "", ""],
  ["World AIDS Day", "", "", "", "", "", "", "", "", "Human Rights Day", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "Christmas Day", "Boxing Day", "", "", "", "New Year's Eve", ""]];
