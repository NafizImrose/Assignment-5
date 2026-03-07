const tabBtn = (id, btn) => {
  const all = document.getElementById("all");
  const open = document.getElementById("open");
  const close = document.getElementById("close");

  all.classList.add("hidden");
  open.classList.add("hidden");
  close.classList.add("hidden");

  const select = document.getElementById(id);
  select.classList.remove("hidden");
  // *********************************
  const allBtn = document.getElementById("all-btn");
  const openBtn = document.getElementById("open-btn");
  const closeBtn = document.getElementById("close-btn");

  allBtn.classList.remove("active");
  openBtn.classList.remove("active");
  closeBtn.classList.remove("active");

  const activeBtn = document.getElementById(btn);
  activeBtn.classList.add("active");
};

const rawIssues = () => {
  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res) => res.json())
    .then((allData) => allissues(allData.data));
};

const allissues = (issues) => {
  let open = 0;
  let close = 0;
  issues.forEach((issue) => {
    if (issue.status === "open") {
      open++;
    } else if (issue.status === "closed") {
      close++;
    }
  });
  console.log(open);
  console.log(close);
};

rawIssues();
