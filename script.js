const animals = [
    { name: "Köpek", image: "images/dog.jpg", sound: "sounds/dog-bark.mp3" },
    { name: "Kedi", image: "images/cat.jpg", sound: "sounds/cat-meow.mp3" },
    { name: "Kuş", image: "images/bird.jpg", sound: "sounds/bird-chirp.mp3" },
    { name: "Lemur", image: "images/lemur.jpg", sound: "sounds/lemur.mp3" },
    { name: "At", image: "images/horse.jpg", sound: "sounds/horse-neigh.mp3" },
    { name: "Komodo Ejderi", image: "images/komodo.jpg", sound: "sounds/komodo.mp3" },
    { name: "Kurt", image: "images/wolf.jpg", sound: "sounds/wolf-howl.mp3" },
    { name: "Sivrisinek", image: "images/mosquito.jpg", sound: "sounds/mosquito-buzz.mp3" }
];

// Hayvanları ekrana yerleştir
const container = document.querySelector('.animal-container');

animals.forEach(animal => {
    // Animal Card'ı oluştur
    const card = document.createElement('div');
    card.classList.add('animal-card');

    // Resim
    const img = document.createElement('img');
    img.src = animal.image;
    img.alt = animal.name;

    // Buton
    const button = document.createElement('button');
    button.classList.add('animal-button');
    button.textContent = 'Sesini Duy';

    // Butona tıklama fonksiyonu ekle
    button.addEventListener('click', () => {
        const audio = new Audio(animal.sound);
        audio.play();
    });

    // Card'ı yerleştir
    card.appendChild(img);
    card.appendChild(button);
    container.appendChild(card);
});

// Navbar geçişleri
const navHayvanlar = document.getElementById('nav-hayvanlar');
const navMahalle = document.getElementById('nav-mahalle');
const hayvanlarSection = document.getElementById('hayvanlar-section');
const mahalleSection = document.getElementById('mahalle-section');

navHayvanlar.addEventListener('click', () => {
    navHayvanlar.classList.add('active');
    navMahalle.classList.remove('active');
    hayvanlarSection.style.display = '';
    mahalleSection.style.display = 'none';
});
navMahalle.addEventListener('click', () => {
    navMahalle.classList.add('active');
    navHayvanlar.classList.remove('active');
    hayvanlarSection.style.display = 'none';
    mahalleSection.style.display = '';
});

// İzmir ilçeleri ve örnek mahalleler
const izmirData = [
    { ilce: 'Konak', mahalleler: ['Alsancak', 'Güzelyalı', 'Karataş'] },
    { ilce: 'Bornova', mahalleler: ['Kazımdirik', 'Erzene', 'Mevlana'] },
    { ilce: 'Karşıyaka', mahalleler: ['Bostanlı', 'Mavişehir', 'Alaybey'] },
    { ilce: 'Buca', mahalleler: ['Şirinyer', 'Yaylacık', 'Adatepe'] },
    { ilce: 'Balçova', mahalleler: ['Teleferik', 'Çetin Emeç', 'Korutürk'] },
    // ... diğer ilçeler ve mahalleler eklenebilir ...
];

// Mahalle uygulaması adım 1: İlçe ve mahalle seçimi
function renderIlceMahalleSecimi() {
    const app = document.getElementById('mahalle-app');
    app.innerHTML = '';

    const ilceLabel = document.createElement('label');
    ilceLabel.textContent = 'İlçe seçiniz:';
    ilceLabel.setAttribute('for', 'ilce-select');
    app.appendChild(ilceLabel);

    const ilceSelect = document.createElement('select');
    ilceSelect.id = 'ilce-select';
    ilceSelect.innerHTML = '<option value="">İlçe seçin</option>' + izmirData.map(i => `<option value="${i.ilce}">${i.ilce}</option>`).join('');
    app.appendChild(ilceSelect);

    const mahalleLabel = document.createElement('label');
    mahalleLabel.textContent = 'Mahalle seçiniz:';
    mahalleLabel.setAttribute('for', 'mahalle-select');
    mahalleLabel.style.display = 'block';
    mahalleLabel.style.marginTop = '18px';
    app.appendChild(mahalleLabel);

    const mahalleSelect = document.createElement('select');
    mahalleSelect.id = 'mahalle-select';
    mahalleSelect.innerHTML = '<option value="">Önce ilçe seçin</option>';
    app.appendChild(mahalleSelect);

    ilceSelect.addEventListener('change', () => {
        const seciliIlce = ilceSelect.value;
        const ilceObj = izmirData.find(i => i.ilce === seciliIlce);
        if (ilceObj) {
            mahalleSelect.innerHTML = '<option value="">Mahalle seçin</option>' + ilceObj.mahalleler.map(m => `<option value="${m}">${m}</option>`).join('');
        } else {
            mahalleSelect.innerHTML = '<option value="">Önce ilçe seçin</option>';
        }
    });

    // Sonraki adıma geç butonu
    const nextBtn = document.createElement('button');
    nextBtn.textContent = 'Sonraki';
    nextBtn.className = 'animal-button';
    nextBtn.style.marginTop = '24px';
    nextBtn.disabled = true;
    app.appendChild(nextBtn);

    function checkValid() {
        nextBtn.disabled = !(ilceSelect.value && mahalleSelect.value);
    }
    ilceSelect.addEventListener('change', checkValid);
    mahalleSelect.addEventListener('change', checkValid);

    nextBtn.addEventListener('click', () => {
        renderSorunSecimi({ ilce: ilceSelect.value, mahalle: mahalleSelect.value });
    });
}

// Mahalle uygulaması ilk açılışta render edilsin
renderIlceMahalleSecimi();

// Sorun seçenekleri
const sorunlar = [
    { id: 'elektrik', label: 'Elektrik Kesintisi' },
    { id: 'cop', label: 'Çöp Toplanmaması' },
    { id: 'yol', label: 'Yol Bozukluğu' },
    { id: 'ulasim', label: 'Otobüs/Toplu Taşıma Arızası' },
    { id: 'su', label: 'Su Kesintisi' },
    { id: 'gürültü', label: 'Gürültü Kirliliği' }
];

const merciler = [
    { id: 'belediye', label: 'Belediye' },
    { id: 'bakanlik', label: 'Bakanlık' }
];

function renderSorunSecimi(secilen) {
    const app = document.getElementById('mahalle-app');
    app.innerHTML = '';
    const title = document.createElement('h2');
    title.textContent = 'Sorun Seçimi';
    app.appendChild(title);

    const sorunBtnContainer = document.createElement('div');
    sorunBtnContainer.style.display = 'flex';
    sorunBtnContainer.style.flexWrap = 'wrap';
    sorunBtnContainer.style.gap = '16px';
    sorunBtnContainer.style.margin = '24px 0';
    sorunlar.forEach(sorun => {
        const btn = document.createElement('button');
        btn.className = 'animal-button';
        btn.textContent = sorun.label;
        btn.onclick = () => renderAciklama({ ...secilen, sorun: sorun.id, sorunLabel: sorun.label });
        sorunBtnContainer.appendChild(btn);
    });
    app.appendChild(sorunBtnContainer);

    const backBtn = document.createElement('button');
    backBtn.textContent = 'Geri';
    backBtn.className = 'animal-button';
    backBtn.style.background = '#e5e7eb';
    backBtn.style.color = '#374151';
    backBtn.onclick = () => renderIlceMahalleSecimi();
    app.appendChild(backBtn);
}

function renderAciklama(secilen) {
    const app = document.getElementById('mahalle-app');
    app.innerHTML = '';
    const title = document.createElement('h2');
    title.textContent = secilen.sorunLabel + ' için Açıklama';
    app.appendChild(title);

    const textarea = document.createElement('textarea');
    textarea.rows = 4;
    textarea.style.width = '100%';
    textarea.style.margin = '18px 0';
    textarea.placeholder = 'Sorununuzu en az 20 karakter ile açıklayın...';
    app.appendChild(textarea);

    const error = document.createElement('div');
    error.style.color = '#dc2626';
    error.style.marginBottom = '10px';
    error.style.display = 'none';
    error.textContent = 'Açıklama en az 20 karakter olmalı!';
    app.appendChild(error);

    const nextBtn = document.createElement('button');
    nextBtn.textContent = 'Sonraki';
    nextBtn.className = 'animal-button';
    nextBtn.disabled = true;
    app.appendChild(nextBtn);

    const backBtn = document.createElement('button');
    backBtn.textContent = 'Geri';
    backBtn.className = 'animal-button';
    backBtn.style.background = '#e5e7eb';
    backBtn.style.color = '#374151';
    backBtn.style.marginLeft = '12px';
    backBtn.onclick = () => renderSorunSecimi(secilen);
    app.appendChild(backBtn);

    textarea.addEventListener('input', () => {
        if (textarea.value.length >= 20) {
            nextBtn.disabled = false;
            error.style.display = 'none';
        } else {
            nextBtn.disabled = true;
            error.style.display = textarea.value.length > 0 ? 'block' : 'none';
        }
    });

    nextBtn.onclick = () => renderMerciSecimi({ ...secilen, aciklama: textarea.value });
}

function renderMerciSecimi(secilen) {
    const app = document.getElementById('mahalle-app');
    app.innerHTML = '';
    const title = document.createElement('h2');
    title.textContent = 'Hangi Mercilere Göndermek İstersiniz?';
    app.appendChild(title);

    const btnContainer = document.createElement('div');
    btnContainer.style.display = 'flex';
    btnContainer.style.gap = '16px';
    btnContainer.style.margin = '24px 0';
    merciler.forEach(merci => {
        const btn = document.createElement('button');
        btn.className = 'animal-button';
        btn.textContent = merci.label;
        btn.onclick = () => renderOnizleme({ ...secilen, merci: merci.id, merciLabel: merci.label });
        btnContainer.appendChild(btn);
    });
    app.appendChild(btnContainer);

    const backBtn = document.createElement('button');
    backBtn.textContent = 'Geri';
    backBtn.className = 'animal-button';
    backBtn.style.background = '#e5e7eb';
    backBtn.style.color = '#374151';
    backBtn.onclick = () => renderAciklama(secilen);
    app.appendChild(backBtn);
}

function renderOnizleme(secilen) {
    const app = document.getElementById('mahalle-app');
    app.innerHTML = '';
    const title = document.createElement('h2');
    title.textContent = 'Sorun Bildirim Önizlemesi';
    app.appendChild(title);

    const id = 'SORUN-' + Math.random().toString(36).substr(2, 8).toUpperCase();
    secilen.id = id;

    const list = document.createElement('ul');
    list.style.listStyle = 'none';
    list.style.padding = '0';
    list.innerHTML = `
        <li><b>İlçe:</b> ${secilen.ilce}</li>
        <li><b>Mahalle:</b> ${secilen.mahalle}</li>
        <li><b>Sorun:</b> ${secilen.sorunLabel}</li>
        <li><b>Açıklama:</b> ${secilen.aciklama}</li>
        <li><b>Merci:</b> ${secilen.merciLabel}</li>
        <li><b>Form ID:</b> ${id}</li>
    `;
    app.appendChild(list);

    const onayBtn = document.createElement('button');
    onayBtn.textContent = 'Onayla ve Gönder';
    onayBtn.className = 'animal-button';
    onayBtn.style.marginTop = '18px';
    onayBtn.onclick = () => renderTesekkur();
    app.appendChild(onayBtn);

    const backBtn = document.createElement('button');
    backBtn.textContent = 'Geri';
    backBtn.className = 'animal-button';
    backBtn.style.background = '#e5e7eb';
    backBtn.style.color = '#374151';
    backBtn.style.marginLeft = '12px';
    backBtn.onclick = () => renderMerciSecimi(secilen);
    app.appendChild(backBtn);
}

// Navbar logosuna tıklayınca ana menüye dön
const navbarLogo = document.getElementById('navbar-logo');
if (navbarLogo) {
    navbarLogo.addEventListener('click', () => {
        document.getElementById('nav-hayvanlar').click();
    });
}

// Ateş animasyonu fonksiyonu
document.addEventListener('click', function fireAnimHandler(e) {
    // Sadece kullanıcı tıklamalarında animasyon göster
    // (form inputları, select, textarea hariç)
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT' || e.target.tagName === 'TEXTAREA') return;
    const fire = document.createElement('img');
    fire.src = 'images/ates.gif';
    fire.className = 'fire-anim';
    fire.style.left = (e.clientX - 30) + 'px';
    fire.style.top = (e.clientY - 80) + 'px';
    document.body.appendChild(fire);
    setTimeout(() => fire.remove(), 900);
});

// Mahalle uygulaması test bitince ekrana 'Testi Yeniden Başlat' butonu ekle
function renderTesekkur() {
    const app = document.getElementById('mahalle-app');
    app.innerHTML = '';
    const msg = document.createElement('h2');
    msg.textContent = 'Teşekkürler! Biraz hayvan seslerini dinleyin :)';
    app.appendChild(msg);
    const btn = document.createElement('button');
    btn.textContent = 'Hayvanlara Dön';
    btn.className = 'animal-button';
    btn.onclick = () => {
        document.getElementById('nav-hayvanlar').click();
    };
    app.appendChild(btn);
    const restartBtn = document.createElement('button');
    restartBtn.textContent = 'Testi Yeniden Başlat';
    restartBtn.className = 'animal-button';
    restartBtn.style.marginLeft = '16px';
    restartBtn.onclick = () => {
        document.getElementById('nav-mahalle').click();
        setTimeout(() => renderIlceMahalleSecimi(), 100);
    };
    app.appendChild(restartBtn);
}
