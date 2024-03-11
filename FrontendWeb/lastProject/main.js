let bukuSendiri = [];

function getDataLocal() {
    const bukuJSON = localStorage.getItem('bukuSendiri');
    return bukuJSON ? JSON.parse(bukuJSON) : [];
}

document.addEventListener('DOMContentLoaded', function() {
    bukuSendiri = getDataLocal();
    bukuSendiri.forEach(buku => {
        simpanBuku(buku);
    });
});

function tambahBuku() {
    const judul = document.getElementById('inputBookTitle').value;
    const penulis = document.getElementById('inputBookAuthor').value;
    const tahun = document.getElementById('inputBookYear').value;
    const selesaiDibaca = document.getElementById('inputBookIsComplete').checked;

    if (judul && penulis && tahun) {
        const bukuBaru = {
            id: +new Date(),
            title: judul,
            author: penulis,
            year: parseInt(tahun),
            isComplete: selesaiDibaca
        };
        bukuSendiri.push(bukuBaru);
        saveDataLocal();
        return bukuBaru;
    } else {
        console.error('Data buku tidak lengkap!');
    }
}

function saveDataLocal() {
    const bukuJSON = JSON.stringify(bukuSendiri);
    localStorage.setItem('bukuSendiri', bukuJSON);
}

function hapusBuku(id) {
    const bukuElement = document.querySelector(`[data-id="${id}"]`);
    const judulBuku = bukuElement.querySelector('h3').textContent;

    const konfirHapus = confirm(`Yakin ingin untuk menghapus buku "${judulBuku}"?`);

    if (konfirHapus) {
        bukuElement.remove();
        bukuSendiri = bukuSendiri.filter(buku => buku.id !== id);
        saveDataLocal();
    }
}

function simpanBuku(buku) {
    let rak;
    if (buku && buku.isComplete) {
        rak = document.getElementById('completeBookshelfList');
    } else {
        rak = document.getElementById('incompleteBookshelfList');
    }

    if (buku && buku.title && buku.author && buku.year) {
        const propertiBukuBaru = newBuku(buku);
        propertiBukuBaru.dataset.id = buku.id;
        rak.appendChild(propertiBukuBaru);
    } else {
        console.error('Data buku tidak lengkap!');
    }
}

function newBuku(buku) {
    const bukuElement = document.createElement('article');
    bukuElement.classList.add('book_item');

    bukuElement.innerHTML = `
        <h3>${buku.title}</h3>
        <p>Penulis: ${buku.author}</p>
        <p>Tahun: ${buku.year}</p>
        <div class="action">
            <button class="green" onclick="switchComplete(${buku.id})">${buku.isComplete ? 'Belum selesai di Baca' : 'Selesai dibaca'}</button>
            <button class="red" onclick="hapusBuku(${buku.id})">Hapus buku</button>
        </div>
    `;
    return bukuElement;
}

function switchComplete(id) {
    const rakAsal = document.getElementById('incompleteBookshelfList');
    const rakTujuan = document.getElementById('completeBookshelfList');

    const bukuElement = document.querySelector(`[data-id="${id}"]`);
    const isComplete = bukuElement.dataset.isComplete === 'true';

    bukuElement.dataset.isComplete = isComplete ? 'false' : 'true';

    if (isComplete) {
        rakTujuan.appendChild(bukuElement);
    } else {
        rakAsal.appendChild(bukuElement);
    }

    const tombol = bukuElement.querySelector('button');
    tombol.textContent = isComplete ? 'Belum selesai dibaca' : 'Selesai dibaca';
}

document.getElementById('inputBook').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const bukuBaru = tambahBuku();
    simpanBuku(bukuBaru);

    document.getElementById('inputBook').reset();
});

function cariBuku() {
    const cariJudul = document.getElementById('searchBookTitle').value.toLowerCase();
    const befireRakBuku = document.getElementById('incompleteBookshelfList');
    const rakBukuAfter = document.getElementById('completeBookshelfList');

    befireRakBuku.innerHTML = '';
    rakBukuAfter.innerHTML = '';

    const filterBuku = bukuSendiri.filter(buku => buku.title.toLowerCase().includes(cariJudul));

    filterBuku.forEach(buku => {
        simpanBuku(buku);
    });
}

document.getElementById('searchBook').addEventListener('submit', function(event) {
    event.preventDefault();
    cariBuku();
});

