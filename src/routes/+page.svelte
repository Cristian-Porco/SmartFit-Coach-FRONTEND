<head>
    <style>
        .main-content {
            padding: 0px;
        }
        .section {
            min-height: 80vh;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
        }
        .section * {
            color: white;
            z-index: 1;
        }
        .home h1, .chi-siamo h1 {
            font-size: 3em;
        }
        /* Sezione Home */
        .home {
            position: relative;
            background-image: url('https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Gym_Free-weights_Area.jpg/800px-Gym_Free-weights_Area.jpg');
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            padding: 0 80px;
        }
        .home::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
        }
        /* Sezione Chi Siamo */
        .chi-siamo {
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 0 80px;
            background-image: url('https://as1.ftcdn.net/jpg/05/52/56/54/1000_F_552565417_LbnotjoWiJNT98gAwJJgNeQm4OdjnslC.jpg');
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            margin: 20px 0px;
        }
        .chi-siamo::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
        }
        /* Sezione Contatti */
        .contatti {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        .contatti h2, .contatti p {
            color: #000100;
        }
        .contatti p {
            font-size: 1.2em;
            margin-top: 20px;
        }

        .contenitore {
            
        }
    </style>
</head>

<!-- Sezione Home -->
<section class="section home" id="home">
    <h1>Tieni traccia dei tuoi progressi con il nostro gestionale!</h1>
</section>

<!-- Sezione Chi Siamo -->
<section class="section chi-siamo" id="chi-siamo">
    <h1>Chi siamo</h1>
    <p>Il nostro gestionale di palestra è una piattaforma pensata per aiutarti a monitorare il tuo percorso fitness. Con il nostro strumento, potrai gestire lo storico del tuo peso, monitorare le misure corporee, creare schede alimentari personalizzate e seguire il tuo programma di allenamento.</p>
</section>

<section class="section contatti" id="contatti">
    <h2>Contattaci</h2>
    <p>Telefono: +39 123 456 789</p>
    <p>Email: info@gm-palestra.com</p>
</section>