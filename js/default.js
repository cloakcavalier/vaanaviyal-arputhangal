function dateFixer() {
    var dateLabels = document.getElementsByClassName("elapsed-time");
    var index, dateText, dateObj, currentDate = new Date(),
        diffTime, diffHours, diffFinal, hours = 1000 * 60 * 60;
    for (index = 0; index < dateLabels.length; index++) {
        dateText = dateLabels[index].innerHTML;
        dateObj = new Date(dateText);
        diffTime = Math.abs(currentDate - dateObj);
        diffHours = Math.ceil(diffTime / hours);

        if (diffHours > 24) {
            diffFinal = Math.round(diffHours / 24)
        } else {
            diffFinal = Math.round(diffHours);
        }
        dateLabels[index].innerHTML = "Uploaded " + diffFinal + " days ago";

    }
}

dateFixer();
