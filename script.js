document.addEventListener('DOMContentLoaded', function() {
    // --- DOM Element Selection ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mainNav = document.getElementById('main-nav');
    const mobileNav = document.getElementById('mobile-nav');
    
    const glossarySearch = document.getElementById('glossary-search');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const glossaryGrid = document.querySelector('#kamus-kopi .grid');
    
    const glossaryModal = document.getElementById('glossary-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');
    const closeModalBtn = document.getElementById('close-modal');

    const navLinks = document.querySelectorAll('#main-nav .nav-link');
    const sections = document.querySelectorAll('.section');
    
    const contactForm = document.querySelector('.contact-form');

    // --- Data for Glossary ---
    const glossaryData = [
        {
            term: "Acidity",
            category: "proses",
            definition: "Rasa asam yang menyegarkan, sering dihubungkan dengan rasa buah.",
            details: `
                <p><strong>Definisi:</strong> Acidity adalah salah satu dari atribut penilaian utama dalam kopi. Ini merujuk pada rasa asam yang tajam dan menyegarkan, mirip dengan rasa buah-buahan seperti apel, jeruk, atau anggur. Tingkat keasaman yang baik dianggap sebagai ciri kualitas tinggi, terutama pada kopi Arabika.</p>
                <p><strong>Penyebab:</strong> Dipengaruhi oleh jenis biji kopi, ketinggian tempat tumbuh, dan metode pengolahan. Kopi yang ditanam di dataran tinggi cenderung memiliki keasaman yang lebih tinggi.</p>
                <p><strong>Contoh dalam dunia kopi:</strong> "Kopi Ethiopia Yirgacheffe terkenal dengan acidity-nya yang cerah seperti teh dan lemon."</p>
            `
        },
        {
            term: "Arabika",
            category: "biji",
            definition: "Spesies kopi paling populer, dikenal dengan rasa yang kompleks dan asam.",
            details: `
                <p><strong>Definisi:</strong> <em>Coffea arabica</em> adalah spesies biji kopi yang paling banyak dibudidayakan di dunia, menyumbang sekitar 60% dari produksi global. Dikenal karena profil rasanya yang kompleks, aroma yang harum, dan tingkat keasaman yang lebih tinggi dibandingkan spesies lain.</p>
                <p><strong>Karakteristik:</strong> Rasa yang bervariasi dari floral dan buah-buahan hingga manis dan cokelat. Memiliki bentuk biji yang lebih oval dan alur tengah yang berliku-liku.</p>
                <p><strong>Keunggulan:</strong> Dianggap memiliki kualitas rasa tertinggi. Harga jualnya lebih mahal.</p>
                <p><strong>Kekurangan:</strong> Lebih rentan terhadap penyakit seperti karat daun dan membutuhkan kondisi tumbuh yang spesifik (ketinggian tinggi).</p>
            `
        },
        {
            term: "Body",
            category: "proses",
            definition: "Sensasi berat atau tebal dari kopi di mulut.",
            details: `
                <p><strong>Definisi:</strong> Body menggambarkan sensasi fisik atau tekstur kopi di mulut. Ini bukan rasa, melainkan perasaan berat, ringan, kental, atau encer dari minuman tersebut. Analoginya seperti perbedaan sensasi antara susu full cream (full body) dan susu skim (light body).</p>
                <p><strong>Skala Body:</strong> Bisa digambarkan sebagai ringan (light), sedang (medium), atau berat (heavy/full).</p>
                <p><strong>Faktor yang Mempengaruhi:</strong> Metode seduh (French Press menghasilkan body lebih berat daripada V60), tingkat roasting (dark roast cenderung lebih berat), dan jenis biji kopi itu sendiri.</p>
                <p><strong>Contoh dalam dunia kopi:</strong> "Kopi Sumatra Mandheling terkenal dengan body-nya yang tebal dan kental."</p>
            `
        },
        {
            term: "Crema",
            category: "alat",
            definition: "Lapisan busa keemasan di atas shot espresso.",
            details: `
                <p><strong>Definisi:</strong> Crema adalah lapisan emas-cokelat yang terdiri dari minyak, protein, dan gas karbon dioksida yang muncul di atas shot espresso yang baru diseduh. Ini adalah tanda visual dari espresso yang segar dan diekstraksi dengan baik.</p>
                <p><strong>Fungsi:</strong> Membantu menjaga aroma dan suhu espresso. Kehadirannya menunjukkan kualitas gilingan dan kesegaran biji kopi.</p>
                <p><strong>Penilaian Kualitas:</strong> Crema yang baik berwarna karamel merata, tebal (sekitar 1/10 dari volume shot), dan bertahan beberapa menit. Crema yang terlalu pucat bisa berarti kopi terlalu lama diseduh atau bijinya sudah tua.</p>
            `
        },
        {
            term: "Espresso",
            category: "seduh",
            definition: "Metode seduh cepat dengan tekanan tinggi, menghasilkan kopi pekat.",
            details: `
                <p><strong>Definisi:</strong> Espresso adalah metode penyeduhan kopi di mana air panas ditekan dengan tekanan tinggi (sekitar 9 bar) melalui bubuk kopi yang halus. Hasilnya adalah shot kopi yang pekat, kental, dan intens dengan lapisan crema di atas.</p>
                <p><strong>Alat:</strong> Mesin espresso dan grinder.</p>
                <p><strong>Parameter Standar:</strong> Rasio 1:2 (misal, 18g kopi untuk 36g espresso), waktu ekstraksi 25-30 detik.</p>
                <p><strong>Kegunaan:</strong> Bahan dasar untuk berbagai minuman kopi seperti Latte, Cappuccino, dan Americano.</p>
            `
        },
        {
            term: "French Press",
            category: "seduh",
            definition: "Metode seduh dengan perendaman (immersion) menggunakan filter logam.",
            details: `
                <p><strong>Definisi:</strong> French Press adalah metode penyeduhan kopi manual yang termasuk dalam kategori immersion, di mana bubuk kopi direndam langsung dalam air panas selama beberapa menit sebelum dipisahkan menggunakan piston dengan filter logam.</p>
                <p><strong>Alat:</strong> French Press (terdiri dari bejana kaca/logam, piston, dan filter).</p>
                <p><strong>Parameter:</strong> Gilingan kasar (coarse), rasio 1:15, waktu seduh 4 menit.</p>
                <p><strong>Karakter Rasa:</strong> Menghasilkan kopi dengan body yang penuh (full-bodied), tekstur yang tebal, dan rasa yang kaya karena minyak-minyak alami kopi tidak tersaring oleh kertas.</p>
            `
        },
        {
            term: "Latte Art",
            category: "alat",
            definition: "Seni membuat pola di atas minuman kopi berbasis espresso.",
            details: `
                <p><strong>Definisi:</strong> Latte art adalah seni menuangkan susu steamed (busa susu halus) ke dalam shot espresso untuk menciptakan pola atau desain di permukaan minuman, seperti hati, daun (rosetta), atau bahkan desain yang lebih kompleks.</p>
                <p><strong>Syarat Utama:</strong> Espresso yang baik dengan crema stabil, susu yang dikukus dengan sempurna menghasilkan microfoam (busa halus tanpa gelembung besar), dan teknik tuangan (pouring) yang terampil.</p>
                <p><strong>Alat:</strong> Pitcher (gelas tuang susu) dan gelas/cangkir latte.</p>
            `
        },
        {
            term: "Robusta",
            category: "biji",
            definition: "Spesies kopi dengan rasa kuat dan kandungan kafein tinggi.",
            details: `
                <p><strong>Definisi:</strong> <em>Coffea canephora</em>, atau lebih dikenal sebagai Robusta, adalah spesies biji kopi kedua yang paling banyak dibudidayakan. Namanya berasal dari kata "robust" yang berarti kuat, mengacu pada ketahanannya terhadap hama dan penyakit.</p>
                <p><strong>Karakteristik:</strong> Rasa yang kuat, pahit, dan earthy. Memiliki body yang tebal dan crema yang melimpah jika diseduh sebagai espresso. Kandungan kafeinnya hampir dua kali lipat Arabika.</p>
                <p><strong>Keunggulan:</strong> Tahan terhadap penyakit, lebih mudah dibudidayakan di dataran rendah, dan produksinya lebih stabil.</p>
                <p><strong>Kekurangan:</strong> Dianggap memiliki profil rasa yang kurang kompleks dan lebih "kasar" dibandingkan Arabika.</p>
            `
        },
        {
            term: "Single Origin",
            category: "proses",
            definition: "Kopi yang berasal dari satu wilayah spesifik (negara, region, atau petani).",
            details: `
                <p><strong>Definisi:</strong> Single Origin merujuk pada biji kopi yang berasal dari satu lokasi geografis yang spesifik. Ini bisa berarti dari satu negara (misal, "Kopi Indonesia"), satu wilayah di negara tersebut (misal, "Kopi Aceh Gayo"), atau bahkan dari satu perkebunan atau petani tertentu.</p>
                <p><strong>Tujuan:</strong> Untuk menonjolkan karakter rasa unik yang dipengaruhi oleh <em>terroir</em> (lingkungan tumbuh seperti tanah, iklim, dan ketinggian) dari wilayah tersebut.</p>
                <p><strong>Perbedaan dengan Blend:</strong> Berlawanan dengan "Blend" yang mencampur biji dari beberapa asal untuk menciptakan profil rasa yang konsisten dan seimbang.</p>
            `
        },
        {
            term: "V60",
            category: "seduh",
            definition: "Metode seduh tuang (pour-over) dengan kerucut dripper berbentuk spiral 60 derajat.",
            details: `
                <p><strong>Definisi:</strong> V60 adalah metode seduh pour-over yang diciptakan oleh perusahaan Jepang, Hario. Namanya berasal dari bentuk kerucut dripper yang memiliki sudut 60 derajat. Desain spiral di dalam dripper dan lubang besar di bagian bawahnya memungkinkan aliran air yang cepat dan kontrol yang besar atas ekstraksi.</p>
                <p><strong>Alat:</strong> V60 Dripper, filter kertas khusus, ketel gooseneck, dan server.</p>
                <p><strong>Parameter:</strong> Gilingan medium-fine, rasio 1:15, teknik tuangan yang penting untuk hasil yang optimal.</p>
                <p><strong>Karakter Rasa:</strong> Mampu menghasilkan kopi yang sangat "clean" (bersih), dengan keasaman yang cerah dan catatan rasa yang kompleks.</p>
            `
        }
    ];

    // --- Functions ---

    /**
     * Renders the glossary items to the grid.
     * @param {Array} termsToRender - The array of glossary terms to display.
     */
    function renderGlossary(termsToRender) {
        glossaryGrid.innerHTML = ''; // Clear existing content

        if (termsToRender.length === 0) {
            glossaryGrid.innerHTML = '<p class="col-span-full text-center text-gray-500">Istilah tidak ditemukan.</p>';
            return;
        }

        termsToRender.forEach(item => {
            const card = document.createElement('div');
            card.className = 'bg-white rounded-lg p-4 shadow-md hover:shadow-xl transition-all cursor-pointer border-l-4 border-transparent hover:border-[#5D4037]';
            card.innerHTML = `
                <h4 class="font-bold text-lg mb-1">${item.term}</h4>
                <p class="text-sm text-gray-600">${item.definition}</p>
                <span class="inline-block mt-2 text-xs font-semibold text-[#8D6E63] uppercase tracking-wider">${item.category}</span>
            `;
            card.addEventListener('click', () => openModal(item));
            glossaryGrid.appendChild(card);
        });
    }

    /**
     * Opens the modal with detailed information about a term.
     * @param {Object} term - The glossary term object.
     */
    function openModal(term) {
        modalTitle.textContent = term.term;
        modalContent.innerHTML = term.details;
        glossaryModal.classList.remove('hidden');
        glossaryModal.classList.add('flex');
        document.body.style.overflow = 'hidden'; // Prevent background scroll
    }

    /**
     * Closes the glossary detail modal.
     */
    function closeModal() {
        glossaryModal.classList.add('hidden');
        glossaryModal.classList.remove('flex');
        document.body.style.overflow = 'auto'; // Restore background scroll
    }

    /**
     * Filters the glossary based on search term and category.
     */
    function filterGlossary() {
        const searchTerm = glossarySearch.value.toLowerCase();
        const activeCategory = document.querySelector('.filter-btn.active').dataset.filter;

        const filteredData = glossaryData.filter(item => {
            const matchesSearch = item.term.toLowerCase().includes(searchTerm);
            const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
            return matchesSearch && matchesCategory;
        });

        renderGlossary(filteredData);
    }

    /**
     * Sets the active navigation link based on scroll position.
     */
    function setActiveNavLink() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    }

    // --- Event Listeners ---

    // Mobile Menu Toggle
    mobileMenuBtn.addEventListener('click', () => {
        mobileNav.classList.toggle('hidden');
    });

    // Glossary Search
    glossarySearch.addEventListener('input', filterGlossary);

    // Glossary Category Filter Buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active', 'bg-[#5D4037]', 'text-white'));
            // Add active class to clicked button
            btn.classList.add('active', 'bg-[#5D4037]', 'text-white');
            filterGlossary();
        });
    });

    // Modal Close Button
    closeModalBtn.addEventListener('click', closeModal);

    // Close Modal on Background Click
    glossaryModal.addEventListener('click', (e) => {
        if (e.target === glossaryModal) {
            closeModal();
        }
    });

    // Set Active Nav on Scroll
    window.addEventListener('scroll', setActiveNavLink);

    // Contact Form Submission
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Terima kasih! Pesan Anda telah terkirim (ini adalah simulasi).');
            contactForm.reset();
        });
    }

    // --- Initial Load ---
    
    // Set initial active filter button
    document.querySelector('.filter-btn[data-filter="all"]').classList.add('active', 'bg-[#5D4037]', 'text-white');
    
    // Render all glossary terms on page load
    renderGlossary(glossaryData);

    // Set initial active nav link
    setActiveNavLink();
});