const summary = document.getElementById("summary");
const start = document.getElementById("inputStart");
const end = document.getElementById("inputEnd");
const submit = document.getElementById("submit");
const p = document.getElementById("p"); 

submit.addEventListener("click", async () => {
    await fetch("/post/finn", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            summary: summary.value,
            start: start.value,
            end: end.value
        })
    });
});

async function get() {
    let res = await fetch("/get/finn");
    let data = await res.json();
    console.log(data);
    p.innerHTML = data[0].summary;
}
get();