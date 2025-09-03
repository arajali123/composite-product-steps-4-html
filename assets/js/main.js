
// Tabs JS
document.addEventListener("DOMContentLoaded", function () {

  document.querySelectorAll(".skincare-essentials-bundle-main-wrap").forEach(tabWrap => {
    const cartButtons = tabWrap.querySelectorAll(".cart-btn");
    const totalItems = tabWrap.querySelector(".select-number");

    if (!totalItems) return;

    const bundleItemsContainer = tabWrap.querySelector(".skincare-essentials-bundle-item");
    const bundleItems = bundleItemsContainer ? bundleItemsContainer.querySelectorAll(".bundle-item") : [];
    bundleItems.forEach(item => (item.style.display = "none"));

    const fixedSlots = Array.from(bundleItems);

    tabWrap.querySelectorAll(".bundle-table-counter").forEach(counter => {
      const countSpan = counter.querySelector(".count");
      countSpan.textContent = 0;
      counter.style.display = "flex";
    });

    function updateTotal(val) {
      let total = parseInt(totalItems.textContent) || 0;
      totalItems.textContent = Math.max(0, total + val);
    }

    function updateButtonText(button, count) {
      if (!button) return;
      button.textContent = count === 0 ? "Remove" : "Add Item";
    }

    // Button Loading
    function showLoading(button, callback) {
      if (!button) return;

      if (button.classList.contains("loading")) return;

      button.classList.add("loading");

      setTimeout(() => {
        button.classList.remove("loading");
        if (callback) callback();
      }, 700);
    }

    function incrementCounter(countSpan, slotIndex, button) {
      let count = parseInt(countSpan.textContent) || 0;
      count++;
      countSpan.textContent = count;

      updateTotal(1);

      if (slotIndex < fixedSlots.length) {
        fixedSlots[slotIndex].style.display = "flex";
      }

      updateButtonText(button, count);
    }

    function decrementCounter(countSpan, slotIndex, button) {
      let count = parseInt(countSpan.textContent) || 0;
      if (count > 0) {
        count--;
        countSpan.textContent = count;

        updateTotal(-1);

        if (slotIndex < fixedSlots.length && count === 0) {
          fixedSlots[slotIndex].style.display = "none";
        }

        updateButtonText(button, count);
      }
    }

    // Cart button
    cartButtons.forEach((button, index) => {
      button.addEventListener("click", () => {
        const row = button.closest("tr");
        if (!row) return;
        const countSpan = row.querySelector(".bundle-table-counter .count");
        if (!countSpan) return;

        showLoading(button, () => {
          incrementCounter(countSpan, index, button);
        });
      });
    });

    // Plus / Minus buttons
    tabWrap.querySelectorAll(".bundle-table-counter").forEach((counter, index) => {
      const plusBtn = counter.querySelector(".plus");
      const minusBtn = counter.querySelector(".minus");
      const countSpan = counter.querySelector(".count");
      const button = cartButtons[index];

      plusBtn.addEventListener("click", () => {
        showLoading(plusBtn, () => incrementCounter(countSpan, index, button));
      });

      minusBtn.addEventListener("click", () => {
        showLoading(minusBtn, () => decrementCounter(countSpan, index, button));
      });
    });

    // Close icon
    tabWrap.addEventListener("click", function (e) {
      if (e.target.closest(".close-icon")) {
        const item = e.target.closest(".bundle-item");
        const slotIndex = fixedSlots.indexOf(item);

        if (slotIndex !== -1 && item.style.display !== "none") {
          item.style.display = "none";

          const counter = tabWrap.querySelectorAll(".bundle-table-counter")[slotIndex];
          if (counter) {
            const countSpan = counter.querySelector(".count");
            let currentCount = parseInt(countSpan.textContent) || 0;

            if (currentCount > 0) {
              countSpan.textContent = currentCount - 1;
              updateTotal(-1);

              const button = cartButtons[slotIndex];
              updateButtonText(button, currentCount - 1);
            }
          }
        }
      }
    });
  });
});

// Back Next Button Js
document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll('[id^="tab-"]');
  const tabButtons = document.querySelectorAll(".tab-button");
  const nextButtons = document.querySelectorAll(".next-btn");
  const backButtons = document.querySelectorAll(".back-btn");
  const previewBtn = document.querySelector(".prview-btn");
  const previewWrap = document.querySelector(".skincare-essentials-bundle-preview-wrapper");
  const mainWrapper = document.querySelector(".skincare-essentials-bundle-main-wrapper");

  let currentStep = 0;

  function showTab(index) {
    tabs.forEach((tab, i) => tab.style.display = i === index ? "block" : "none");
    tabButtons.forEach((btn, i) => btn.classList.toggle("active", i === index));
    currentStep = index;

    if (previewWrap) previewWrap.style.display = "none";
  }

  // Next / Back buttons
  nextButtons.forEach(btn => btn.addEventListener("click", () => {
    if (currentStep < tabs.length - 1) showTab(currentStep + 1);
  }));

  backButtons.forEach(btn => btn.addEventListener("click", () => {
    if (currentStep > 0) showTab(currentStep - 1);
  }));

  tabButtons.forEach((btn, index) => btn.addEventListener("click", e => {
    e.preventDefault();
    showTab(index);
  }));

  showTab(0);

  if (previewBtn && mainWrapper) {
    previewBtn.addEventListener("click", e => {
      e.preventDefault();

      mainWrapper.style.display = "none";

      tabButtons.forEach(btn => btn.style.display = "none");
      nextButtons.forEach(btn => btn.style.display = "none");
      backButtons.forEach(btn => btn.style.display = "none");

      if (previewWrap) previewWrap.style.display = "block";
    });
  }
});



































































