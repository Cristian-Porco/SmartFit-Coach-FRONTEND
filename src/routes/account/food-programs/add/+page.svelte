<head>
    <style>
        .icon-sidebar {
            display: flex;
        }
        .sidebar {
            display: none;
        }
        .main-content {
            width: 100%;
            min-width: 100%;
        }
        .container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 20px;
            padding: 10px;
        }
        .container div {
            flex: 1;
            text-align: center;
        }
        .container div:nth-child(1) {
            text-align: left;
        }
        .container div:nth-child(2) {
            text-align: right;
        }
        table {
            width: 100%;
            border-collapse: collapse;
        }
        th, td {
            padding: 8px;
            text-align: center;
            border-top: 1px solid #cfcfcf;
            border-bottom: 1px solid #cfcfcf;
        }
        th {
            border: 1px solid #cfcfcf;
        }
        td:first-child {
            border-left: 1px solid #cfcfcf;
        }

        /* Imposta il bordo destro solo sull'ultima colonna */
        td:last-child {
            border-right: 1px solid #cfcfcf;
        }
        th, .total-name {
            background-color: #e8e8e8;
        }
        #detailsFoodPlanMobile {
            background-color: #e8e8e8;
            display: none;
        }
        .header-title {
            font-size: 18px;
            font-weight: bold;
        }
        .header-limits {
            font-size: 14px;
        }
        .separator {
            border: 1px solid #fff !important;
        }
        .meal-name {
            font-size: 18px;
            font-weight: bold;
            background-color: #f4f4f4;
        }
        .name-column {
            width: 200px;
            text-align: left;
            font-weight: bold;
        }
        .grams-column {
            font-weight: bold;
            font-size: 18px;
        }
        input[type="checkbox"] {
            transform: scale(1.5);
            display: block;
            margin: auto;
        }
        .separator-row {
            height: 20px;
        }
        .responsive-table {
            width: 100%;
            border-collapse: collapse;
        }
        table input {
            padding: 8px;
            margin-bottom: 0;
            border-radius: 0;
            background: #fff;
        }
        #max_kcal, #max_protein, #max_carbs, #max_fats {
            padding: 0px;
        }
        #section_date input {
            display: inline;
            width: auto;
        }
        @media screen and (max-width: 768px) {
            .container  {
                flex-direction: column;
                align-items: center;
            }

            .responsive-table thead {
                display: none; /* Nasconde l'intestazione originale */
            }

            .responsive-table tbody,
            .responsive-table tr,
            .responsive-table td {
                display: block;
                width: 100%;
                border: 0px;
            }

            .responsive-table tr {
                margin-bottom: 10px;
                border: 1px solid #ddd;
            }

            .responsive-table .separator-row {
                display: none;
            }

            .responsive-table td {
                text-align: left;
                position: relative;
                display: flex;
                justify-content: space-between;
            }

            .responsive-table td::before {
                content: attr(data-label);
                font-weight: bold;
                flex: 1;
                padding-right: 10px;
            }
            .name-column {
                display: none !important;
            }
            .grams-column {
                font-size: 30px;
            }
            #detailsFoodPlanMobile {
                display: block;
            }
            #detailsFoodPlanMobile input {
                justify-content: space-between;
                align-items: center;
                width: auto;
            }
        }
    </style>
</head>

<div class="container">
    <div><p><b>Nuova</b></p><h1 class="titlePage">Scheda alimentare</h1></div>
    <div id="section_date">
        <p><b>Data inizio:</b> <input type="date" required></p>
        <p><b>Data fine:</b> <input type="date" required></p>
    </div>
</div>

<div class="form-container">
    <table  class="responsive-table">
        <thead>
            <tr>
                <th rowspan="2" class="header-title name-column">Nome</th>
                <th rowspan="2" class="header-title">Grammi</th>
                <th class="header-title">Kcal</th>
                <th class="header-title">Proteine</th>
                <th class="header-title">Carboidrati</th>
                <th class="header-title">Zuccheri</th>
                <th class="header-title">Grassi</th>
                <th class="header-title">Grassi Saturi</th>
                <th class="header-title">Fibre</th>
            </tr>
            <tr>
                <th class="header-limits" id="max_kcal"><input type="number" placeholder="Max Kcal..." required></th>
                <th class="header-limits" id="max_protein"><input type="number" placeholder="Max Proteine..."required></th>
                <th class="header-limits" id="max_carbs"><input type="number" placeholder="Max Carboidrati..."required></th>
                <th class="header-limits"></th>
                <th class="header-limits" id="max_fats"><input type="number" placeholder="Max Grassi..."required></th>
                <th class="header-limits"></th>
                <th class="header-limits"></th>
            </tr>
        </thead>
        <tbody id="containerFoodPlan">
            <tr id="detailsFoodPlanMobile">
                <td data-label="Max Kcal:"><input type="number" placeholder="Max Kcal..." required></td>
                <td data-label="Max Proteine:"><input type="number" placeholder="Max Proteine..." required></td>
                <td data-label="Max Carboidrati:"><input type="number" placeholder="Max Carboidrati..." required></td>
                <td data-label="Max Grassi:"><input type="number" placeholder="Max Grassi..." required></td>
            </tr>
        </tbody>
    </table>
    <button>Aggiungi pasto</button>
</div>

<button>Aggiungi scheda alimentare</button>