document.addEventListener("DOMContentLoaded", () => {

    fetch("/assets/partials/footer.html")
        .then(res => res.text())
        .then(data => {
            document.querySelector(".site-footer").innerHTML = data;
        })
        .catch(err => console.log("Footer load error:", err));

});