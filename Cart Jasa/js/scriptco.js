// Copy Nomor Rekening
function copyNorek() {
    const norek = document.getElementById("norek").innerText;
    navigator.clipboard.writeText(norek);
    alert("Nomor rekening berhasil disalin!");
}

// Show Popup
document.getElementById("btn-konfirmasi").addEventListener("click", function () {
    const popup = new bootstrap.Modal(document.getElementById('popupKonfirmasi'));
    popup.show();
});

// Tombol Iya 
document.addEventListener("DOMContentLoaded", function () {

    const nama = document.getElementById("nama");
    const jasa = document.getElementById("jasa-nama");
    const btnKonfirmasi = document.getElementById("btn-ya");

    btnKonfirmasi.addEventListener("click", function () {

        if (!nama.value.trim()) {
            alert("Harap isi nama pada Informasi Pelanggan.");
            return;
        }

        const waAdmin = "628170854333";

        const namaCustomer = nama.value.trim();
        const namaJasa = jasa.innerText.trim();

        // ⬇⬇ kategori diambil dari localStorage
        const category = localStorage.getItem("selected_category");

        // TEMPLATE PESAN WA
        const templates = {
            konsultasi: `Halo, nama saya ${namaCustomer}. Saya ingin mengkonfirmasi pembayaran untuk jasa ${namaJasa}.`,
            dp: `Halo, nama saya ${namaCustomer}. Saya ingin mengkonfirmasi pembayaran awal (dp) untuk jasa ${namaJasa}.`,
            nodp: `Halo, nama saya ${namaCustomer}. Saya ingin memesan layanan ${namaJasa}. Mohon informasinya.`,
        };

        // jika kategori tidak ditemukan → fallback template
        const pesan = templates[category] ||
            `Halo, nama saya ${namaCustomer}. Saya ingin menanyakan layanan ${namaJasa}.`;

        // buka whatsapp
        const url = `https://wa.me/${waAdmin}?text=${encodeURIComponent(pesan)}`;
        window.location.href = url;
    });

});

// Tombol Belum
document.getElementById("btn-belum").addEventListener("click", function () {
    const popup = bootstrap.Modal.getInstance(document.getElementById('popupKonfirmasi'));
    popup.hide();
});

// Shopping Cart & Payment Info
document.addEventListener("DOMContentLoaded", function () {

    const jasa = localStorage.getItem("selected_jasa");
    const harga = localStorage.getItem("selected_harga");
    const icon = localStorage.getItem("selected_icon");
    const category = localStorage.getItem("selected_category");

    // Jangan lanjut jika datanya tidak lengkap
    if (!(jasa && harga && icon && category)) return;

    // === Render data utama ke cart ===
    document.getElementById("jasa-nama").textContent = jasa;
    document.getElementById("jasa-harga").textContent =
        "Rp. " + Number(harga).toLocaleString();

    // icon dimasukkan sebagai HTML 
    document.getElementById("cart-icon").innerHTML = icon;


    // === Template Pembayaran berdasarkan kategori ===
    const paymentTemplates = {
        konsultasi: {
            notes: `
                1. Tekan tombol “Salin” untuk menyalin nomor rekening. <br>
                2. Lakukan transfer sesuai nominal yang tertera pada keranjang belanja Anda. <br>
                3. Setelah melakukan pembayaran, Tekan tombol “Konfirmasi Pembayaran” dibawah. <br>
                4. Anda akan diarahkan ke whatsapp, sertakan bukti transfer melalui WhatsApp. <br>
                5. Admin akan memverifikasi pembayaran Anda.
            `,
            buttonText: "Konfirmasi Pembayaran"
        },

        dp: {
            notes: `
                1. Tekan tombol “Salin” untuk menyalin nomor rekening. <br>
                2. Lakukan pembayaran DP sebesar 50% dari nominal yang tertera pada keranjang belanja. <br>
                3. Setelah membayar, tekan tombol “Konfirmasi Pembayaran” di bawah. <br>
                4. Anda akan diarahkan ke WhatsApp—kirimkan bukti transfer DP kepada admin. <br>
                5. Admin akan memverifikasi DP Anda. <br>
                6. Setelah jasa selesai, lakukan pelunasan sesuai tagihan yang diinformasikan admin. <br>
                7. Kirimkan bukti pelunasan melalui WhatsApp untuk menyelesaikan proses. 
            `,
            buttonText: "Konfirmasi Pembayaran"
        },

        nodp: {
            notes: `
                1. Tekan tombol “Pesan Sekarang” untuk memesan via WhatsApp. <br>
                2. Berikan detail kebutuhan Anda kepada admin. <br>
                3. Jasa akan dikerjakan sesuai permintaan Anda. <br>
                4. Setelah selesai, admin akan mengirimkan total pembayaran. <br>
                5. Lakukan pembayaran dan kirimkan bukti transfer melalui WhatsApp.
            `,
            buttonText: "Pesan sekarang"
        }
    };


    // === Ambil template sesuai kategori ===
    const tpl = paymentTemplates[category];

    if (tpl) {
        document.getElementById("payment-notes").innerHTML = tpl.notes;
        document.getElementById("btn-konfirmasi").textContent = tpl.buttonText;
    }

});




