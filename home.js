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
  issues.forEach((issue) => {
    if (issue.status === "open") {
      const newDiv = document.createElement("div");
      newDiv.innerHTML = `
        <div
          class="card p-6 bg-white shadow-md border-t-5 border-[#00A96E] rounded-md"
        >
          <div class="flex justify-between">
            <div><img src="assets/Open-Status.png" alt="" /></div>
            <div class="px-5 py-1 bg-[#FEECEC] rounded-full">
              <h1 class="text-red-500 text-sm">HIGH</h1>
            </div>
          </div>
          <h1 class="font-bold mt-3 mb-2 text-sm">
            Fix navigation menu on mobile devices
          </h1>
          <p class="text-sm pb-3 text-[#64748B]">
            The navigation menu doesn't collapse properly on mobile devices...
          </p>

          <div class="mother-bug flex gap-2 mb-4">
            <div
              class="px-2 py-1 bg-[#FEECEC] border border-red-600 rounded-full"
            >
              <h1 class="text-red-500 text-sm">
                <i class="fa-solid fa-bug"></i> BUG
              </h1>
            </div>
          </div>
          <div class="-mx-6 border-t border-gray-300"></div>
          <div class="time py-3">
            <p class="text-[#64748B]">#1 by john_doe</p>
            <p class="text-[#64748B]">1/15/2024</p>
          </div>
        </div>
        `;
      const allSec = document.getElementById("all");
      const openSec = document.getElementById("open");
      allSec.append(newDiv);

      const clone = newDiv.cloneNode(true);
      openSec.append(clone);
    } else if (issue.status === "closed") {
      const newDiv2 = document.createElement("div");
      newDiv2.innerHTML = `
        <div
          class="card p-6 bg-white shadow-md border-t-5 border-[#A855F7] rounded-md"
        >
          <div class="flex justify-between">
            <div><img src="assets/Closed- Status .png" alt="" /></div>
            <div class="px-5 py-1 bg-[#FEECEC] rounded-full">
              <h1 class="text-red-500 text-sm">HIGH</h1>
            </div>
          </div>
          <h1 class="font-bold mt-3 mb-2 text-sm">
            Fix navigation menu on mobile devices
          </h1>
          <p class="text-sm pb-3 text-[#64748B]">
            The navigation menu doesn't collapse properly on mobile devices...
          </p>

          <div class="mother-bug flex gap-2 mb-4">
            <div
              class="px-2 py-1 bg-[#FEECEC] border border-red-600 rounded-full"
            >
              <h1 class="text-red-500 text-sm">
                <i class="fa-solid fa-bug"></i> BUG
              </h1>
            </div>
          </div>
          <div class="-mx-6 border-t border-gray-300"></div>
          <div class="time py-3">
            <p class="text-[#64748B]">#1 by john_doe</p>
            <p class="text-[#64748B]">1/15/2024</p>
          </div>
        </div>
        `;
      const allSec = document.getElementById("all");
      const closeSec = document.getElementById("close");
      allSec.append(newDiv2);

      const clone = newDiv2.cloneNode(true);
      closeSec.append(clone);
    }
  });
};

rawIssues();
