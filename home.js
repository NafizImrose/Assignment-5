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
