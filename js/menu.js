function menuclick() {
  var x = document.getElementById("topnavbar");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

function validateNotif() {
    var notifCount = document.getElementById("notifCount");
    if(notifCount.innerHTML == "0") {
        notifCount.style.display = 'none';
    } else {
        notifCount.style.display = 'inline-block';
    }
}

validateNotif();