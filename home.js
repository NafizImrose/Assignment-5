const all = document.getElementById("all-btn");
all.classList.add("active");

const tabBtn = (id, btn) => {
  const all = document.getElementById("all");
  const open = document.getElementById("open");
  const close = document.getElementById("close");
  const search = document.getElementById("search");

  all.classList.add("hidden");
  open.classList.add("hidden");
  close.classList.add("hidden");
  search.classList.add("hidden");

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
  //   issues count show
  showNoOfIssues(btn);
};

const showNoOfIssues = (btn_id) => {
  const allcount = document.getElementById("all-count");
  const opencount = document.getElementById("open-count");
  const closecount = document.getElementById("close-count");

  allcount.classList.add("hidden");
  opencount.classList.add("hidden");
  closecount.classList.add("hidden");

  if (btn_id === "all-btn") {
    allcount.classList.remove("hidden");
    document.getElementById("all-count").innerText = allCnt;
  } else if (btn_id === "open-btn") {
    opencount.classList.remove("hidden");
    document.getElementById("open-count").innerText = openCnt;
  } else if (btn_id === "close-btn") {
    opencount.classList.remove("hidden");
    document.getElementById("open-count").innerText = closeCnt;
  }
};

const rawIssues = () => {
  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res) => res.json())
    .then((allData) => allissues(allData.data));
};
let allCnt = 0;
let openCnt = 0;
let closeCnt = 0;
const allissues = (issues) => {
  issues.forEach((issue) => {
    allCnt++;
    const newDiv = document.createElement("div");
    newDiv.innerHTML = `
        <div id="card-${issue.id}" onclick="my_modal_${issue.id}.showModal()"
          class="card p-6 bg-white shadow-md border-t-5  rounded-md"
        >
          <div class="flex justify-between">
            <div id="logo-${issue.id}"></div>
            <div id="badge_${issue.id}" class="px-5 py-1  rounded-full">
              <h1 id="badge-text-${issue.id}" class=" text-sm">${issue.priority}</h1>
            </div>
          </div>
          <h1 class="font-bold mt-3 mb-2 text-sm">
            ${issue.title}
          </h1>
          <p class="text-sm pb-3 text-[#64748B]">
            ${issue.description}
          </p>

          <div id="labels-${issue.id}" class="mother-bug flex gap-2 mb-4">
            
          </div>
          <div class="-mx-6 border-t border-gray-300"></div>
          <div class="time py-3">
            <div class="flex justify-between">
          <p class="text-[#64748B] text-[12px]">#${issue.id} by ${issue.author ? issue.author : "N/A"}</p>
          <p class="text-[#64748B] text-[12px]">${new Date(issue.createdAt).toLocaleDateString()}</p>
        </div>
        <div class="flex justify-between">
          <p class="text-[#64748B] text-[12px]">Assignee: ${issue.assignee ? issue.assignee : "N/A"}</</p>
          <p class="text-[#64748B] text-[12px]">Updated: ${new Date(issue.updatedAt).toLocaleDateString()}</p>
        </div>
          </div>
        </div>
        `;
    // Modal section
    const modalDiv = document.createElement("div");
    modalDiv.innerHTML = `
         <!-- Open the modal using ID.showModal() method -->

      <dialog id="my_modal_${issue.id}" class="modal modal-bottom sm:modal-middle">
        <div class="modal-box">
          <h3 class="text-lg font-bold mb-2">${issue.title}</h3>
          <div class="m-div text-sm flex gap-2 justify-start items-center">
            <div class="px-2 py-1 bg-[#00A96E] rounded-full">
              <h1 class="text-white">Opened</h1>
            </div>
            <div class="w-1 h-1 rounded-full bg-[#64748B]"></div>
            <p class="text-[#64748B]">Opened by ${issue.assignee ? issue.assignee : "N/A"}</p>
            <div class="w-1 h-1 rounded-full bg-[#64748B]"></div>
            <p class="text-[#64748B]">${new Date(issue.createdAt).toLocaleDateString()}</p>
          </div>
          <!-- badges -->
          <div
            id="modal-labels-${issue.id}"
            class="mother-bug flex gap-2 my-6"
          ></div>
          <p class="text-[#64748B] mb-6">
            ${issue.description}
          </p>
          <div class="flex justify-between items-center p-4 rounded-md bg-[#F8FAFC]">
            <div class="">
              <p class="text-[#64748B]">Assignee:</p>
              <h1 class="font-bold">${issue.assignee ? issue.assignee : "N/A"}</h1>
            </div>
            <div class="flex flex-col items-center ">
              <p class="text-[#64748B]">Priority:</p>
              <div id="modal-badge_${issue.id}" class="px-5 py-1  rounded-full">
              <h1 id="modal-badge-text-${issue.id}" class="font-bold ">${issue.priority}</h1>
              </div>
            </div>
          </div>
          <div class="modal-action">
            <form method="dialog">
              <!-- if there is a button in form, it will close the modal -->
              <button class="btn btn-primary">Close</button>
            </form>
          </div>
        </div>
      </dialog>
        `;
    const modalSec = document.getElementById("modal-sec");
    modalSec.append(modalDiv);

    // modal ends
    const allSec = document.getElementById("all");

    allSec.append(newDiv);
    // adding labels
    const labels = issue.labels;
    labels.forEach((label) => {
      const labelDiv = document.createElement("div");
      if (label === "bug") {
        labelDiv.innerHTML = `
            <div
              class="px-2 py-1 bg-[#FEECEC] border border-red-600 rounded-full"
            >
              <h1 class="text-red-500 text-sm">
                <i class="fa-solid fa-bug"></i> ${label}
              </h1>
            </div>
            `;
      } else if (label === "help wanted") {
        labelDiv.innerHTML = `
            <div
              class="px-2 py-1 bg-[#fff5cc] border border-[#D97706] rounded-full"
            >
              <h1 class="text-[#D97706] text-sm">
                <i class="fa-solid fa-life-ring"></i> ${label}
              </h1>
            </div>
            `;
      } else if (label === "enhancement") {
        labelDiv.innerHTML = `
            <div
              class="px-2 py-1 bg-[#DEFCE8] border border-[#00A96E] rounded-full"
            >
              <h1 class="text-[#00A96E] text-sm">
                <i class="fa-solid fa-star-half-stroke"></i> ${label}
              </h1>
            </div>
            `;
      } else if (label === "good first issue") {
        labelDiv.innerHTML = `
            <div
              class="px-2 py-1 bg-[#d6f8ff] border border-[#0e92fd] rounded-full"
            >
              <h1 class="text-[#0e92fd] text-[13px]">
                <i class="fa-solid fa-thumbs-up"></i> ${label}
              </h1>
            </div>
            `;
      } else if (label === "documentation") {
        labelDiv.innerHTML = `
            <div
              class="px-2 py-1 bg-[#ffe7ff] border border-[#ff16f7] rounded-full"
            >
              <h1 class="text-[#ff14f7] text-[13px]">
                <i class="fa-solid fa-file-lines"></i> ${label}
              </h1>
            </div>
            `;
      }
      const motherLabel = document.getElementById(`labels-${issue.id}`);
      motherLabel.append(labelDiv);
      const cloneLabel = labelDiv.cloneNode(true); // appended labels to modal text
      const modalLabels = document.getElementById(`modal-labels-${issue.id}`);
      modalLabels.append(cloneLabel);
    });

    // badge background color setting
    const badge = document.getElementById(`badge_${issue.id}`);
    const badgeText = document.getElementById(`badge-text-${issue.id}`);
    const modalBadge = document.getElementById(`modal-badge_${issue.id}`);
    const modalBadgeText = document.getElementById(
      `modal-badge-text-${issue.id}`,
    );
    if (issue.priority === "high") {
      badge.classList.add("bg-[#FEECEC]");
      modalBadge.classList.add("bg-[#EF4444]");
      badgeText.classList.add("text-[#EF4444]");
      modalBadgeText.classList.add("text-white");
    } else if (issue.priority === "medium") {
      badge.classList.add("bg-[#FFF6D1]");
      modalBadge.classList.add("bg-[#00A96E]");
      badgeText.classList.add("text-[#F59E0B]");
      modalBadgeText.classList.add("text-white");
    } else if (issue.priority === "low") {
      badge.classList.add("bg-[#EEEFF2]");
      modalBadge.classList.add("bg-[#f5c951]");
      badgeText.classList.add("text-[#9CA3AF]");
      modalBadgeText.classList.add("text-white");
    }
    //   card border and logo
    const borderColor = document.getElementById(`card-${issue.id}`);

    //card logo
    const openLogo = document.createElement("div");
    openLogo.innerHTML = `<img src="assets/Open-Status.png" alt="" />`;
    const closeLogo = document.createElement("div");
    closeLogo.innerHTML = `<img src="assets/Closed- Status .png" alt="" />`;

    const logo = document.getElementById(`logo-${issue.id}`);

    if (issue.status === "open") {
      openCnt++;
      logo.append(openLogo);
      borderColor.classList.add("border-[#00A96E]");
      const openSec = document.getElementById("open");
      const clone = newDiv.cloneNode(true);
      openSec.append(clone);
    } else if (issue.status === "closed") {
      closeCnt++;
      logo.append(closeLogo);
      borderColor.classList.add("border-[#A855F7]");
      const closeSec = document.getElementById("close");
      const clone = newDiv.cloneNode(true);
      closeSec.append(clone);
    }
  });
};

rawIssues();

//  search
let searchCnt = 0;
document.getElementById("search-btn").addEventListener("click", function () {
  const all = document.getElementById("all");
  const open = document.getElementById("open");
  const close = document.getElementById("close");
  const search = document.getElementById("search");
  search.innerHTML = "";

  all.classList.add("hidden");
  open.classList.add("hidden");
  close.classList.add("hidden");
  search.classList.remove("hidden");

  const inputText = document.getElementById("search-text").value.trim();
  fetch(
    `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${inputText}`,
  )
    .then((res) => res.json())
    .then((data) => searchData(data.data));

  const searchSec = document.getElementById("search");
  const searchData = (issues) => {
    if (issues.length == 0) {
      const empty = document.createElement("div");
      empty.innerHTML = `
      <div class="p-12 bg-white col-span-full  flex justify-center items-center rounded">
        <h1 class="text-2xl font-bold"><i class="fa-solid fa-triangle-exclamation"></i> Nothing Is Found </h1>
      </div>
      `;
      searchSec.append(empty);
      return;
    }
    issues.forEach((issue) => {
      searchCnt++;

      const newDiv = document.createElement("div");
      newDiv.innerHTML = `
        <div id="search-card-${issue.id}" onclick="modal_${issue.id}.showModal()"
          class="card p-6 bg-white shadow-md border-t-5  rounded-md"
        >
          <div class="flex justify-between">
            <div id="search-logo-${issue.id}"></div>
            <div id="search-badge_${issue.id}" class="px-5 py-1  rounded-full">
              <h1 id="search-badge-text-${issue.id}" class=" text-sm">${issue.priority}</h1>
            </div>
          </div>
          <h1 class="font-bold mt-3 mb-2 text-sm">
            ${issue.title}
          </h1>
          <p class="text-sm pb-3 text-[#64748B]">
            ${issue.description}
          </p>

          <div id="search-labels-${issue.id}" class="mother-bug flex gap-2 mb-4">
            
          </div>
          <div class="-mx-6 border-t border-gray-300"></div>
          <div class="time py-3">
            <div class="flex justify-between">
          <p class="text-[#64748B] text-[12px]">#${issue.id} by ${issue.author ? issue.author : "N/A"}</p>
          <p class="text-[#64748B] text-[12px]">${new Date(issue.createdAt).toLocaleDateString()}</p>
        </div>
        <div class="flex justify-between">
          <p class="text-[#64748B] text-[12px]">Assignee: ${issue.assignee ? issue.assignee : "N/A"}</p>
          <p class="text-[#64748B] text-[12px]">Updated: ${new Date(issue.updatedAt).toLocaleDateString()}</p>
        </div>
          </div>
        </div>
        `;

      // Modal section
      const modalDiv = document.createElement("div");
      modalDiv.innerHTML = `
         <!-- Open the modal using ID.showModal() method -->

      <dialog id="modal_${issue.id}" class="modal modal-bottom sm:modal-middle">
        <div class="modal-box">
          <h3 class="text-lg font-bold mb-2">${issue.title}</h3>
          <div class="m-div text-sm flex gap-2 justify-start items-center">
            <div class="px-2 py-1 bg-[#00A96E] rounded-full">
              <h1 class="text-white">Opened</h1>
            </div>
            <div class="w-1 h-1 rounded-full bg-[#64748B]"></div>
            <p class="text-[#64748B]">Opened by ${issue.assignee ? issue.assignee : "N/A"}</p>
            <div class="w-1 h-1 rounded-full bg-[#64748B]"></div>
            <p class="text-[#64748B]">${new Date(issue.createdAt).toLocaleDateString()}</p>
          </div>
          <!-- badges -->
          <div
            id="search-modal-labels-${issue.id}"
            class="mother-bug flex gap-2 my-6"
          ></div>
          <p class="text-[#64748B] mb-6">
            ${issue.description}
          </p>
          <div class="flex justify-between items-center p-4 rounded-md bg-[#F8FAFC]">
            <div class="">
              <p class="text-[#64748B]">Assignee:</p>
              <h1 class="font-bold">${issue.assignee ? issue.assignee : "N/A"}</h1>
            </div>
            <div class="flex flex-col items-center ">
              <p class="text-[#64748B]">Priority:</p>
              <div id="search-modal-badge_${issue.id}" class="px-5 py-1  rounded-full">
              <h1 id="search-modal-badge-text-${issue.id}" class="font-bold ">${issue.priority}</h1>
              </div>
            </div>
          </div>
          <div class="modal-action">
            <form method="dialog">
              <!-- if there is a button in form, it will close the modal -->
              <button class="btn btn-primary">Close</button>
            </form>
          </div>
        </div>
      </dialog>
        `;
      const modalSec = document.getElementById("modal-sec");
      modalSec.append(modalDiv);

      // modal ends

      searchSec.append(newDiv);
      // adding labels
      const labels = issue.labels;
      labels.forEach((label) => {
        const labelDiv = document.createElement("div");
        if (label === "bug") {
          labelDiv.innerHTML = `
            <div
              class="px-2 py-1 bg-[#FEECEC] border border-red-600 rounded-full"
            >
              <h1 class="text-red-500 text-sm">
                <i class="fa-solid fa-bug"></i> ${label}
              </h1>
            </div>
            `;
        } else if (label === "help wanted") {
          labelDiv.innerHTML = `
            <div
              class="px-2 py-1 bg-[#fff5cc] border border-[#D97706] rounded-full"
            >
              <h1 class="text-[#D97706] text-sm">
                <i class="fa-solid fa-life-ring"></i> ${label}
              </h1>
            </div>
            `;
        } else if (label === "enhancement") {
          labelDiv.innerHTML = `
            <div
              class="px-2 py-1 bg-[#DEFCE8] border border-[#00A96E] rounded-full"
            >
              <h1 class="text-[#00A96E] text-sm">
                <i class="fa-solid fa-star-half-stroke"></i> ${label}
              </h1>
            </div>
            `;
        } else if (label === "good first issue") {
          labelDiv.innerHTML = `
            <div
              class="px-2 py-1 bg-[#d6f8ff] border border-[#0e92fd] rounded-full"
            >
              <h1 class="text-[#0e92fd] text-[13px]">
                <i class="fa-solid fa-thumbs-up"></i> ${label}
              </h1>
            </div>
            `;
        } else if (label === "documentation") {
          labelDiv.innerHTML = `
            <div
              class="px-2 py-1 bg-[#ffe7ff] border border-[#ff16f7] rounded-full"
            >
              <h1 class="text-[#ff14f7] text-[13px]">
                <i class="fa-solid fa-file-lines"></i> ${label}
              </h1>
            </div>
            `;
        }
        const motherLabel = document.getElementById(
          `search-labels-${issue.id}`,
        );
        motherLabel.append(labelDiv);
        const cloneLabel = labelDiv.cloneNode(true); // appended labels to modal text
        const modalLabels = document.getElementById(
          `search-modal-labels-${issue.id}`,
        );
        modalLabels.append(cloneLabel);
      });

      // badge background color setting
      const badge = document.getElementById(`search-badge_${issue.id}`);
      const badgeText = document.getElementById(
        `search-badge-text-${issue.id}`,
      );
      const modalBadge = document.getElementById(
        `search-modal-badge_${issue.id}`,
      );
      const modalBadgeText = document.getElementById(
        `search-modal-badge-text-${issue.id}`,
      );
      if (issue.priority === "high") {
        badge.classList.add("bg-[#FEECEC]");
        modalBadge.classList.add("bg-[#EF4444]");
        badgeText.classList.add("text-[#EF4444]");
        modalBadgeText.classList.add("text-white");
      } else if (issue.priority === "medium") {
        badge.classList.add("bg-[#FFF6D1]");
        modalBadge.classList.add("bg-[#00A96E]");
        badgeText.classList.add("text-[#F59E0B]");
        modalBadgeText.classList.add("text-white");
      } else if (issue.priority === "low") {
        badge.classList.add("bg-[#EEEFF2]");
        modalBadge.classList.add("bg-[#f5c951]");
        badgeText.classList.add("text-[#9CA3AF]");
        modalBadgeText.classList.add("text-white");
      }
      //   card border and logo
      const borderColor = document.getElementById(`search-card-${issue.id}`);

      //card logo
      const openLogo = document.createElement("div");
      openLogo.innerHTML = `<img src="assets/Open-Status.png" alt="" />`;
      const closeLogo = document.createElement("div");
      closeLogo.innerHTML = `<img src="assets/Closed- Status .png" alt="" />`;

      const logo = document.getElementById(`search-logo-${issue.id}`);

      if (issue.status === "open") {
        logo.append(openLogo);
        borderColor.classList.add("border-[#00A96E]");
      } else if (issue.status === "closed") {
        logo.append(closeLogo);
        borderColor.classList.add("border-[#A855F7]");
      }
    });
  };
});
