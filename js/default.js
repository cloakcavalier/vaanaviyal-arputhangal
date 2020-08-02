function dateFixer() {
    var dateLabels = document.getElementsByClassName("elapsed-time");
    var index, dateText, dateObj, currentDate = new Date(),
        diffTime, diffHours, diffFinal, unitTxt, hours = 1000 * 60 * 60;
    for (index = 0; index < dateLabels.length; index++) {
        dateText = dateLabels[index].innerHTML;
        dateObj = new Date(dateText.trim());
        diffTime = Math.abs(currentDate - dateObj);
        diffHours = Math.ceil(diffTime / hours);

        diffFinal = diffHours;
        unitTxt = "hour";

        if (diffFinal > 48) {
            diffFinal = Math.floor(diffFinal / 24);
            unitTxt = "day";
        }
        if (diffFinal > 6 && unitTxt === "day") {
            diffFinal = Math.floor(diffFinal / 7);
            unitTxt = "week";
        }

        if (diffFinal > 3 && unitTxt === "week") {
            diffFinal = Math.floor(diffFinal / 4);
            unitTxt = "month";
        }

        if (diffFinal > 11 && unitTxt === "month") {
            diffFinal = Math.floor(diffFinal / 12);
            unitTxt = "year";
        }

        if (diffFinal > 1) {
            unitTxt = unitTxt + "s";
        }
        dateLabels[index].innerHTML = "" + diffFinal + " " + unitTxt + " ago";

    }
}

dateFixer();
