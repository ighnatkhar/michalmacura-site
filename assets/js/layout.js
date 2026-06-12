document.addEventListener("DOMContentLoaded", () => {

    fetch("/michalmacura-site/assets/partials/footer.html")
        .then(res => {
            if (!res.ok) throw new Error("HTTP " + res.status);
            return res.text();
        })
        .then(data => {
            document.querySelector(".site-footer").innerHTML = data;
        })
        .catch(err => console.log("Footer load error:", err));

});