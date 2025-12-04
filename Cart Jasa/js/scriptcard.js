document.querySelectorAll(".detail-btn").forEach((btn) => {
    btn.addEventListener("click", function () {

        const card = this.closest(".card");
        const detail = card.querySelector(".detail-content");

        detail.classList.toggle("d-none");

        // Toggle button text
        if (detail.classList.contains("d-none")) {
            this.textContent = "Lihat Detail";
        } else {
            this.textContent = "Lihat Lebih Sedikit";
        }
    });
});

//Button add to cart
document.querySelectorAll(".co-btn").forEach(btn => {
    btn.addEventListener("click", function () {
        const nama = this.getAttribute("data-jasa");
        const harga = this.getAttribute("data-harga");
        const icon = this.getAttribute("data-icon");
        const category = this.getAttribute("data-category");

        // Simpan ke localStorage
        localStorage.setItem("selected_jasa", nama);
        localStorage.setItem("selected_harga", harga);
        localStorage.setItem("selected_icon", icon);
        localStorage.setItem("selected_category", category);
    });
});
