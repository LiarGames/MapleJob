document.getElementById("prefer").addEventListener("submit", function (e) {
  e.preventDefault();

  const jobType = document.querySelector('input[name="type"]:checked').value;
  const telType = document.querySelector('input[name="tel"]:checked').value;
  const jumpType = document.querySelector('input[name="jump"]:checked').value;
  const perType = document.querySelector('input[name="per"]:checked').value;

  fetch('job.json')
    .then(res => res.json())
    .then(data => {
      const results = data.filter(job =>
        (jobType === "상관없음" || job.type === jobType) &&
        (telType === "상관없음" || job.tel === telType) &&
        (
            jumpType === "상관없음" ||
            job.jump === jumpType ||
            (jumpType === "D" && job.jump === "T")
        ) &&
        (perType === "상관없음" || job.per === perType)
      );

      displayResults(results);
    })
    .catch(err => {
      console.error("JSON ERR", err);
    });
});

function displayResults(jobs) {
  const container = document.getElementById("result");

    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    if (jobs.length === 0) {
        const noResult = document.createElement("p");
        noResult.textContent = "조건에 딱 맞는 직업이 없습니다.";
        container.appendChild(noResult);
        return;
    }

    const heading = document.createElement("h2");
    heading.textContent = "추천 직업";
    container.appendChild(heading);

    const list = document.createElement("ul");

    for (const job of jobs) {
        const item = document.createElement("li");
        item.textContent = job.name;
        list.appendChild(item);
    }

    container.appendChild(list);
}