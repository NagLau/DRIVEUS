document.addEventListener('DOMContentLoaded', function () {
    // Modal megnyitása képek nagyításához
    function openModal(imgElement) {
        var modal = document.createElement('div');
        modal.classList.add('modal', 'open');
        var modalImg = document.createElement('img');
        modalImg.src = imgElement.src;
        modalImg.style.transform = 'scale(1.5)';
        modal.appendChild(modalImg);
        document.body.appendChild(modal);
        modal.addEventListener('click', function() {
            modal.remove();
        });
    }

    // Szűrő űrlap kezelése
    document.querySelector('.filter-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const carType = document.getElementById('tipus').value;
        const color = document.getElementById('szin').value;
        alert(`Szűrt autók: ${carType} - ${color}`);
    });

    // Autó részletező ablak megnyitása
    window.openCarDetails = function(carName, imgSrc, details) {
        const currentDate = new Date('2025-03-19'); // Fix dátum 2025.03.19.
        const formattedCurrentDate = currentDate.toISOString().split('T')[0]; // YYYY-MM-DD formátum

        const detailsPage = `
            <!DOCTYPE html>
            <html lang="hu">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${carName} - DriveUs</title>
                <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap" rel="stylesheet">
                <style>
                    * {
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                        font-family: 'Roboto', sans-serif;
                    }
                    body {
                        background: linear-gradient(135deg, #0f0f0f, #1a1a1a);
                        color: #fff;
                        height: 100vh;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        overflow: hidden;
                    }
                    header {
                        background: linear-gradient(90deg, #ffd700, #b8860b);
                        width: 100%;
                        padding: 20px;
                        text-align: center;
                        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
                        position: fixed;
                        top: 0;
                        z-index: 10;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    }
                    header h1 {
                        color: #1a1a1a;
                        font-size: 2.5rem;
                        font-weight: 700;
                        text-transform: uppercase;
                        letter-spacing: 2px;
                        text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
                    }
                    #google_translate_element {
                        margin-right: 20px;
                    }
                    .content-wrapper {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: 90%;
                        max-width: 1400px;
                        height: calc(100vh - 100px);
                        margin-top: 80px;
                        margin-bottom: 20px;
                    }
                    .car-image {
                        flex: 1;
                        text-align: center;
                    }
                    .car-image img {
                        max-width: 600px;
                        width: 100%;
                        height: auto;
                        border-radius: 15px;
                        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
                        transition: transform 0.3s ease;
                    }
                    .car-image img:hover {
                        transform: scale(1.03);
                    }
                    .car-info {
                        flex: 1;
                        padding: 0 40px;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        gap: 15px;
                    }
                    .car-info h2 {
                        font-size: 2.8rem;
                        font-weight: 700;
                        color: #ffd700;
                        margin-bottom: 20px;
                        text-transform: uppercase;
                        letter-spacing: 1px;
                    }
                    .car-info ul {
                        list-style: none;
                        padding: 0;
                    }
                    .car-info li {
                        font-size: 1.2rem;
                        font-weight: 300;
                        color: #e0e0e0;
                        margin: 10px 0;
                        position: relative;
                        padding-left: 25px;
                        transition: color 0.3s ease;
                    }
                    .car-info li:before {
                        content: "→";
                        position: absolute;
                        left: 0;
                        color: #ffd700;
                        font-size: 1.4rem;
                        font-weight: 700;
                    }
                    .car-info li:hover {
                        color: #ffd700;
                    }
                    .button-container {
                        display: flex;
                        gap: 20px;
                        margin-top: 30px;
                    }
                    .reserve-btn, .back-btn {
                        background: linear-gradient(90deg, #ffd700, #b8860b);
                        color: #1a1a1a;
                        border: none;
                        padding: 12px 35px;
                        font-size: 1.1rem;
                        font-weight: 700;
                        border-radius: 50px;
                        cursor: pointer;
                        text-transform: uppercase;
                        transition: all 0.3s ease;
                        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.4);
                    }
                    .reserve-btn:hover, .back-btn:hover {
                        background: linear-gradient(90deg, #e6c200, #a67c00);
                        transform: translateY(-3px);
                        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5);
                    }
                    .modal {
                        display: none;
                        position: fixed;
                        z-index: 1000;
                        left: 0;
                        top: 0;
                        width: 100%;
                        height: 100%;
                        background: rgba(0, 0, 0, 0.9);
                        justify-content: center;
                        align-items: center;
                    }
                    .modal.open {
                        display: flex;
                    }
                    .modal img {
                        max-width: 35%;
                        max-height: 35%;
                        border-radius: 10px;
                        object-fit: contain;
                    }
                    .reservation-form {
                        display: none;
                        position: fixed;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        background: #1a1a1a;
                        padding: 30px;
                        border-radius: 15px;
                        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.7);
                        z-index: 1000;
                        width: 90%;
                        max-width: 500px;
                        text-align: center;
                    }
                    .reservation-form.open {
                        display: block;
                    }
                    .reservation-form h3 {
                        color: #ffd700;
                        font-size: 1.8rem;
                        margin-bottom: 20px;
                    }
                    .reservation-form input {
                        width: 100%;
                        padding: 10px;
                        margin: 10px 0;
                        border: 2px solid #ffd700;
                        border-radius: 5px;
                        font-size: 1rem;
                        background: #333;
                        color: #fff;
                    }
                    .reservation-form label {
                        display: block;
                        color: #ffd700;
                        font-size: 1.1rem;
                        font-weight: 400;
                        margin-bottom: 5px;
                    }
                    .reservation-form button {
                        background: linear-gradient(90deg, #ffd700, #b8860b);
                        color: #1a1a1a;
                        border: none;
                        padding: 12px 30px;
                        font-size: 1.1rem;
                        font-weight: 700;
                        border-radius: 30px;
                        cursor: pointer;
                        transition: all 0.3s ease;
                    }
                    .reservation-form button:hover {
                        background: linear-gradient(90deg, #e6c200, #a67c00);
                        transform: translateY(-3px);
                    }
                    footer {
                        background: linear-gradient(90deg, #ffd700, #b8860b);
                        color: #1a1a1a;
                        text-align: center;
                        padding: 10px;
                        width: 100%;
                        position: fixed;
                        bottom: 0;
                        box-shadow: 0 -4px 15px rgba(0, 0, 0, 0.5);
                    }
                    footer p {
                        font-size: 1rem;
                        font-weight: 600;
                    }
                </style>
            </head>
            <body>
                <header>
                    <h1>${carName}</h1>
                    <div id="google_translate_element"></div>
                </header>
                <div class="content-wrapper">
                    <div class="car-image">
                        <img src="${imgSrc}" alt="${carName}" onclick="openModal(this)">
                    </div>
                    <div class="car-info">
                        <h2>${carName}</h2>
                        <ul>
                            ${details.map(detail => `<li>${detail}</li>`).join('')}
                        </ul>
                        <div class="button-container">
                            <button class="reserve-btn" onclick="showReservationForm('${carName}')">Foglalás</button>
                            <button class="back-btn" onclick="window.location.href='autok.html'">Vissza</button>
                        </div>
                    </div>
                </div>
                <div id="reservationForm" class="reservation-form">
                    <h3>Foglalás: ${carName}</h3>
                    <input type="text" id="name" placeholder="Név" required>
                    <input type="email" id="email" placeholder="E-mail" required>
                    <label for="startDate">Foglalás kezdete</label>
                    <input type="date" id="startDate" min="${formattedCurrentDate}" value="${formattedCurrentDate}" required>
                    <label for="endDate">Foglalás vége</label>
                    <input type="date" id="endDate" min="${formattedCurrentDate}" value="${formattedCurrentDate}" required>
                    <button onclick="submitReservation('${carName}')">Foglalás küldése</button>
                </div>
                <footer>
                    <p>© 2025 DriveUs - Luxus autóbérlés</p>
                </footer>
                <script type="text/javascript">
                    function googleTranslateElementInit() {
                        new google.translate.TranslateElement({pageLanguage: 'hu'}, 'google_translate_element');
                    }
                </script>
                <script type="text/javascript" src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>
                <script>
                    function openModal(imgElement) {
                        var modal = document.createElement('div');
                        modal.classList.add('modal', 'open');
                        var modalImg = document.createElement('img');
                        modalImg.src = imgElement.src;
                        modalImg.style.transform = 'scale(1.5)';
                        modal.appendChild(modalImg);
                        document.body.appendChild(modal);
                        modal.addEventListener('click', function() {
                            modal.remove();
                        });
                    }

                    function showReservationForm(carName) {
                        var form = document.getElementById('reservationForm');
                        if (form) {
                            form.classList.add('open');
                            updateEndDateMin();
                        } else {
                            console.error('Reservation form not found');
                        }
                    }

                    function updateEndDateMin() {
                        var startDate = document.getElementById('startDate').value;
                        var endDateInput = document.getElementById('endDate');
                        endDateInput.min = startDate;
                        if (new Date(endDateInput.value) < new Date(startDate)) {
                            endDateInput.value = startDate;
                        }
                    }

                    document.addEventListener('DOMContentLoaded', function() {
                        var startDateInput = document.getElementById('startDate');
                        if (startDateInput) {
                            startDateInput.addEventListener('change', updateEndDateMin);
                        }
                    });

                    function submitReservation(carName) {
                        var name = document.getElementById('name').value;
                        var email = document.getElementById('email').value;
                        var startDate = document.getElementById('startDate').value;
                        var endDate = document.getElementById('endDate').value;
                        var currentDate = new Date('2025-03-19');
                        var selectedStartDate = new Date(startDate);
                        var selectedEndDate = new Date(endDate);

                        if (name && email && startDate && endDate) {
                            if (selectedStartDate < currentDate) {
                                alert('A foglalás kezdete nem lehet korábbi, mint a mai nap (2025.03.19.)!');
                                return;
                            }
                            if (selectedEndDate < selectedStartDate) {
                                alert('A foglalás vége nem lehet korábbi, mint a foglalás kezdete!');
                                return;
                            }
                            var duration = startDate + "/" + endDate;
                            var subject = "Autófoglalás - " + carName;
                            var body = "Tisztelt DriveUs!\\n\\n" +
                                       "Szeretném lefoglalni az alábbi autót:\\n" +
                                       "Név: " + name + "\\n" +
                                       "Autó: " + carName + "\\n" +
                                       "Foglalás időtartama: " + duration + "\\n\\n" +
                                       "Kérem, vegyék fel velem a kapcsolatot a részletek egyeztetéséhez!\\n\\n" +
                                       "Üdvözlettel,\\n" + name;
                            var mailtoLink = "mailto:driveus.car.rent@gmail.com?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body) + "&from=" + encodeURIComponent(email);
                            window.location.href = mailtoLink;
                            document.getElementById('reservationForm').classList.remove('open');
                            document.getElementById('name').value = '';
                            document.getElementById('email').value = '';
                            document.getElementById('startDate').value = '${formattedCurrentDate}';
                            document.getElementById('endDate').value = '${formattedCurrentDate}';
                        } else {
                            alert('Kérjük, töltse ki az összes mezőt!');
                        }
                    }
                </script>
            </body>
            </html>
        `;
        const newWindow = window.open('', '_blank');
        newWindow.document.write(detailsPage);
        newWindow.document.close();
    };
});