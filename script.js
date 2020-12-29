$(document).ready(load);

var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "Novemeber", "December"];
const now = new Date();

function load() {
  /* Setup all features of Web Calendar App */
  populateYear()
  loadYear();
}

function populateYear() {
  /* Populate special days array with days without fixed dates*/
  var year = now.getFullYear();
  var month = 0;
  var day = 0;
  //Easter
  /*Credit https://gist.github.com/johndyer/0dffbdd98c2046f41180c051f378f343 */
  var f = Math.floor,
  // Golden Number - 1
  G = year % 19,
  C = f(year / 100),
  // related to Epact
  H = (C - f(C / 4) - f((8 * C + 13)/25) + 19 * G + 15) % 30,
  // number of days from 21 March to the Paschal full moon
  I = H - f(H/28) * (1 - f(29/(H + 1)) * f((21-G)/11)),
  // weekday for the Paschal full moon
  J = (year + f(year / 4) + I + 2 - C + f(C / 4)) % 7,
  // number of days from 21 March to the Sunday on or before the Paschal full moon
  L = I - J,
  month = 3 + f((L + 40)/44),
  day = L + 28 - 31 * f(month / 4);
  specialDays[month-1][day-1] = "Easter Sunday";
}

function loadYear() {
  /* Load calendar feature */
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
      } else if ((j < now.getDate() && i == now.getMonth()) || i < now.getMonth()) {
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
