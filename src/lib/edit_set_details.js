import {getCookie} from "svelte-cookie";

export function IntensityTechniquesTempoBase(setNumbers, groupedSets, divDay, openExercisePopup) {
    setNumbers.forEach(setNumber => {
        const box = document.createElement("div");
        box.classList.add("set-box");
        box.innerHTML = `<h4>Serie ${setNumber}</h4>`;

        let sameExercisesOnSets = groupedSets[setNumber].every(
            set => set.exercise.name === groupedSets[setNumber][0].exercise.name
        );
        let lengthSets = groupedSets[setNumber].length;

        const table = document.createElement("table");

        const thead = document.createElement("thead");
        const headerRow = document.createElement("tr");

        const headers = [
            { style: "text-align: left", content: "Esercizio" },
            { className: "data-value", content: "Minuti Prescritti", title: "Numero di minuti prescritti da eseguire" },
            { className: "data-value", content: "Minuti Effettuati", title: "Numero di minuti realmente eseguiti" },
            { className: "data-value", content: "Recupero", title: "Tempo di recupero tra le serie, in secondi" },
            { className: "action-value" },
        ];

        headers.forEach(h => {
            const th = document.createElement("th");
            if (h.className) th.className = h.className;
            if (h.style) th.setAttribute("style", h.style);
            if (h.title) {
                const span = document.createElement("span");
                span.className = "info-icon";
                span.title = h.title;
                span.textContent = h.content;
                th.appendChild(span);
            } else {
                th.textContent = h.content;
            }
            headerRow.appendChild(th);
        });

        thead.appendChild(headerRow);
        table.appendChild(thead);

        const tbody = document.createElement("tbody");
        table.appendChild(tbody);

        box.append(table);

        groupedSets[setNumber].forEach((set, test) => {
            const row = document.createElement("tr");

            const [ecc, fermo, conc] = set.tempo_fcr.split("-");
            const rest = set.rest_seconds;

            const data = [
                { type: "text", value: set.exercise.name, disabled: false, mobilelabel: "Esercizio:" },
                {  target: "prescribed_reps_1", value: set.prescribed_reps_1, disabled: false, mobilelabel: "Minuti Prescritti:" },
                {  target: "actual_reps_1",value: set.actual_reps_1, disabled: false, mobilelabel: "Minuti Effettuati:"},
                {  target: "rest_seconds",value: rest, disabled: false, mobilelabel: "Recupero:" },
                { type: "action", mobilelabel: "Azioni:" },
            ];

            data.forEach((item, index) => {
                const td = document.createElement("td");

                if (index === 0) {
                    if(test === 0 && sameExercisesOnSets) {
                        const span = document.createElement("span");
                        span.className = "mobile-label";
                        span.textContent = item.mobilelabel;
                        row.appendChild(span);

                        const link_exercise = document.createElement("a");
                        link_exercise.href = "";
                        link_exercise.addEventListener("click", () => openExercisePopup(set.exercise));
                        link_exercise.textContent = item.value;

                        td.rowSpan = lengthSets;
                        td.appendChild(link_exercise);
                        row.appendChild(td);
                    } else if(!sameExercisesOnSets) {
                        const span = document.createElement("span");
                        span.className = "mobile-label";
                        span.textContent = item.mobilelabel;
                        row.appendChild(span);

                        const link_exercise = document.createElement("a");
                        link_exercise.href = "";
                        link_exercise.addEventListener("click", () => openExercisePopup(set.exercise));
                        link_exercise.textContent = item.value;

                        td.appendChild(link_exercise);
                        row.appendChild(td);
                    }
                } else if(
                    item.target === "prescribed_reps_1" ||
                    item.target === "actual_reps_1"
                ) {
                    const span = document.createElement("span");
                    span.className = "mobile-label";
                    span.textContent = item.mobilelabel;

                    const wrapper = document.createElement('div');
                    wrapper.className = 'input-min-wrapper input-with-info-enabled';

                    const input = document.createElement('input');
                    input.type = 'number';
                    input.className = 'set-input';
                    input.value = item.value;
                    input.addEventListener("input", async function () {
                        const response = await fetch(`http://127.0.0.1:8000/api/v1/data/gym-plan-set/update/${set.id}/`, {
                            method: "PATCH",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": "Token " + getCookie('csrftoken'),
                            },
                            body: JSON.stringify({
                                [item.target]: this.value
                            })
                        });
                    });

                    const label = document.createElement('span');
                    label.className = 'min-label';
                    label.textContent = 'min';

                    wrapper.appendChild(input);
                    wrapper.appendChild(label);
                    td.appendChild(span);
                    td.appendChild(wrapper);
                    row.appendChild(td);
                } else if(
                    item.target === "rest_seconds"
                ) {
                    const span = document.createElement("span");
                    span.className = "mobile-label";
                    span.textContent = item.mobilelabel;

                    const wrapper = document.createElement('div');
                    wrapper.className = 'input-sec-wrapper input-with-info-enabled';

                    const input = document.createElement('input');
                    input.type = 'number';
                    input.className = 'set-input';
                    input.value = item.value;
                    input.addEventListener("input", async function () {
                        const response = await fetch(`http://127.0.0.1:8000/api/v1/data/gym-plan-set/update/${set.id}/`, {
                            method: "PATCH",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": "Token " + getCookie('csrftoken'),
                            },
                            body: JSON.stringify({
                                [item.target]: this.value
                            })
                        });
                    });

                    const label = document.createElement('span');
                    label.className = 'sec-label';
                    label.textContent = 'sec';

                    wrapper.appendChild(input);
                    wrapper.appendChild(label);
                    td.appendChild(span);
                    td.appendChild(wrapper);
                    row.appendChild(td);
                } else if(item.type === "action") {
                    const span = document.createElement("span");
                    span.className = "mobile-label";
                    span.textContent = item.mobilelabel;

                    const actionsDiv = document.createElement("div");
                    actionsDiv.classList.add("exercise-actions");
                    actionsDiv.style.marginLeft = 0;

                    const editIcon = document.createElement("span");
                    editIcon.classList.add("material-icons", "edit-details-exercise-button");
                    editIcon.textContent = "edit";
                    editIcon.addEventListener("click", (e) => {
                        alert("Modifica dettaglio esercizio n." + set.id);
                    });

                    const deleteIcon = document.createElement("span");
                    deleteIcon.classList.add("material-icons", "delete-details-exercise-button");
                    deleteIcon.textContent = "delete";
                    deleteIcon.addEventListener("click", (e) => {
                        alert("Elimina dettaglio esercizio n." + set.id);
                    });

                    actionsDiv.appendChild(editIcon);
                    actionsDiv.appendChild(deleteIcon);

                    td.appendChild(span);
                    td.appendChild(actionsDiv);
                    row.appendChild(td);
                }
            });

            tbody.appendChild(row);
            table.appendChild(tbody);
        });

        divDay.appendChild(box);
    });
}

export function IntensityTechniquesUnilateral(setNumbers, groupedSets, divDay, disabledDayBefore, openExercisePopup) {
    setNumbers.forEach(setNumber => {
        const box = document.createElement("div");
        box.classList.add("set-box");
        box.innerHTML = `<h4>Serie ${setNumber}</h4>`;

        let sameExercisesOnSets = groupedSets[setNumber].every(
            set => set.exercise.name === groupedSets[setNumber][0].exercise.name
        );
        let lengthSets = groupedSets[setNumber].length;

        const table = document.createElement("table");

        const thead = document.createElement("thead");
        const headerRow = document.createElement("tr");

        const headers = [
            { className: "order-value", content: "" },
            { style: "text-align: left", content: "Esercizio" },
            { className: "data-value", content: "Ripetizioni Prescritte (arto 1)", title: "Numero di ripetizioni prescritte da eseguire" },
            { className: "data-value", content: "Ripetizioni Effettuate (arto 1)", title: "Numero di ripetizioni realmente eseguite" },
            { className: "data-value", content: "Ripetizioni Prescritte (arto 2)", title: "Numero di ripetizioni prescritte da eseguire" },
            { className: "data-value", content: "Ripetizioni Effettuate (arto 2)", title: "Numero di ripetizioni realmente eseguite" },
            { className: "data-value", content: "RIR", title: "Reps In Reserve: quante ripetizioni avresti ancora potuto fare" },
            { className: "data-value", content: "Peso", title: "Peso utilizzato per la serie" },
            { className: "data-value", content: "Eccentrica", title: "Fase eccentrica: discesa lenta e controllata" },
            { className: "data-value", content: "Fermo", title: "Pausa in posizione intermedia o bassa" },
            { className: "data-value", content: "Concentrica", title: "Fase concentrica: spinta o contrazione muscolare" },
            { className: "data-value", content: "Recupero", title: "Tempo di recupero tra le serie, in secondi" },
            { className: "action-value" },
        ];

        headers.forEach(h => {
            const th = document.createElement("th");
            if (h.className) th.className = h.className;
            if (h.style) th.setAttribute("style", h.style);
            if (h.title) {
                const span = document.createElement("span");
                span.className = "info-icon";
                span.title = h.title;
                span.textContent = h.content;
                th.appendChild(span);
            } else {
                th.textContent = h.content;
            }
            headerRow.appendChild(th);
        });

        thead.appendChild(headerRow);
        table.appendChild(thead);

        const tbody = document.createElement("tbody");
        table.appendChild(tbody);

        box.append(table);

        groupedSets[setNumber].forEach((set, test) => {
            const row = document.createElement("tr");

            let [ecc, fermo, conc] = set.tempo_fcr.split("-");
            const rest = set.rest_seconds;

            const data = [
                { type: "div", target: "order", className: "set-number", value: test+1, mobilelabel: "Ordine:" },
                { type: "text", value: set.exercise.name, disabled: false, mobilelabel: "Esercizio:" },
                {  target: "prescribed_reps_1", value: set.prescribed_reps_1, disabled: false, mobilelabel: "Ripetizioni Prescritte (arto 1):" },
                {  target: "actual_reps_1", value: set.actual_reps_1, disabled: disabledDayBefore, mobilelabel: "Ripetizioni Effettuate (arto 1):"},
                {  target: "prescribed_reps_2", value: set.prescribed_reps_2, disabled: false, mobilelabel: "Ripetizioni Prescritte (arto 2):" },
                {  target: "actual_reps_2", value: set.actual_reps_2, disabled: disabledDayBefore, mobilelabel: "Ripetizioni Effettuate (arto 2):"},
                {  target: "rir", value: set.rir, disabled: false, mobilelabel: "RIR:" },
                {  target: "weight", value: set.weight, disabled: false, mobilelabel: "Peso:" },
                {  target: "ecc", value: ecc, disabled: false, mobilelabel: "Eccentrica:" },
                {  target: "fermo", value: fermo, disabled: false, mobilelabel: "Fermo:" },
                {  target: "conc", value: conc, disabled: false, mobilelabel: "Concentrica:" },
                {  target: "rest_seconds", value: rest, disabled: false, mobilelabel: "Recupero:" },
                { type: "action", mobilelabel: "Azioni:" },
            ];

            data.forEach((item, index) => {
                const td = document.createElement("td");

                if (index === 0) {
                    if(!sameExercisesOnSets) {
                        const div = document.createElement("div");
                        div.className = item.className;
                        div.textContent = item.value;

                        const span = document.createElement("span");
                        span.className = "mobile-label";
                        span.textContent = item.mobilelabel;

                        td.appendChild(span);
                        td.appendChild(div);
                    }
                    row.appendChild(td);
                } else if (index === 1) {
                    if(test === 0 && sameExercisesOnSets) {
                        const span = document.createElement("span");
                        span.className = "mobile-label";
                        span.textContent = item.mobilelabel;
                        row.appendChild(span);

                        const link_exercise = document.createElement("a");
                        link_exercise.href = "";
                        link_exercise.addEventListener("click", () => openExercisePopup(set.exercise));
                        link_exercise.textContent = item.value;

                        td.rowSpan = lengthSets;
                        td.appendChild(link_exercise);
                        row.appendChild(td);
                    } else if(!sameExercisesOnSets) {
                        const span = document.createElement("span");
                        span.className = "mobile-label";
                        span.textContent = item.mobilelabel;
                        row.appendChild(span);

                        const link_exercise = document.createElement("a");
                        link_exercise.href = "";
                        link_exercise.addEventListener("click", () => openExercisePopup(set.exercise));
                        link_exercise.textContent = item.value;

                        td.appendChild(link_exercise);
                        row.appendChild(td);
                    }
                } else if(item.target === "weight") {
                    const span = document.createElement("span");
                    span.className = "mobile-label";
                    span.textContent = item.mobilelabel;

                    const wrapper = document.createElement('div');
                    wrapper.className = 'input-kg-wrapper input-with-info-enabled';

                    const input = document.createElement('input');
                    input.type = 'number';
                    input.className = 'set-input';
                    input.value = item.value;
                    input.addEventListener("input", async function () {
                        const response = await fetch(`http://127.0.0.1:8000/api/v1/data/gym-plan-set/update/${set.id}/`, {
                            method: "PATCH",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": "Token " + getCookie('csrftoken'),
                            },
                            body: JSON.stringify({
                                weight: this.value
                            })
                        });
                    });

                    const label = document.createElement('span');
                    label.className = 'kg-label';
                    label.textContent = 'kg';

                    wrapper.appendChild(input);
                    wrapper.appendChild(label);
                    td.appendChild(span);
                    td.appendChild(wrapper);
                    row.appendChild(td);
                } else if(
                    item.target === "ecc" ||
                    item.target === "fermo" ||
                    item.target === "conc"
                ) {
                    const span = document.createElement("span");
                    span.className = "mobile-label";
                    span.textContent = item.mobilelabel;

                    const wrapper = document.createElement('div');
                    wrapper.className = 'input-sec-wrapper input-with-info-enabled';

                    const input = document.createElement('input');
                    input.type = 'number';
                    input.className = 'set-input';
                    input.value = item.value;
                    input.addEventListener("input", async function () {
                        if(item.target === "ecc") ecc = this.value;
                        else if(item.target === "fermo") fermo = this.value;
                        else if(item.target === "conc") conc = this.value;

                        const response = await fetch(`http://127.0.0.1:8000/api/v1/data/gym-plan-set/update/${set.id}/`, {
                            method: "PATCH",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": "Token " + getCookie('csrftoken'),
                            },
                            body: JSON.stringify({
                                tempo_fcr: ecc + "-" + fermo + "-" + conc
                            })
                        });
                    });

                    const label = document.createElement('span');
                    label.className = 'sec-label';
                    label.textContent = 'sec';

                    wrapper.appendChild(input);
                    wrapper.appendChild(label);
                    td.appendChild(span);
                    td.appendChild(wrapper);
                    row.appendChild(td);
                } else if(
                    item.target === "rest_seconds"
                ) {
                    const span = document.createElement("span");
                    span.className = "mobile-label";
                    span.textContent = item.mobilelabel;

                    const wrapper = document.createElement('div');
                    wrapper.className = 'input-sec-wrapper input-with-info-enabled';

                    const input = document.createElement('input');
                    input.type = 'number';
                    input.className = 'set-input';
                    input.value = item.value;
                    input.addEventListener("input", async function () {
                        const response = await fetch(`http://127.0.0.1:8000/api/v1/data/gym-plan-set/update/${set.id}/`, {
                            method: "PATCH",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": "Token " + getCookie('csrftoken'),
                            },
                            body: JSON.stringify({
                                [item.target]: this.value
                            })
                        });
                    });

                    const label = document.createElement('span');
                    label.className = 'sec-label';
                    label.textContent = 'sec';

                    wrapper.appendChild(input);
                    wrapper.appendChild(label);
                    td.appendChild(span);
                    td.appendChild(wrapper);
                    row.appendChild(td);
                } else if(item.type === "action") {
                    const span = document.createElement("span");
                    span.className = "mobile-label";
                    span.textContent = item.mobilelabel;

                    const actionsDiv = document.createElement("div");
                    actionsDiv.classList.add("exercise-actions");
                    actionsDiv.style.marginLeft = 0;

                    const editIcon = document.createElement("span");
                    editIcon.classList.add("material-icons", "edit-details-exercise-button");
                    editIcon.textContent = "edit";
                    editIcon.addEventListener("click", (e) => {
                        alert("Modifica dettaglio esercizio n." + set.id);
                    });

                    const deleteIcon = document.createElement("span");
                    deleteIcon.classList.add("material-icons", "delete-details-exercise-button");
                    deleteIcon.textContent = "delete";
                    deleteIcon.addEventListener("click", (e) => {
                        alert("Elimina dettaglio esercizio n." + set.id);
                    });

                    actionsDiv.appendChild(editIcon);
                    actionsDiv.appendChild(deleteIcon);

                    td.appendChild(span);
                    td.appendChild(actionsDiv);
                    row.appendChild(td);
                } else {
                    const span = document.createElement("span");
                    span.className = "mobile-label";
                    span.textContent = item.mobilelabel;

                    const wrapper = document.createElement("div");
                    wrapper.className = item.disabled ? "input-with-info" : "input-with-info-enabled";

                    const input = document.createElement("input");
                    input.type = "number";
                    input.className = "set-input";
                    input.value = item.value;
                    input.addEventListener("input", async function () {
                        const response = await fetch(`http://127.0.0.1:8000/api/v1/data/gym-plan-set/update/${set.id}/`, {
                            method: "PATCH",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": "Token " + getCookie('csrftoken'),
                            },
                            body: JSON.stringify({
                                [item.target]: this.value
                            })
                        });
                    });

                    wrapper.appendChild(input);
                    td.appendChild(span);
                    td.appendChild(wrapper);
                    row.appendChild(td);
                }


            });

            tbody.appendChild(row);
            table.appendChild(tbody);
        });

        if(sameExercisesOnSets)
            for (const riga of table.rows)
                if (riga.cells[0])
                    riga.deleteCell(0);

        divDay.appendChild(box);
    });
}

export function IntensityTechniquesRestPause(setNumbers, groupedSets, divDay, dayBeforeToday, full, button, openExercisePopup) {
    setNumbers.forEach(setNumber => {
        const box = document.createElement("div");
        box.classList.add("set-box");
        if(setNumber == 1)
            box.innerHTML = `<h4>Serie d'introduzione</h4>`;
        else if(setNumber >= 2)
            box.innerHTML = `<h4>Serie a cedimento</h4>`;

        let sameExercisesOnSets = groupedSets[setNumber].every(
            set => set.exercise.name === groupedSets[setNumber][0].exercise.name
        );
        let lengthSets = groupedSets[setNumber].length;

        const table = document.createElement("table");

        const thead = document.createElement("thead");
        const headerRow = document.createElement("tr");

        let headers;
        if(setNumber == 1) {
            headers = [
                { className: "order-value", content: "" },
                { style: "text-align: left", content: "Esercizio" },
                { className: "data-value", content: "Ripetizioni Prescritte", title: "Numero di ripetizioni prescritte da eseguire" },
                { className: "data-value", content: "Ripetizioni Effettuate", title: "Numero di ripetizioni realmente eseguite" },
                { className: "data-value", content: "RIR", title: "Reps In Reserve: quante ripetizioni avresti ancora potuto fare" },
                { className: "data-value", content: "Peso", title: "Peso utilizzato per la serie" },
                { className: "data-value", content: "Eccentrica", title: "Fase eccentrica: discesa lenta e controllata" },
                { className: "data-value", content: "Fermo", title: "Pausa in posizione intermedia o bassa" },
                { className: "data-value", content: "Concentrica", title: "Fase concentrica: spinta o contrazione muscolare" },
                { className: "data-value", content: "Recupero", title: "Tempo di recupero tra le serie, in secondi" },
                { className: "action-value" },
            ];
        } else if(setNumber >= 2) {
            headers = [
                { className: "order-value", content: "" },
                { style: "text-align: left", content: "Esercizio" },
                { className: "data-value", content: "Ripetizioni Effettuate", title: "Numero di ripetizioni realmente eseguite" },
                { className: "data-value", content: "RIR", title: "Reps In Reserve: quante ripetizioni avresti ancora potuto fare" },
                { className: "data-value", content: "Peso", title: "Peso utilizzato per la serie" },
                { className: "data-value", content: "Eccentrica", title: "Fase eccentrica: discesa lenta e controllata" },
                { className: "data-value", content: "Fermo", title: "Pausa in posizione intermedia o bassa" },
                { className: "data-value", content: "Concentrica", title: "Fase concentrica: spinta o contrazione muscolare" },
                { className: "data-value", content: "Recupero", title: "Tempo di recupero tra le serie, in secondi" },
                { className: "action-value" },
            ];
        }

        headers.forEach(h => {
            const th = document.createElement("th");
            if (h.className) th.className = h.className;
            if (h.style) th.setAttribute("style", h.style);
            if (h.title) {
                const span = document.createElement("span");
                span.className = "info-icon";
                span.title = h.title;
                span.textContent = h.content;
                th.appendChild(span);
            } else {
                th.textContent = h.content;
            }
            headerRow.appendChild(th);
        });

        thead.appendChild(headerRow);
        table.appendChild(thead);

        const tbody = document.createElement("tbody");
        table.appendChild(tbody);

        box.append(table);

        groupedSets[setNumber].forEach((set, test, array) => {
            const row = document.createElement("tr");

            let [ecc, fermo, conc] = set.tempo_fcr.split("-");
            const rest = set.rest_seconds;

            let data;
            if(setNumber == 1) {
                data = [
                    {
                        type: "div",
                        target: "order",
                        className: "set-number",
                        value: test + 1,
                        mobilelabel: "Ordine:"
                    },
                    {
                        type: "text",
                        value: set.exercise.name,
                        disabled: false,
                        mobilelabel: "Esercizio:"
                    },
                    {
                        type: "input",
                        target: "prescribed_reps_1",
                        value: set.prescribed_reps_1,
                        disabled: false,
                        mobilelabel: "Ripetizioni Prescritte:"
                    },
                    {
                        type: "input",
                        target: "actual_reps_1",
                        value: set.actual_reps_1,
                        disabled: false,
                        mobilelabel: "Ripetizioni Effettuate:",
                    },
                    {  target: "rir", value: set.rir, disabled: false, mobilelabel: "RIR:" },
                    {  target: "weight", value: set.weight, disabled: false, mobilelabel: "Peso:" },
                    {  target: "ecc", value: ecc, disabled: false, mobilelabel: "Eccentrica:" },
                    {  target: "fermo", value: fermo, disabled: false, mobilelabel: "Fermo:" },
                    {  target: "conc", value: conc, disabled: false, mobilelabel: "Concentrica:" },
                    {
                        type: "input",
                        target: "rest_seconds",
                        value: rest,
                        disabled: false,
                        mobilelabel: "Recupero:"
                    },
                    { type: "action", mobilelabel: "Azioni:" }
                ];
            } else if(setNumber >= 2) {
                data = [
                    {
                        type: "div",
                        target: "order",
                        className: "set-number",
                        value: test + 1,
                        mobilelabel: "Ordine:"
                    },
                    {
                        type: "text",
                        value: set.exercise.name,
                        disabled: false,
                        mobilelabel: "Esercizio:"
                    },
                    {
                        type: "input",
                        target: "actual_reps_1",
                        value: set.actual_reps_1,
                        disabled: false,
                        mobilelabel: "Ripetizioni Effettuate:",
                    },
                    {  target: "rir", value: set.rir, disabled: false, mobilelabel: "RIR:" },
                    {  target: "weight", value: set.weight, disabled: false, mobilelabel: "Peso:" },
                    {  target: "ecc", value: ecc, disabled: false, mobilelabel: "Eccentrica:" },
                    {  target: "fermo", value: fermo, disabled: false, mobilelabel: "Fermo:" },
                    {  target: "conc", value: conc, disabled: false, mobilelabel: "Concentrica:" },
                    {
                        type: "input",
                        target: "rest_seconds",
                        value: rest,
                        disabled: false,
                        mobilelabel: "Recupero:"
                    },
                    { type: "action", mobilelabel: "Azioni:" }
                ];
            }

            data.forEach((item, index) => {
                const td = document.createElement("td");

                if (index === 0) {
                    if(!sameExercisesOnSets) {
                        const div = document.createElement("div");
                        div.className = item.className;
                        div.textContent = item.value;

                        const span = document.createElement("span");
                        span.className = "mobile-label";
                        span.textContent = item.mobilelabel;

                        td.appendChild(span);
                        td.appendChild(div);
                    }
                    row.appendChild(td);
                } else if (index === 1) {
                    if(test === 0 && sameExercisesOnSets) {
                        const span = document.createElement("span");
                        span.className = "mobile-label";
                        span.textContent = item.mobilelabel;
                        row.appendChild(span);

                        const link_exercise = document.createElement("a");
                        link_exercise.href = "";
                        link_exercise.addEventListener("click", () => openExercisePopup(set.exercise));
                        link_exercise.textContent = item.value;

                        td.rowSpan = lengthSets;
                        td.appendChild(link_exercise);
                        row.appendChild(td);
                    } else if(!sameExercisesOnSets) {
                        const span = document.createElement("span");
                        span.className = "mobile-label";
                        span.textContent = item.mobilelabel;
                        row.appendChild(span);

                        const link_exercise = document.createElement("a");
                        link_exercise.href = "";
                        link_exercise.addEventListener("click", () => openExercisePopup(set.exercise));
                        link_exercise.textContent = item.value;

                        td.appendChild(link_exercise);
                        row.appendChild(td);
                    }
                } else if(item.target === "weight") {
                    const span = document.createElement("span");
                    span.className = "mobile-label";
                    span.textContent = item.mobilelabel;

                    const wrapper = document.createElement('div');
                    wrapper.className = 'input-kg-wrapper input-with-info-enabled';

                    const input = document.createElement('input');
                    input.type = 'number';
                    input.className = 'set-input';
                    input.value = item.value;
                    input.addEventListener("input", async function () {
                        const response = await fetch(`http://127.0.0.1:8000/api/v1/data/gym-plan-set/update/${set.id}/`, {
                            method: "PATCH",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": "Token " + getCookie('csrftoken'),
                            },
                            body: JSON.stringify({
                                weight: this.value
                            })
                        });
                    });

                    const label = document.createElement('span');
                    label.className = 'kg-label';
                    label.textContent = 'kg';

                    wrapper.appendChild(input);
                    wrapper.appendChild(label);
                    td.appendChild(span);
                    td.appendChild(wrapper);
                    row.appendChild(td);
                } else if(
                    item.target === "ecc" ||
                    item.target === "fermo" ||
                    item.target === "conc"
                ) {
                    const span = document.createElement("span");
                    span.className = "mobile-label";
                    span.textContent = item.mobilelabel;

                    const wrapper = document.createElement('div');
                    wrapper.className = 'input-sec-wrapper input-with-info-enabled';

                    const input = document.createElement('input');
                    input.type = 'number';
                    input.className = 'set-input';
                    input.value = item.value;
                    input.addEventListener("input", async function () {
                        if(item.target === "ecc") ecc = this.value;
                        else if(item.target === "fermo") fermo = this.value;
                        else if(item.target === "conc") conc = this.value;

                        const response = await fetch(`http://127.0.0.1:8000/api/v1/data/gym-plan-set/update/${set.id}/`, {
                            method: "PATCH",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": "Token " + getCookie('csrftoken'),
                            },
                            body: JSON.stringify({
                                tempo_fcr: ecc + "-" + fermo + "-" + conc
                            })
                        });
                    });

                    const label = document.createElement('span');
                    label.className = 'sec-label';
                    label.textContent = 'sec';

                    wrapper.appendChild(input);
                    wrapper.appendChild(label);
                    td.appendChild(span);
                    td.appendChild(wrapper);
                    row.appendChild(td);
                } else if(
                    item.target === "rest_seconds"
                ) {
                    const span = document.createElement("span");
                    span.className = "mobile-label";
                    span.textContent = item.mobilelabel;

                    const wrapper = document.createElement('div');
                    wrapper.className = 'input-sec-wrapper input-with-info-enabled';

                    const input = document.createElement('input');
                    input.type = 'number';
                    input.className = 'set-input';
                    input.value = item.value;
                    input.addEventListener("input", async function () {
                        const response = await fetch(`http://127.0.0.1:8000/api/v1/data/gym-plan-set/update/${set.id}/`, {
                            method: "PATCH",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": "Token " + getCookie('csrftoken'),
                            },
                            body: JSON.stringify({
                                [item.target]: this.value
                            })
                        });
                    });

                    const label = document.createElement('span');
                    label.className = 'sec-label';
                    label.textContent = 'sec';

                    wrapper.appendChild(input);
                    wrapper.appendChild(label);
                    td.appendChild(span);
                    td.appendChild(wrapper);
                    row.appendChild(td);
                } else if(item.type === "action") {
                    const span = document.createElement("span");
                    span.className = "mobile-label";
                    span.textContent = item.mobilelabel;

                    const actionsDiv = document.createElement("div");
                    actionsDiv.classList.add("exercise-actions");
                    actionsDiv.style.marginLeft = 0;

                    const editIcon = document.createElement("span");
                    editIcon.classList.add("material-icons", "edit-details-exercise-button");
                    editIcon.textContent = "edit";
                    editIcon.addEventListener("click", (e) => {
                        alert("Modifica dettaglio esercizio n." + set.id);
                    });

                    const deleteIcon = document.createElement("span");
                    deleteIcon.classList.add("material-icons", "delete-details-exercise-button");
                    deleteIcon.textContent = "delete";
                    deleteIcon.addEventListener("click", (e) => {
                        alert("Elimina dettaglio esercizio n." + set.id);
                    });

                    actionsDiv.appendChild(editIcon);
                    actionsDiv.appendChild(deleteIcon);

                    td.appendChild(span);
                    td.appendChild(actionsDiv);
                    row.appendChild(td);
                } else {
                    const span = document.createElement("span");
                    span.className = "mobile-label";
                    span.textContent = item.mobilelabel;

                    const wrapper = document.createElement("div");
                    wrapper.className = item.disabled ? "input-with-info" : "input-with-info-enabled";

                    const input = document.createElement("input");
                    input.type = "number";
                    input.className = "set-input";
                    input.value = item.value;
                    input.addEventListener("input", async function () {
                        const response = await fetch(`http://127.0.0.1:8000/api/v1/data/gym-plan-set/update/${set.id}/`, {
                            method: "PATCH",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": "Token " + getCookie('csrftoken'),
                            },
                            body: JSON.stringify({
                                [item.target]: this.value
                            })
                        });
                    });

                    wrapper.appendChild(input);
                    td.appendChild(span);
                    td.appendChild(wrapper);
                    row.appendChild(td);
                }


            });

            tbody.appendChild(row);
            table.appendChild(tbody);

            if(setNumber == 2 && test === array.length - 1) {
                button.addEventListener("click", async() => {
                    const response = await fetch(`http://127.0.0.1:8000/api/v1/data/gym-plan-set/create/`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": "Token " + getCookie('csrftoken'),
                        },
                        body: JSON.stringify({
                            order: set.order+1,
                            set_number: set.set_number,
                            prescribed_reps_1: 0,
                            prescribed_reps_2: 0,
                            actual_reps_1: 0,
                            actual_reps_2: 0,
                            rir: set.rir,
                            rest_seconds: set.rest_seconds,
                            weight: set.weight,
                            tempo_fcr: set.tempo_fcr,
                            plan_item: plan_item,
                            exercise_id: set.exercise.id
                        })
                    });

                    localStorage.setItem("scrollToId", gym_plan_item.id);
                    location.reload();
                });
            }
        });

        if(sameExercisesOnSets)
            for (const riga of table.rows)
                if (riga.cells[0])
                    riga.deleteCell(0);

        if(!dayBeforeToday.includes(full)) {
            box.appendChild(button);
        }
        divDay.appendChild(box);
    });
}

export function IntensityTechniquesMyoreps(setNumbers, groupedSets, divDay, dayBeforeToday, full, button, openExercisePopup) {
    let maxReps, minReps;
    setNumbers.forEach(setNumber => {
        const box = document.createElement("div");
        box.classList.add("set-box");
        if(setNumber == 1)
            box.innerHTML = `<h4>Serie d'introduzione</h4>`;
        else if(setNumber >= 2)
            box.innerHTML = `<h4>Serie a cedimento</h4>`;

        let sameExercisesOnSets = groupedSets[setNumber].every(
            set => set.exercise.name === groupedSets[setNumber][0].exercise.name
        );
        let lengthSets = groupedSets[setNumber].length;

        const table = document.createElement("table");

        const thead = document.createElement("thead");
        const headerRow = document.createElement("tr");

        let headers;
        if(setNumber == 1) {
            headers = [
                { className: "order-value", content: "" },
                { style: "text-align: left", content: "Esercizio" },
                { className: "data-value", content: "Ripetizioni Prescritte", title: "Numero di ripetizioni prescritte da eseguire" },
                { className: "data-value", content: "Ripetizioni Effettuate", title: "Numero di ripetizioni realmente eseguite" },
                { className: "data-value", content: "RIR", title: "Reps In Reserve: quante ripetizioni avresti ancora potuto fare" },
                { className: "data-value", content: "Peso", title: "Peso utilizzato per la serie" },
                { className: "data-value", content: "Eccentrica", title: "Fase eccentrica: discesa lenta e controllata" },
                { className: "data-value", content: "Fermo", title: "Pausa in posizione intermedia o bassa" },
                { className: "data-value", content: "Concentrica", title: "Fase concentrica: spinta o contrazione muscolare" },
                { className: "data-value", content: "Recupero", title: "Tempo di recupero tra le serie, in secondi" },
                { className: "action-value" },
            ];
        } else if(setNumber >= 2) {
            headers = [
                { className: "order-value", content: "" },
                { style: "text-align: left", content: "Esercizio" },
                { className: "data-value", content: "Ripetizioni Prescritte massime", title: "Numero di ripetizioni massime prescritte da eseguire" },
                { className: "data-value", content: "Ripetizioni Prescritte minime", title: "Numero di ripetizioni minime prescritte da eseguire" },
                { className: "data-value", content: "Ripetizioni Effettuate", title: "Numero di ripetizioni realmente eseguite" },
                { className: "data-value", content: "RIR", title: "Reps In Reserve: quante ripetizioni avresti ancora potuto fare" },
                { className: "data-value", content: "Peso", title: "Peso utilizzato per la serie" },
                { className: "data-value", content: "Eccentrica", title: "Fase eccentrica: discesa lenta e controllata" },
                { className: "data-value", content: "Fermo", title: "Pausa in posizione intermedia o bassa" },
                { className: "data-value", content: "Concentrica", title: "Fase concentrica: spinta o contrazione muscolare" },
                { className: "data-value", content: "Recupero", title: "Tempo di recupero tra le serie, in secondi" },
                { className: "action-value" },
            ];
        }

        headers.forEach(h => {
            const th = document.createElement("th");
            if (h.className) th.className = h.className;
            if (h.style) th.setAttribute("style", h.style);
            if (h.title) {
                const span = document.createElement("span");
                span.className = "info-icon";
                span.title = h.title;
                span.textContent = h.content;
                th.appendChild(span);
            } else {
                th.textContent = h.content;
            }
            headerRow.appendChild(th);
        });

        thead.appendChild(headerRow);
        table.appendChild(thead);

        const tbody = document.createElement("tbody");
        table.appendChild(tbody);

        box.append(table);

        groupedSets[setNumber].forEach((set, test, array) => {
            const row = document.createElement("tr");

            let [ecc, fermo, conc] = set.tempo_fcr.split("-");
            const rest = set.rest_seconds;

            let data;
            if(setNumber == 1) {
                maxReps = set.prescribed_reps_2;
                minReps = set.actual_reps_2;
                data = [
                    {
                        type: "div",
                        target: "order",
                        className: "set-number",
                        value: test + 1,
                        mobilelabel: "Ordine:"
                    },
                    {
                        type: "text",
                        value: set.exercise.name,
                        disabled: false,
                        mobilelabel: "Esercizio:"
                    },
                    {
                        type: "input",
                        target: "prescribed_reps_1",
                        value: set.prescribed_reps_1,
                        disabled: false,
                        mobilelabel: "Serie Prescritte:"
                    },
                    {
                        type: "input",
                        target: "actual_reps_1",
                        value: set.actual_reps_1,
                        disabled: false,
                        mobilelabel: "Serie Effettuate:",
                    },
                    {  target: "rir", value: set.rir, disabled: false, mobilelabel: "RIR:" },
                    {  target: "weight", value: set.weight, disabled: false, mobilelabel: "Peso:" },
                    {  target: "ecc", value: ecc, disabled: false, mobilelabel: "Eccentrica:" },
                    {  target: "fermo", value: fermo, disabled: false, mobilelabel: "Fermo:" },
                    {  target: "conc", value: conc, disabled: false, mobilelabel: "Concentrica:" },
                    {
                        type: "input",
                        target: "rest_seconds",
                        value: rest,
                        disabled: false,
                        mobilelabel: "Recupero:"
                    },
                    { type: "action", mobilelabel: "Azioni:" },
                ];
            } else if(setNumber >= 2) {
                data = [
                    {
                        type: "div",
                        target: "order",
                        className: "set-number",
                        value: test + 1,
                        mobilelabel: "Ordine:"
                    },
                    {
                        type: "text",
                        value: set.exercise.name,
                        disabled: false,
                        mobilelabel: "Esercizio:"
                    },
                    {
                        type: "input",
                        target: "prescribed_reps_2",
                        value: maxReps,
                        disabled: false,
                        mobilelabel: "Serie Prescritte massime:"
                    },
                    {
                        type: "input",
                        target: "actual_reps_2",
                        value: minReps,
                        disabled: false,
                        mobilelabel: "Serie Prescritte minime:"
                    },
                    {
                        type: "input",
                        target: "actual_reps_1",
                        value: set.actual_reps_1,
                        disabled: false,
                        mobilelabel: "Serie Effettuate:",
                    },
                    {  target: "rir", value: set.rir, disabled: false, mobilelabel: "RIR:" },
                    {  target: "weight", value: set.weight, disabled: false, mobilelabel: "Peso:" },
                    {  target: "ecc", value: ecc, disabled: false, mobilelabel: "Eccentrica:" },
                    {  target: "fermo", value: fermo, disabled: false, mobilelabel: "Fermo:" },
                    {  target: "conc", value: conc, disabled: false, mobilelabel: "Concentrica:" },
                    {
                        type: "input",
                        target: "rest_seconds",
                        value: rest,
                        disabled: false,
                        mobilelabel: "Recupero:"
                    },
                    { type: "action", mobilelabel: "Azioni:" },
                ];
            }

            data.forEach((item, index) => {
                const td = document.createElement("td");

                if (index === 0) {
                    if(!sameExercisesOnSets) {
                        const div = document.createElement("div");
                        div.className = item.className;
                        div.textContent = item.value;

                        const span = document.createElement("span");
                        span.className = "mobile-label";
                        span.textContent = item.mobilelabel;

                        td.appendChild(span);
                        td.appendChild(div);
                    }
                    row.appendChild(td);
                } else if (index === 1) {
                    if(test === 0 && sameExercisesOnSets) {
                        const span = document.createElement("span");
                        span.className = "mobile-label";
                        span.textContent = item.mobilelabel;
                        row.appendChild(span);

                        const link_exercise = document.createElement("a");
                        link_exercise.href = "";
                        link_exercise.addEventListener("click", () => openExercisePopup(set.exercise));
                        link_exercise.textContent = item.value;

                        td.rowSpan = lengthSets;
                        td.appendChild(link_exercise);
                        row.appendChild(td);
                    } else if(!sameExercisesOnSets) {
                        const span = document.createElement("span");
                        span.className = "mobile-label";
                        span.textContent = item.mobilelabel;
                        row.appendChild(span);

                        const link_exercise = document.createElement("a");
                        link_exercise.href = "";
                        link_exercise.addEventListener("click", () => openExercisePopup(set.exercise));
                        link_exercise.textContent = item.value;

                        td.appendChild(link_exercise);
                        row.appendChild(td);
                    }
                } else if(item.target === "weight") {
                    const span = document.createElement("span");
                    span.className = "mobile-label";
                    span.textContent = item.mobilelabel;

                    const wrapper = document.createElement('div');
                    wrapper.className = 'input-kg-wrapper input-with-info-enabled';

                    const input = document.createElement('input');
                    input.type = 'number';
                    input.className = 'set-input';
                    input.value = item.value;
                    input.addEventListener("input", async function () {
                        const response = await fetch(`http://127.0.0.1:8000/api/v1/data/gym-plan-set/update/${set.id}/`, {
                            method: "PATCH",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": "Token " + getCookie('csrftoken'),
                            },
                            body: JSON.stringify({
                                weight: this.value
                            })
                        });
                    });

                    const label = document.createElement('span');
                    label.className = 'kg-label';
                    label.textContent = 'kg';

                    wrapper.appendChild(input);
                    wrapper.appendChild(label);
                    td.appendChild(span);
                    td.appendChild(wrapper);
                    row.appendChild(td);
                } else if(
                    item.target === "ecc" ||
                    item.target === "fermo" ||
                    item.target === "conc"
                ) {
                    const span = document.createElement("span");
                    span.className = "mobile-label";
                    span.textContent = item.mobilelabel;

                    const wrapper = document.createElement('div');
                    wrapper.className = 'input-sec-wrapper input-with-info-enabled';

                    const input = document.createElement('input');
                    input.type = 'number';
                    input.className = 'set-input';
                    input.value = item.value;
                    input.addEventListener("input", async function () {
                        if(item.target === "ecc") ecc = this.value;
                        else if(item.target === "fermo") fermo = this.value;
                        else if(item.target === "conc") conc = this.value;

                        const response = await fetch(`http://127.0.0.1:8000/api/v1/data/gym-plan-set/update/${set.id}/`, {
                            method: "PATCH",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": "Token " + getCookie('csrftoken'),
                            },
                            body: JSON.stringify({
                                tempo_fcr: ecc + "-" + fermo + "-" + conc
                            })
                        });
                    });

                    const label = document.createElement('span');
                    label.className = 'sec-label';
                    label.textContent = 'sec';

                    wrapper.appendChild(input);
                    wrapper.appendChild(label);
                    td.appendChild(span);
                    td.appendChild(wrapper);
                    row.appendChild(td);
                } else if(
                    item.target === "rest_seconds"
                ) {
                    const span = document.createElement("span");
                    span.className = "mobile-label";
                    span.textContent = item.mobilelabel;

                    const wrapper = document.createElement('div');
                    wrapper.className = 'input-sec-wrapper input-with-info-enabled';

                    const input = document.createElement('input');
                    input.type = 'number';
                    input.className = 'set-input';
                    input.value = item.value;
                    input.addEventListener("input", async function () {
                        const response = await fetch(`http://127.0.0.1:8000/api/v1/data/gym-plan-set/update/${set.id}/`, {
                            method: "PATCH",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": "Token " + getCookie('csrftoken'),
                            },
                            body: JSON.stringify({
                                [item.target]: this.value
                            })
                        });
                    });

                    const label = document.createElement('span');
                    label.className = 'sec-label';
                    label.textContent = 'sec';

                    wrapper.appendChild(input);
                    wrapper.appendChild(label);
                    td.appendChild(span);
                    td.appendChild(wrapper);
                    row.appendChild(td);
                } else if(item.type === "action") {
                    const span = document.createElement("span");
                    span.className = "mobile-label";
                    span.textContent = item.mobilelabel;

                    const actionsDiv = document.createElement("div");
                    actionsDiv.classList.add("exercise-actions");
                    actionsDiv.style.marginLeft = 0;

                    const editIcon = document.createElement("span");
                    editIcon.classList.add("material-icons", "edit-details-exercise-button");
                    editIcon.textContent = "edit";
                    editIcon.addEventListener("click", (e) => {
                        alert("Modifica dettaglio esercizio n." + set.id);
                    });

                    const deleteIcon = document.createElement("span");
                    deleteIcon.classList.add("material-icons", "delete-details-exercise-button");
                    deleteIcon.textContent = "delete";
                    deleteIcon.addEventListener("click", (e) => {
                        alert("Elimina dettaglio esercizio n." + set.id);
                    });

                    actionsDiv.appendChild(editIcon);
                    actionsDiv.appendChild(deleteIcon);

                    td.appendChild(span);
                    td.appendChild(actionsDiv);
                    row.appendChild(td);
                } else {
                    const span = document.createElement("span");
                    span.className = "mobile-label";
                    span.textContent = item.mobilelabel;

                    const wrapper = document.createElement("div");
                    wrapper.className = item.disabled ? "input-with-info" : "input-with-info-enabled";

                    const input = document.createElement("input");
                    input.type = "number";
                    input.className = "set-input";
                    input.value = item.value;
                    input.addEventListener("input", async function () {
                        const response = await fetch(`http://127.0.0.1:8000/api/v1/data/gym-plan-set/update/${set.id}/`, {
                            method: "PATCH",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": "Token " + getCookie('csrftoken'),
                            },
                            body: JSON.stringify({
                                [item.target]: this.value
                            })
                        });
                    });

                    wrapper.appendChild(input);
                    td.appendChild(span);
                    td.appendChild(wrapper);
                    row.appendChild(td);
                }

                if(index === 4 && test === array.length - 1 && setNumber == 2) {
                    let cellInput = row.cells[3].querySelector("input");
                    cellInput.addEventListener("input", function () {
                        if(this.value <= minReps) button.style.display = 'none';
                        else button.style.display = 'block';
                    });
                }
            });

            tbody.appendChild(row);
            table.appendChild(tbody);

            if(setNumber == 2 && test === array.length - 1) {
                button.addEventListener("click", async() => {
                    const response = await fetch(`http://127.0.0.1:8000/api/v1/data/gym-plan-set/create/`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": "Token " + getCookie('csrftoken'),
                        },
                        body: JSON.stringify({
                            order: set.order+1,
                            set_number: set.set_number,
                            prescribed_reps_1: 0,
                            prescribed_reps_2: 0,
                            actual_reps_1: 0,
                            actual_reps_2: 0,
                            rir: set.rir,
                            rest_seconds: set.rest_seconds,
                            weight: set.weight,
                            tempo_fcr: set.tempo_fcr,
                            plan_item: plan_item,
                            exercise_id: set.exercise.id
                        })
                    });

                    localStorage.setItem("scrollToId", gym_plan_item.id);
                    location.reload();
                });
            }
        });

        if(sameExercisesOnSets)
            for (const riga of table.rows)
                if (riga.cells[0])
                    riga.deleteCell(0);

        if(!dayBeforeToday.includes(full)) {
            box.appendChild(button);
        }
        divDay.appendChild(box);
    });
}

export function IntensityTechniquesIsometric(setNumbers, groupedSets, divDay, openExercisePopup) {
    setNumbers.forEach(setNumber => {
        const box = document.createElement("div");
        box.classList.add("set-box");
        box.innerHTML = `<h4>Serie ${setNumber}</h4>`;

        let sameExercisesOnSets = groupedSets[setNumber].every(
            set => set.exercise.name === groupedSets[setNumber][0].exercise.name
        );
        let lengthSets = groupedSets[setNumber].length;

        const table = document.createElement("table");

        const thead = document.createElement("thead");
        const headerRow = document.createElement("tr");

        const headers = [
            { className: "order-value", content: "" },
            { style: "text-align: left", content: "Esercizio" },
            { className: "data-value", content: "Secondi Prescritti", title: "Numero di secondi prescritti da eseguire" },
            { className: "data-value", content: "Secondi Effettuati", title: "Numero di secondi realmente eseguiti" },
            { className: "data-value", content: "RIR", title: "Reps In Reserve: quante ripetizioni avresti ancora potuto fare" },
            { className: "data-value", content: "Peso", title: "Peso utilizzato per la serie" },
            { className: "data-value", content: "Eccentrica", title: "Fase eccentrica: discesa lenta e controllata" },
            { className: "data-value", content: "Fermo", title: "Pausa in posizione intermedia o bassa" },
            { className: "data-value", content: "Concentrica", title: "Fase concentrica: spinta o contrazione muscolare" },
            { className: "data-value", content: "Recupero", title: "Tempo di recupero tra le serie, in secondi" },
            { className: "action-value" },
        ];

        headers.forEach(h => {
            const th = document.createElement("th");
            if (h.className) th.className = h.className;
            if (h.style) th.setAttribute("style", h.style);
            if (h.title) {
                const span = document.createElement("span");
                span.className = "info-icon";
                span.title = h.title;
                span.textContent = h.content;
                th.appendChild(span);
            } else {
                th.textContent = h.content;
            }
            headerRow.appendChild(th);
        });

        thead.appendChild(headerRow);
        table.appendChild(thead);

        const tbody = document.createElement("tbody");
        table.appendChild(tbody);

        box.append(table);

        groupedSets[setNumber].forEach((set, test) => {
            const row = document.createElement("tr");

            let [ecc, fermo, conc] = set.tempo_fcr.split("-");
            const rest = set.rest_seconds;

            const data = [
                { type: "div", target: "order", className: "set-number", value: test+1, mobilelabel: "Ordine:" },
                { type: "text", value: set.exercise.name, disabled: false, mobilelabel: "Esercizio:" },
                {  target: "prescribed_reps_1", value: set.prescribed_reps_1, disabled: false, mobilelabel: "Serie Prescritte:" },
                {  target: "actual_reps_1", value: set.actual_reps_1, disabled: false, mobilelabel: "Serie Effettuate:"},
                {  target: "rir", value: set.rir, disabled: false, mobilelabel: "RIR:" },
                {  target: "weight", value: set.weight, disabled: false, mobilelabel: "Peso:" },
                {  target: "ecc", value: ecc, disabled: false, mobilelabel: "Eccentrica:" },
                {  target: "fermo", value: fermo, disabled: false, mobilelabel: "Fermo:" },
                {  target: "conc", value: conc, disabled: false, mobilelabel: "Concentrica:" },
                {  target: "rest_seconds", value: rest, disabled: false, mobilelabel: "Recupero:" },
                { type: "action", mobilelabel: "Azioni:" },
            ];

            data.forEach((item, index) => {
                const td = document.createElement("td");

                if (index === 0) {
                    if(!sameExercisesOnSets) {
                        const div = document.createElement("div");
                        div.className = item.className;
                        div.textContent = item.value;

                        const span = document.createElement("span");
                        span.className = "mobile-label";
                        span.textContent = item.mobilelabel;

                        td.appendChild(span);
                        td.appendChild(div);
                    }
                    row.appendChild(td);
                } else if (index === 1) {
                    if(test === 0 && sameExercisesOnSets) {
                        const span = document.createElement("span");
                        span.className = "mobile-label";
                        span.textContent = item.mobilelabel;
                        row.appendChild(span);

                        const link_exercise = document.createElement("a");
                        link_exercise.href = "";
                        link_exercise.addEventListener("click", () => openExercisePopup(set.exercise));
                        link_exercise.textContent = item.value;

                        td.rowSpan = lengthSets;
                        td.appendChild(link_exercise);
                        row.appendChild(td);
                    } else if(!sameExercisesOnSets) {
                        const span = document.createElement("span");
                        span.className = "mobile-label";
                        span.textContent = item.mobilelabel;
                        row.appendChild(span);

                        const link_exercise = document.createElement("a");
                        link_exercise.href = "";
                        link_exercise.addEventListener("click", () => openExercisePopup(set.exercise));
                        link_exercise.textContent = item.value;

                        td.appendChild(link_exercise);
                        row.appendChild(td);
                    }
                } else if(item.target === "weight") {
                    const span = document.createElement("span");
                    span.className = "mobile-label";
                    span.textContent = item.mobilelabel;

                    const wrapper = document.createElement('div');
                    wrapper.className = 'input-kg-wrapper input-with-info-enabled';

                    const input = document.createElement('input');
                    input.type = 'number';
                    input.className = 'set-input';
                    input.value = item.value;
                    input.addEventListener("input", async function () {
                        const response = await fetch(`http://127.0.0.1:8000/api/v1/data/gym-plan-set/update/${set.id}/`, {
                            method: "PATCH",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": "Token " + getCookie('csrftoken'),
                            },
                            body: JSON.stringify({
                                weight: this.value
                            })
                        });
                    });

                    const label = document.createElement('span');
                    label.className = 'kg-label';
                    label.textContent = 'kg';

                    wrapper.appendChild(input);
                    wrapper.appendChild(label);
                    td.appendChild(span);
                    td.appendChild(wrapper);
                    row.appendChild(td);
                } else if(
                    item.target === "ecc" ||
                    item.target === "fermo" ||
                    item.target === "conc"
                ) {
                    const span = document.createElement("span");
                    span.className = "mobile-label";
                    span.textContent = item.mobilelabel;

                    const wrapper = document.createElement('div');
                    wrapper.className = 'input-sec-wrapper input-with-info-enabled';

                    const input = document.createElement('input');
                    input.type = 'number';
                    input.className = 'set-input';
                    input.value = item.value;
                    input.addEventListener("input", async function () {
                        if(item.target === "ecc") ecc = this.value;
                        else if(item.target === "fermo") fermo = this.value;
                        else if(item.target === "conc") conc = this.value;

                        const response = await fetch(`http://127.0.0.1:8000/api/v1/data/gym-plan-set/update/${set.id}/`, {
                            method: "PATCH",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": "Token " + getCookie('csrftoken'),
                            },
                            body: JSON.stringify({
                                tempo_fcr: ecc + "-" + fermo + "-" + conc
                            })
                        });
                    });

                    const label = document.createElement('span');
                    label.className = 'sec-label';
                    label.textContent = 'sec';

                    wrapper.appendChild(input);
                    wrapper.appendChild(label);
                    td.appendChild(span);
                    td.appendChild(wrapper);
                    row.appendChild(td);
                } else if(
                    item.target === "rest_seconds"
                ) {
                    const span = document.createElement("span");
                    span.className = "mobile-label";
                    span.textContent = item.mobilelabel;

                    const wrapper = document.createElement('div');
                    wrapper.className = 'input-sec-wrapper input-with-info-enabled';

                    const input = document.createElement('input');
                    input.type = 'number';
                    input.className = 'set-input';
                    input.value = item.value;
                    input.addEventListener("input", async function () {
                        const response = await fetch(`http://127.0.0.1:8000/api/v1/data/gym-plan-set/update/${set.id}/`, {
                            method: "PATCH",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": "Token " + getCookie('csrftoken'),
                            },
                            body: JSON.stringify({
                                [item.target]: this.value
                            })
                        });
                    });

                    const label = document.createElement('span');
                    label.className = 'sec-label';
                    label.textContent = 'sec';

                    wrapper.appendChild(input);
                    wrapper.appendChild(label);
                    td.appendChild(span);
                    td.appendChild(wrapper);
                    row.appendChild(td);
                } else if(item.type === "action") {
                    const span = document.createElement("span");
                    span.className = "mobile-label";
                    span.textContent = item.mobilelabel;

                    const actionsDiv = document.createElement("div");
                    actionsDiv.classList.add("exercise-actions");
                    actionsDiv.style.marginLeft = 0;

                    const editIcon = document.createElement("span");
                    editIcon.classList.add("material-icons", "edit-details-exercise-button");
                    editIcon.textContent = "edit";
                    editIcon.addEventListener("click", (e) => {
                        alert("Modifica dettaglio esercizio n." + set.id);
                    });

                    const deleteIcon = document.createElement("span");
                    deleteIcon.classList.add("material-icons", "delete-details-exercise-button");
                    deleteIcon.textContent = "delete";
                    deleteIcon.addEventListener("click", (e) => {
                        alert("Elimina dettaglio esercizio n." + set.id);
                    });

                    actionsDiv.appendChild(editIcon);
                    actionsDiv.appendChild(deleteIcon);

                    td.appendChild(span);
                    td.appendChild(actionsDiv);
                    row.appendChild(td);
                } else {
                    const span = document.createElement("span");
                    span.className = "mobile-label";
                    span.textContent = item.mobilelabel;

                    const wrapper = document.createElement("div");
                    wrapper.className = item.disabled ? "input-with-info" : "input-with-info-enabled";

                    const input = document.createElement("input");
                    input.type = "number";
                    input.className = "set-input";
                    input.value = item.value;
                    input.addEventListener("input", async function () {
                        const response = await fetch(`http://127.0.0.1:8000/api/v1/data/gym-plan-set/update/${set.id}/`, {
                            method: "PATCH",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": "Token " + getCookie('csrftoken'),
                            },
                            body: JSON.stringify({
                                [item.target]: this.value
                            })
                        });
                    });

                    wrapper.appendChild(input);
                    td.appendChild(span);
                    td.appendChild(wrapper);
                    row.appendChild(td);
                }


            });

            tbody.appendChild(row);
            table.appendChild(tbody);
        });

        if(sameExercisesOnSets)
            for (const riga of table.rows)
                if (riga.cells[0])
                    riga.deleteCell(0);

        divDay.appendChild(box);
    });
}

export function IntensityTechniquesEMOM(setNumbers, groupedSets, divDay, openExercisePopup) {
    setNumbers.forEach(setNumber => {
        const box = document.createElement("div");
        box.classList.add("set-box");
        box.innerHTML = `<h4>Serie ${setNumber}</h4>`;

        let sameExercisesOnSets = groupedSets[setNumber].every(
            set => set.exercise.name === groupedSets[setNumber][0].exercise.name
        );
        let lengthSets = groupedSets[setNumber].length;

        const table = document.createElement("table");

        const thead = document.createElement("thead");
        const headerRow = document.createElement("tr");

        const headers = [
            { style: "text-align: left", content: "Esercizio" },
            { className: "order-value", content: "Minuto" },
            { className: "data-value", content: "Ripetizioni Prescritte", title: "Numero di ripetizioni prescritte da eseguire" },
            { className: "data-value", content: "Ripetizioni Effettuate", title: "Numero di ripetizioni realmente eseguite" },
            { className: "data-value", content: "RIR", title: "Reps In Reserve: quante ripetizioni avresti ancora potuto fare" },
            { className: "data-value", content: "Peso", title: "Peso utilizzato per la serie" },
            { className: "data-value", content: "Eccentrica", title: "Fase eccentrica: discesa lenta e controllata" },
            { className: "data-value", content: "Fermo", title: "Pausa in posizione intermedia o bassa" },
            { className: "data-value", content: "Concentrica", title: "Fase concentrica: spinta o contrazione muscolare" },
        ];

        headers.forEach(h => {
            const th = document.createElement("th");
            if (h.className) th.className = h.className;
            if (h.style) th.setAttribute("style", h.style);
            if (h.title) {
                const span = document.createElement("span");
                span.className = "info-icon";
                span.title = h.title;
                span.textContent = h.content;
                th.appendChild(span);
            } else {
                th.textContent = h.content;
            }
            headerRow.appendChild(th);
        });

        thead.appendChild(headerRow);
        table.appendChild(thead);

        const tbody = document.createElement("tbody");
        table.appendChild(tbody);

        box.append(table);

        groupedSets[setNumber].forEach((set, test) => {
            const row = document.createElement("tr");

            let [ecc, fermo, conc] = set.tempo_fcr.split("-");
            const rest = set.rest_seconds;

            const data = [
                { type: "text", value: set.exercise.name, disabled: true, mobilelabel: "Esercizio:" },
                { type: "div", className: "set-number", value: test+1, mobilelabel: "Minuto:" },
                {  target: "prescribed_reps_1", value: set.prescribed_reps_1, disabled: true, mobilelabel: "Serie Prescritte:" },
                {  target: "actual_reps_1", value: set.actual_reps_1, disabled: false, mobilelabel: "Serie Effettuate:"},
                {  target: "rir", value: set.rir, disabled: true, mobilelabel: "RIR:" },
                {  target: "weight", value: set.weight, disabled: true, mobilelabel: "Peso:" },
                {  target: "ecc", value: ecc, disabled: true, mobilelabel: "Eccentrica:" },
                {  target: "fermo", value: fermo, disabled: true, mobilelabel: "Fermo:" },
                {  target: "conc", value: conc, disabled: true, mobilelabel: "Concentrica:" },
            ];

            data.forEach((item, index) => {
                const td = document.createElement("td");

                if (index === 0) {
                    if(test === 0 && sameExercisesOnSets) {
                        const span = document.createElement("span");
                        span.className = "mobile-label";
                        span.textContent = item.mobilelabel;
                        row.appendChild(span);

                        const link_exercise = document.createElement("a");
                        link_exercise.href = "";
                        link_exercise.addEventListener("click", () => openExercisePopup(set.exercise));
                        link_exercise.textContent = item.value;

                        td.rowSpan = lengthSets;
                        td.appendChild(link_exercise);
                        row.appendChild(td);
                    } else if(!sameExercisesOnSets) {
                        const span = document.createElement("span");
                        span.className = "mobile-label";
                        span.textContent = item.mobilelabel;
                        row.appendChild(span);

                        const link_exercise = document.createElement("a");
                        link_exercise.href = "";
                        link_exercise.addEventListener("click", () => openExercisePopup(set.exercise));
                        link_exercise.textContent = item.value;

                        td.appendChild(link_exercise);
                        row.appendChild(td);
                    }
                } else if (index === 1) {
                    const div = document.createElement("div");
                    div.className = item.className;
                    div.textContent = item.value;

                    const span = document.createElement("span");
                    span.className = "mobile-label";
                    span.textContent = item.mobilelabel;

                    td.appendChild(span);
                    td.appendChild(div);
                    row.appendChild(td);
                } else if(item.target === "weight") {
                    const span = document.createElement("span");
                    span.className = "mobile-label";
                    span.textContent = item.mobilelabel;

                    const wrapper = document.createElement('div');
                    wrapper.className = 'input-kg-wrapper input-with-info-enabled';

                    const input = document.createElement('input');
                    input.type = 'number';
                    input.className = 'set-input';
                    input.value = item.value;
                    input.addEventListener("input", async function () {
                        const response = await fetch(`http://127.0.0.1:8000/api/v1/data/gym-plan-set/update/${set.id}/`, {
                            method: "PATCH",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": "Token " + getCookie('csrftoken'),
                            },
                            body: JSON.stringify({
                                weight: this.value
                            })
                        });
                    });

                    const label = document.createElement('span');
                    label.className = 'kg-label';
                    label.textContent = 'kg';

                    wrapper.appendChild(input);
                    wrapper.appendChild(label);
                    td.appendChild(span);
                    td.appendChild(wrapper);
                    row.appendChild(td);
                } else if(
                    item.target === "ecc" ||
                    item.target === "fermo" ||
                    item.target === "conc"
                ) {
                    const span = document.createElement("span");
                    span.className = "mobile-label";
                    span.textContent = item.mobilelabel;

                    const wrapper = document.createElement('div');
                    wrapper.className = 'input-sec-wrapper input-with-info-enabled';

                    const input = document.createElement('input');
                    input.type = 'number';
                    input.className = 'set-input';
                    input.value = item.value;
                    input.addEventListener("input", async function () {
                        if(item.target === "ecc") ecc = this.value;
                        else if(item.target === "fermo") fermo = this.value;
                        else if(item.target === "conc") conc = this.value;

                        const response = await fetch(`http://127.0.0.1:8000/api/v1/data/gym-plan-set/update/${set.id}/`, {
                            method: "PATCH",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": "Token " + getCookie('csrftoken'),
                            },
                            body: JSON.stringify({
                                tempo_fcr: ecc + "-" + fermo + "-" + conc
                            })
                        });
                    });

                    const label = document.createElement('span');
                    label.className = 'sec-label';
                    label.textContent = 'sec';

                    wrapper.appendChild(input);
                    wrapper.appendChild(label);
                    td.appendChild(span);
                    td.appendChild(wrapper);
                    row.appendChild(td);
                } else {
                    const span = document.createElement("span");
                    span.className = "mobile-label";
                    span.textContent = item.mobilelabel;

                    const wrapper = document.createElement("div");
                    wrapper.className = item.disabled ? "input-with-info" : "input-with-info-enabled";

                    const input = document.createElement("input");
                    input.type = "number";
                    input.className = "set-input";
                    input.value = item.value;
                    input.addEventListener("input", async function () {
                        const response = await fetch(`http://127.0.0.1:8000/api/v1/data/gym-plan-set/update/${set.id}/`, {
                            method: "PATCH",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": "Token " + getCookie('csrftoken'),
                            },
                            body: JSON.stringify({
                                [item.target]: this.value
                            })
                        });
                    });

                    wrapper.appendChild(input);
                    td.appendChild(span);
                    td.appendChild(wrapper);
                    row.appendChild(td);
                }


            });

            tbody.appendChild(row);
            table.appendChild(tbody);
        });

        divDay.appendChild(box);
    });
}

export function IntensityTechniquesAMRAP(setNumbers, groupedSets, divDay, openExercisePopup) {
    setNumbers.forEach(setNumber => {
        const box = document.createElement("div");
        box.classList.add("set-box");
        box.innerHTML = `<h4>Circuito</h4>`;

        let sameExercisesOnSets = groupedSets[setNumber].every(
            set => set.exercise.name === groupedSets[setNumber][0].exercise.name
        );
        let firstSet = groupedSets[setNumber][0];
        let rest = firstSet.rest_seconds;
        let skipDurationAndReps = rest === 0 && firstSet.prescribed_reps_1 === 0;
        let lengthSets = groupedSets[setNumber].length;

        const table = document.createElement("table");

        const thead = document.createElement("thead");
        const headerRow = document.createElement("tr");

        const headers = [
            { className: "order-value", content: "" },
            { style: "text-align: left", content: "Esercizio" },
            { className: "data-value", content: "Durata", title: "Durata dell'esercizio in AMRAP" },
            { className: "data-value", content: "Ripetizioni Prescritte", title: "Numero di ripetizioni prescritte da eseguire" },
            { className: "data-value", content: "Ripetizioni Effettuate", title: "Numero di ripetizioni realmente eseguite" },
            { className: "data-value", content: "RIR", title: "Reps In Reserve: quante ripetizioni avresti ancora potuto fare" },
            { className: "data-value", content: "Peso", title: "Peso utilizzato per la serie" },
            { className: "data-value", content: "Eccentrica", title: "Fase eccentrica: discesa lenta e controllata" },
            { className: "data-value", content: "Fermo", title: "Pausa in posizione intermedia o bassa" },
            { className: "data-value", content: "Concentrica", title: "Fase concentrica: spinta o contrazione muscolare" },
            { className: "action-value" },
        ];

        headers.forEach((h, index) => {
            if (skipDurationAndReps && (index === 2 || index === 3)) return; // Salta Durata e Ripetizioni Prescritte

            const th = document.createElement("th");
            if (h.className) th.className = h.className;
            if (h.style) th.setAttribute("style", h.style);
            if (h.title) {
                const span = document.createElement("span");
                span.className = "info-icon";
                span.title = h.title;
                span.textContent = h.content;
                th.appendChild(span);
            } else {
                th.textContent = h.content;
            }
            headerRow.appendChild(th);
        });

        thead.appendChild(headerRow);
        table.appendChild(thead);

        const tbody = document.createElement("tbody");
        table.appendChild(tbody);

        box.append(table);

        groupedSets[setNumber].forEach((set, test) => {
            const row = document.createElement("tr");

            let [ecc, fermo, conc] = set.tempo_fcr.split("-");
            const rest = set.rest_seconds;

            const data = [
                { type: "div", target: "order", className: "set-number", value: test+1, mobilelabel: "Ordine:" },
                { type: "text", value: set.exercise.name, disabled: false, mobilelabel: "Esercizio:" },
                {  target: "rest_seconds", value: rest, disabled: false, mobilelabel: "Durata:" },
                {  target: "prescribed_reps_1", value: set.prescribed_reps_1, disabled: false, mobilelabel: "Ripetizioni Prescritte:" },
                {  target: "actual_reps_1", value: set.actual_reps_1, disabled: false, mobilelabel: "Ripetizioni Effettuate:"},
                {  target: "rir", value: set.rir, disabled: false, mobilelabel: "RIR:" },
                {  target: "weight", value: set.weight, disabled: false, mobilelabel: "Peso:" },
                {  target: "ecc", value: ecc, disabled: false, mobilelabel: "Eccentrica:" },
                {  target: "fermo", value: fermo, disabled: false, mobilelabel: "Fermo:" },
                {  target: "conc", value: conc, disabled: false, mobilelabel: "Concentrica:" },
                { type: "action", mobilelabel: "Azioni:" },
            ];

            data.forEach((item, index) => {
                if (skipDurationAndReps && (index === 2 || index === 3)) return;

                const td = document.createElement("td");

                if (index === 0) {
                    if(!sameExercisesOnSets) {
                        const div = document.createElement("div");
                        div.className = item.className;
                        div.textContent = item.value;

                        const span = document.createElement("span");
                        span.className = "mobile-label";
                        span.textContent = item.mobilelabel;

                        td.appendChild(span);
                        td.appendChild(div);
                    }
                    row.appendChild(td);
                } else if (index === 1) {
                    if(test === 0 && sameExercisesOnSets) {
                        const span = document.createElement("span");
                        span.className = "mobile-label";
                        span.textContent = item.mobilelabel;
                        row.appendChild(span);

                        const link_exercise = document.createElement("a");
                        link_exercise.href = "";
                        link_exercise.addEventListener("click", () => openExercisePopup(set.exercise));
                        link_exercise.textContent = item.value;

                        td.rowSpan = lengthSets;
                        td.appendChild(link_exercise);
                        row.appendChild(td);
                    } else if(!sameExercisesOnSets) {
                        const span = document.createElement("span");
                        span.className = "mobile-label";
                        span.textContent = item.mobilelabel;
                        row.appendChild(span);

                        const link_exercise = document.createElement("a");
                        link_exercise.href = "";
                        link_exercise.addEventListener("click", () => openExercisePopup(set.exercise));
                        link_exercise.textContent = item.value;

                        td.appendChild(link_exercise);
                        row.appendChild(td);
                    }
                } else if (index === 2) {
                    if (test === 0) {
                        const span = document.createElement("span");
                        span.className = "mobile-label";
                        span.textContent = item.mobilelabel;

                        const wrapper = document.createElement('div');
                        wrapper.className = 'input-sec-wrapper input-with-info-enabled';

                        const input = document.createElement('input');
                        input.type = 'number';
                        input.className = 'set-input';
                        input.value = item.value;
                        input.addEventListener("input", async function () {
                            const response = await fetch(`http://127.0.0.1:8000/api/v1/data/gym-plan-set/update/${set.id}/`, {
                                method: "PATCH",
                                headers: {
                                    "Content-Type": "application/json",
                                    "Authorization": "Token " + getCookie('csrftoken'),
                                },
                                body: JSON.stringify({
                                    [item.target]: this.value
                                })
                            });
                        });

                        const label = document.createElement('span');
                        label.className = 'sec-label';
                        label.textContent = 'sec';

                        wrapper.appendChild(input);
                        wrapper.appendChild(label);
                        td.appendChild(span);
                        td.appendChild(wrapper);
                        td.rowSpan = lengthSets;
                        row.appendChild(td);
                    }
                    // Se non è la prima riga, saltiamo la creazione della cella Durata
                } else if(item.target === "weight") {
                    const span = document.createElement("span");
                    span.className = "mobile-label";
                    span.textContent = item.mobilelabel;

                    const wrapper = document.createElement('div');
                    wrapper.className = 'input-kg-wrapper input-with-info-enabled';

                    const input = document.createElement('input');
                    input.type = 'number';
                    input.className = 'set-input';
                    input.value = item.value;
                    input.addEventListener("input", async function () {
                        const response = await fetch(`http://127.0.0.1:8000/api/v1/data/gym-plan-set/update/${set.id}/`, {
                            method: "PATCH",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": "Token " + getCookie('csrftoken'),
                            },
                            body: JSON.stringify({
                                weight: this.value
                            })
                        });
                    });

                    const label = document.createElement('span');
                    label.className = 'kg-label';
                    label.textContent = 'kg';

                    wrapper.appendChild(input);
                    wrapper.appendChild(label);
                    td.appendChild(span);
                    td.appendChild(wrapper);
                    row.appendChild(td);
                } else if(
                    item.target === "ecc" ||
                    item.target === "fermo" ||
                    item.target === "conc"
                ) {
                    const span = document.createElement("span");
                    span.className = "mobile-label";
                    span.textContent = item.mobilelabel;

                    const wrapper = document.createElement('div');
                    wrapper.className = 'input-sec-wrapper input-with-info-enabled';

                    const input = document.createElement('input');
                    input.type = 'number';
                    input.className = 'set-input';
                    input.value = item.value;
                    input.addEventListener("input", async function () {
                        if(item.target === "ecc") ecc = this.value;
                        else if(item.target === "fermo") fermo = this.value;
                        else if(item.target === "conc") conc = this.value;

                        const response = await fetch(`http://127.0.0.1:8000/api/v1/data/gym-plan-set/update/${set.id}/`, {
                            method: "PATCH",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": "Token " + getCookie('csrftoken'),
                            },
                            body: JSON.stringify({
                                tempo_fcr: ecc + "-" + fermo + "-" + conc
                            })
                        });
                    });

                    const label = document.createElement('span');
                    label.className = 'sec-label';
                    label.textContent = 'sec';

                    wrapper.appendChild(input);
                    wrapper.appendChild(label);
                    td.appendChild(span);
                    td.appendChild(wrapper);
                    row.appendChild(td);
                } else if(item.type === "action") {
                    const span = document.createElement("span");
                    span.className = "mobile-label";
                    span.textContent = item.mobilelabel;

                    const actionsDiv = document.createElement("div");
                    actionsDiv.classList.add("exercise-actions");
                    actionsDiv.style.marginLeft = 0;

                    const editIcon = document.createElement("span");
                    editIcon.classList.add("material-icons", "edit-details-exercise-button");
                    editIcon.textContent = "edit";
                    editIcon.addEventListener("click", (e) => {
                        alert("Modifica dettaglio esercizio n." + set.id);
                    });

                    const deleteIcon = document.createElement("span");
                    deleteIcon.classList.add("material-icons", "delete-details-exercise-button");
                    deleteIcon.textContent = "delete";
                    deleteIcon.addEventListener("click", (e) => {
                        alert("Elimina dettaglio esercizio n." + set.id);
                    });

                    actionsDiv.appendChild(editIcon);
                    actionsDiv.appendChild(deleteIcon);

                    td.appendChild(span);
                    td.appendChild(actionsDiv);
                    row.appendChild(td);
                } else {
                    const span = document.createElement("span");
                    span.className = "mobile-label";
                    span.textContent = item.mobilelabel;

                    const wrapper = document.createElement("div");
                    wrapper.className = item.disabled ? "input-with-info" : "input-with-info-enabled";

                    const input = document.createElement("input");
                    input.type = "number";
                    input.className = "set-input";
                    input.value = item.value;
                    input.addEventListener("input", async function () {
                        const response = await fetch(`http://127.0.0.1:8000/api/v1/data/gym-plan-set/update/${set.id}/`, {
                            method: "PATCH",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": "Token " + getCookie('csrftoken'),
                            },
                            body: JSON.stringify({
                                [item.target]: this.value
                            })
                        });
                    });

                    wrapper.appendChild(input);
                    td.appendChild(span);
                    td.appendChild(wrapper);
                    row.appendChild(td);
                }


            });

            tbody.appendChild(row);
            table.appendChild(tbody);
        });

        if(sameExercisesOnSets)
            for (const riga of table.rows)
                if (riga.cells[0])
                    riga.deleteCell(0);

        divDay.appendChild(box);
    });
}

export function IntensityTechniquesDeathSet(setNumbers, groupedSets, divDay, openExercisePopup) {
    setNumbers.forEach(setNumber => {
        let showRecoveryColumn = false;
        if(setNumber == 3) showRecoveryColumn = true;

        let isSecondSet = !(setNumber == 5);

        const box = document.createElement("div");
        box.classList.add("set-box");
        const titles = {
            1: "Serie iniziale",
            2: "1° Drop Set",
            3: "2° Drop Set + Rest Pause",
            4: "Parziali",
            5: "Isometria",
        };

        const title = titles[setNumber] || `Serie ${setNumber}`;
        box.innerHTML = `<h4>${title}</h4>`;

        let sameExercisesOnSets = groupedSets[setNumber].every(
            set => set.exercise.name === groupedSets[setNumber][0].exercise.name
        );
        let lengthSets = groupedSets[setNumber].length;

        const table = document.createElement("table");

        const thead = document.createElement("thead");
        const headerRow = document.createElement("tr");

        const headers = [
            { className: "order-value", content: "" },
            { style: "text-align: left", content: "Esercizio" },
            ...(isSecondSet ? [
                { className: "data-value", content: "Ripetizioni Prescritte", title: "Numero di ripetizioni prescritte da eseguire" },
                { className: "data-value", content: "Ripetizioni Effettuate", title: "Numero di ripetizioni realmente eseguite" }
            ]: [
                { className: "data-value", content: "Secondi Prescritti", title: "Numero di secondi prescritti da eseguire" },
                { className: "data-value", content: "Secondi Effettuati", title: "Numero di secondi realmente eseguiti" },
            ]),
            { className: "data-value", content: "RIR", title: "Reps In Reserve: quante ripetizioni avresti ancora potuto fare" },
            { className: "data-value", content: "Peso", title: "Peso utilizzato per la serie" },
            { className: "data-value", content: "Eccentrica", title: "Fase eccentrica: discesa lenta e controllata" },
            { className: "data-value", content: "Fermo", title: "Pausa in posizione intermedia o bassa" },
            { className: "data-value", content: "Concentrica", title: "Fase concentrica: spinta o contrazione muscolare" },
            ...(showRecoveryColumn ? [{ className: "data-value", content: "Recupero", title: "Tempo di recupero tra le serie, in secondi" }] : []),
        ];

        headers.forEach(h => {
            const th = document.createElement("th");
            if (h.className) th.className = h.className;
            if (h.style) th.setAttribute("style", h.style);
            if (h.title) {
                const span = document.createElement("span");
                span.className = "info-icon";
                span.title = h.title;
                span.textContent = h.content;
                th.appendChild(span);
            } else {
                th.textContent = h.content;
            }
            headerRow.appendChild(th);
        });

        thead.appendChild(headerRow);
        table.appendChild(thead);

        const tbody = document.createElement("tbody");
        table.appendChild(tbody);

        box.append(table);

        groupedSets[setNumber].forEach((set, test) => {
            const row = document.createElement("tr");

            let [ecc, fermo, conc] = set.tempo_fcr.split("-");
            const rest = set.rest_seconds;

            const data = [
                { type: "div", target: "order", className: "set-number", value: test+1, mobilelabel: "Ordine:" },
                { type: "text", value: set.exercise.name, disabled: false, mobilelabel: "Esercizio:" },
                ...(isSecondSet ? [
                    {  target: "prescribed_reps_1", value: set.prescribed_reps_1, disabled: false, mobilelabel: "Ripetizioni Prescritte:" },
                    {  target: "actual_reps_1", value: set.actual_reps_1, disabled: false, mobilelabel: "Ripetizioni Effettuate:"},
                ] : [
                    {  target: "prescribed_reps_1", value: set.prescribed_reps_1, disabled: false, mobilelabel: "Secondi Prescritti:" },
                    {  target: "actual_reps_1", value: set.actual_reps_1, disabled: false, mobilelabel: "Secondi Effettuati:"},
                ]),
                {  target: "rir", value: set.rir, disabled: false, mobilelabel: "RIR:" },
                {  target: "weight", value: set.weight, disabled: false, mobilelabel: "Peso:" },
                {  target: "ecc", value: ecc, disabled: false, mobilelabel: "Eccentrica:" },
                {  target: "fermo", value: fermo, disabled: false, mobilelabel: "Fermo:" },
                {  target: "conc", value: conc, disabled: false, mobilelabel: "Concentrica:" },
                ...(showRecoveryColumn ? [{  target: "rest_seconds", value: rest, disabled: false, mobilelabel: "Recupero:" }] : []),
            ];

            data.forEach((item, index) => {
                const td = document.createElement("td");

                if (index === 0) {
                    if(!sameExercisesOnSets) {
                        const div = document.createElement("div");
                        div.className = item.className;
                        div.textContent = item.value;

                        const span = document.createElement("span");
                        span.className = "mobile-label";
                        span.textContent = item.mobilelabel;

                        td.appendChild(span);
                        td.appendChild(div);
                    }
                    row.appendChild(td);
                } else if (index === 1) {
                    if(test === 0 && sameExercisesOnSets) {
                        const span = document.createElement("span");
                        span.className = "mobile-label";
                        span.textContent = item.mobilelabel;
                        row.appendChild(span);

                        const link_exercise = document.createElement("a");
                        link_exercise.href = "";
                        link_exercise.addEventListener("click", () => openExercisePopup(set.exercise));
                        link_exercise.textContent = item.value;

                        td.rowSpan = lengthSets;
                        td.appendChild(link_exercise);
                        row.appendChild(td);
                    } else if(!sameExercisesOnSets) {
                        const span = document.createElement("span");
                        span.className = "mobile-label";
                        span.textContent = item.mobilelabel;
                        row.appendChild(span);

                        const link_exercise = document.createElement("a");
                        link_exercise.href = "";
                        link_exercise.addEventListener("click", () => openExercisePopup(set.exercise));
                        link_exercise.textContent = item.value;

                        td.appendChild(link_exercise);
                        row.appendChild(td);
                    }
                }  else if(
                    !isSecondSet && (
                        item.target === "prescribed_reps_1" ||
                        item.target === "actual_reps_1"
                    )
                ) {
                    const span = document.createElement("span");
                    span.className = "mobile-label";
                    span.textContent = item.mobilelabel;

                    const wrapper = document.createElement('div');
                    wrapper.className = 'input-sec-wrapper input-with-info-enabled';

                    const input = document.createElement('input');
                    input.type = 'number';
                    input.className = 'set-input';
                    input.value = item.value;
                    input.addEventListener("input", async function () {
                        const response = await fetch(`http://127.0.0.1:8000/api/v1/data/gym-plan-set/update/${set.id}/`, {
                            method: "PATCH",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": "Token " + getCookie('csrftoken'),
                            },
                            body: JSON.stringify({
                                weight: this.value
                            })
                        });
                    });

                    const label = document.createElement('span');
                    label.className = 'sec-label';
                    label.textContent = 'sec';

                    wrapper.appendChild(input);
                    wrapper.appendChild(label);
                    td.appendChild(span);
                    td.appendChild(wrapper);
                    row.appendChild(td);
                } else if(item.target === "weight") {
                    const span = document.createElement("span");
                    span.className = "mobile-label";
                    span.textContent = item.mobilelabel;

                    const wrapper = document.createElement('div');
                    wrapper.className = 'input-kg-wrapper input-with-info-enabled';

                    const input = document.createElement('input');
                    input.type = 'number';
                    input.className = 'set-input';
                    input.value = item.value;
                    input.addEventListener("input", async function () {
                        const response = await fetch(`http://127.0.0.1:8000/api/v1/data/gym-plan-set/update/${set.id}/`, {
                            method: "PATCH",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": "Token " + getCookie('csrftoken'),
                            },
                            body: JSON.stringify({
                                weight: this.value
                            })
                        });
                    });

                    const label = document.createElement('span');
                    label.className = 'kg-label';
                    label.textContent = 'kg';

                    wrapper.appendChild(input);
                    wrapper.appendChild(label);
                    td.appendChild(span);
                    td.appendChild(wrapper);
                    row.appendChild(td);
                } else if(
                    item.target === "ecc" ||
                    item.target === "fermo" ||
                    item.target === "conc"
                ) {
                    const span = document.createElement("span");
                    span.className = "mobile-label";
                    span.textContent = item.mobilelabel;

                    const wrapper = document.createElement('div');
                    wrapper.className = 'input-sec-wrapper input-with-info-enabled';

                    const input = document.createElement('input');
                    input.type = 'number';
                    input.className = 'set-input';
                    input.value = item.value;
                    input.addEventListener("input", async function () {
                        if(item.target === "ecc") ecc = this.value;
                        else if(item.target === "fermo") fermo = this.value;
                        else if(item.target === "conc") conc = this.value;

                        const response = await fetch(`http://127.0.0.1:8000/api/v1/data/gym-plan-set/update/${set.id}/`, {
                            method: "PATCH",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": "Token " + getCookie('csrftoken'),
                            },
                            body: JSON.stringify({
                                tempo_fcr: ecc + "-" + fermo + "-" + conc
                            })
                        });
                    });

                    const label = document.createElement('span');
                    label.className = 'sec-label';
                    label.textContent = 'sec';

                    wrapper.appendChild(input);
                    wrapper.appendChild(label);
                    td.appendChild(span);
                    td.appendChild(wrapper);
                    row.appendChild(td);
                } else {
                    const span = document.createElement("span");
                    span.className = "mobile-label";
                    span.textContent = item.mobilelabel;

                    const wrapper = document.createElement("div");
                    wrapper.className = item.disabled ? "input-with-info" : "input-with-info-enabled";

                    const input = document.createElement("input");
                    input.type = "number";
                    input.className = "set-input";
                    input.value = item.value;
                    input.addEventListener("input", async function () {
                        const response = await fetch(`http://127.0.0.1:8000/api/v1/data/gym-plan-set/update/${set.id}/`, {
                            method: "PATCH",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": "Token " + getCookie('csrftoken'),
                            },
                            body: JSON.stringify({
                                actual_reps_1: this.value
                            })
                        });
                    });

                    wrapper.appendChild(input);
                    td.appendChild(span);
                    td.appendChild(wrapper);
                    row.appendChild(td);
                }
            });

            tbody.appendChild(row);
            table.appendChild(tbody);
        });

        if(sameExercisesOnSets)
            for (const riga of table.rows)
                if (riga.cells[0])
                    riga.deleteCell(0);

        divDay.appendChild(box);
    });
}

export function IntensityTechniquesDefault(setNumbers, groupedSets, divDay, openExercisePopup) {
    setNumbers.forEach(setNumber => {
        const box = document.createElement("div");
        box.classList.add("set-box");
        box.innerHTML = `<h4>Serie ${setNumber}</h4>`;

        let sameExercisesOnSets = groupedSets[setNumber].every(
            set => set.exercise.name === groupedSets[setNumber][0].exercise.name
        );
        let lengthSets = groupedSets[setNumber].length;

        const table = document.createElement("table");

        const thead = document.createElement("thead");
        const headerRow = document.createElement("tr");

        const headers = [
            { className: "order-value", content: "" },
            { style: "text-align: left", content: "Esercizio" },
            { className: "data-value", content: "Ripetizioni Prescritte", title: "Numero di ripetizioni prescritte da eseguire" },
            { className: "data-value", content: "Ripetizioni Effettuate", title: "Numero di ripetizioni realmente eseguite" },
            { className: "data-value", content: "RIR", title: "Reps In Reserve: quante ripetizioni avresti ancora potuto fare" },
            { className: "data-value", content: "Peso", title: "Peso utilizzato per la serie" },
            { className: "data-value", content: "Eccentrica", title: "Fase eccentrica: discesa lenta e controllata" },
            { className: "data-value", content: "Fermo", title: "Pausa in posizione intermedia o bassa" },
            { className: "data-value", content: "Concentrica", title: "Fase concentrica: spinta o contrazione muscolare" },
            { className: "data-value", content: "Recupero", title: "Tempo di recupero tra le serie, in secondi" },
            { className: "action-value" },
        ];

        headers.forEach(h => {
            const th = document.createElement("th");
            if (h.className) th.className = h.className;
            if (h.style) th.setAttribute("style", h.style);
            if (h.title) {
                const span = document.createElement("span");
                span.className = "info-icon";
                span.title = h.title;
                span.textContent = h.content;
                th.appendChild(span);
            } else {
                th.textContent = h.content;
            }
            headerRow.appendChild(th);
        });

        thead.appendChild(headerRow);
        table.appendChild(thead);

        const tbody = document.createElement("tbody");
        table.appendChild(tbody);

        box.append(table);

        groupedSets[setNumber].forEach((set, test) => {
            const row = document.createElement("tr");

            let [ecc, fermo, conc] = set.tempo_fcr.split("-");
            const rest = set.rest_seconds;

            const data = [
                { type: "div", target: "order", className: "set-number", value: test+1, mobilelabel: "Ordine:" },
                { type: "text", value: set.exercise.name, disabled: false, mobilelabel: "Esercizio:" },
                { type: "number", target: "prescribed_reps_1", value: set.prescribed_reps_1, disabled: false, mobilelabel: "Serie Prescritte:" },
                { type: "number", target: "actual_reps_1", value: set.actual_reps_1, disabled: false, mobilelabel: "Serie Effettuate:"},
                { type: "number", target: "rir", value: set.rir, disabled: false, mobilelabel: "RIR:" },
                { type: "number", target: "weight", value: set.weight, disabled: false, mobilelabel: "Peso:" },
                { type: "number", target: "ecc", value: ecc, disabled: false, mobilelabel: "Eccentrica:" },
                { type: "number", target: "fermo", value: fermo, disabled: false, mobilelabel: "Fermo:" },
                { type: "number", target: "conc", value: conc, disabled: false, mobilelabel: "Concentrica:" },
                { type: "number", target: "rest_seconds", value: rest, disabled: false, mobilelabel: "Recupero:" },
                { type: "action", mobilelabel: "Azioni:" }
            ];

            data.forEach((item, index) => {
                const td = document.createElement("td");

                if (index === 0) {
                    if(!sameExercisesOnSets) {
                        const div = document.createElement("div");
                        div.className = item.className;
                        div.textContent = item.value;

                        const span = document.createElement("span");
                        span.className = "mobile-label";
                        span.textContent = item.mobilelabel;

                        td.appendChild(span);
                        td.appendChild(div);
                    }
                    row.appendChild(td);
                } else if (index === 1) {
                    if(test === 0 && sameExercisesOnSets) {
                        const span = document.createElement("span");
                        span.className = "mobile-label";
                        span.textContent = item.mobilelabel;
                        row.appendChild(span);

                        const link_exercise = document.createElement("a");
                        link_exercise.href = "";
                        link_exercise.addEventListener("click", () => openExercisePopup(set.exercise));
                        link_exercise.textContent = item.value;

                        td.rowSpan = lengthSets;
                        td.appendChild(link_exercise);
                        row.appendChild(td);
                    } else if(!sameExercisesOnSets) {
                        const span = document.createElement("span");
                        span.className = "mobile-label";
                        span.textContent = item.mobilelabel;
                        row.appendChild(span);

                        const link_exercise = document.createElement("a");
                        link_exercise.href = "";
                        link_exercise.addEventListener("click", () => openExercisePopup(set.exercise));
                        link_exercise.textContent = item.value;

                        td.appendChild(link_exercise);
                        row.appendChild(td);
                    }
                } else if(item.target === "weight") {
                    const span = document.createElement("span");
                    span.className = "mobile-label";
                    span.textContent = item.mobilelabel;

                    const wrapper = document.createElement('div');
                    wrapper.className = 'input-kg-wrapper input-with-info-enabled';

                    const input = document.createElement('input');
                    input.type = 'number';
                    input.className = 'set-input';
                    input.value = item.value;
                    input.addEventListener("input", async function () {
                        const response = await fetch(`http://127.0.0.1:8000/api/v1/data/gym-plan-set/update/${set.id}/`, {
                            method: "PATCH",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": "Token " + getCookie('csrftoken'),
                            },
                            body: JSON.stringify({
                                weight: this.value
                            })
                        });
                    });

                    const label = document.createElement('span');
                    label.className = 'kg-label';
                    label.textContent = 'kg';

                    wrapper.appendChild(input);
                    wrapper.appendChild(label);
                    td.appendChild(span);
                    td.appendChild(wrapper);
                    row.appendChild(td);
                } else if(
                    item.target === "ecc" ||
                    item.target === "fermo" ||
                    item.target === "conc"
                ) {
                    const span = document.createElement("span");
                    span.className = "mobile-label";
                    span.textContent = item.mobilelabel;

                    const wrapper = document.createElement('div');
                    wrapper.className = 'input-sec-wrapper input-with-info-enabled';

                    const input = document.createElement('input');
                    input.type = 'number';
                    input.className = 'set-input';
                    input.value = item.value;
                    input.addEventListener("input", async function () {
                        if(item.target === "ecc") ecc = this.value;
                        else if(item.target === "fermo") fermo = this.value;
                        else if(item.target === "conc") conc = this.value;

                        const response = await fetch(`http://127.0.0.1:8000/api/v1/data/gym-plan-set/update/${set.id}/`, {
                            method: "PATCH",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": "Token " + getCookie('csrftoken'),
                            },
                            body: JSON.stringify({
                                tempo_fcr: ecc + "-" + fermo + "-" + conc
                            })
                        });
                    });

                    const label = document.createElement('span');
                    label.className = 'sec-label';
                    label.textContent = 'sec';

                    wrapper.appendChild(input);
                    wrapper.appendChild(label);
                    td.appendChild(span);
                    td.appendChild(wrapper);
                    row.appendChild(td);
                } else if(
                    item.target === "rest_seconds"
                ) {
                    const span = document.createElement("span");
                    span.className = "mobile-label";
                    span.textContent = item.mobilelabel;

                    const wrapper = document.createElement('div');
                    wrapper.className = 'input-sec-wrapper input-with-info-enabled';

                    const input = document.createElement('input');
                    input.type = 'number';
                    input.className = 'set-input';
                    input.value = item.value;
                    input.addEventListener("input", async function () {
                        const response = await fetch(`http://127.0.0.1:8000/api/v1/data/gym-plan-set/update/${set.id}/`, {
                            method: "PATCH",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": "Token " + getCookie('csrftoken'),
                            },
                            body: JSON.stringify({
                                [item.target]: this.value
                            })
                        });
                    });

                    const label = document.createElement('span');
                    label.className = 'sec-label';
                    label.textContent = 'sec';

                    wrapper.appendChild(input);
                    wrapper.appendChild(label);
                    td.appendChild(span);
                    td.appendChild(wrapper);
                    row.appendChild(td);
                } else if(item.type === "action") {
                    const span = document.createElement("span");
                    span.className = "mobile-label";
                    span.textContent = item.mobilelabel;

                    const actionsDiv = document.createElement("div");
                    actionsDiv.classList.add("exercise-actions");
                    actionsDiv.style.marginLeft = 0;

                    const editIcon = document.createElement("span");
                    editIcon.classList.add("material-icons", "edit-details-exercise-button");
                    editIcon.textContent = "edit";
                    editIcon.addEventListener("click", (e) => {
                        alert("Modifica dettaglio esercizio n." + set.id);
                    });

                    const deleteIcon = document.createElement("span");
                    deleteIcon.classList.add("material-icons", "delete-details-exercise-button");
                    deleteIcon.textContent = "delete";
                    deleteIcon.addEventListener("click", (e) => {
                        alert("Elimina dettaglio esercizio n." + set.id);
                    });

                    actionsDiv.appendChild(editIcon);
                    actionsDiv.appendChild(deleteIcon);

                    td.appendChild(span);
                    td.appendChild(actionsDiv);
                    row.appendChild(td);
                } else {
                    const span = document.createElement("span");
                    span.className = "mobile-label";
                    span.textContent = item.mobilelabel;

                    const wrapper = document.createElement("div");
                    wrapper.className = item.disabled ? "input-with-info" : "input-with-info-enabled";

                    const input = document.createElement("input");
                    input.type = "number";
                    input.className = "set-input";
                    input.value = item.value;
                    input.addEventListener("input", async function () {
                        const response = await fetch(`http://127.0.0.1:8000/api/v1/data/gym-plan-set/update/${set.id}/`, {
                            method: "PATCH",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": "Token " + getCookie('csrftoken'),
                            },
                            body: JSON.stringify({
                                [item.target]: this.value
                            })
                        });
                    });

                    wrapper.appendChild(input);
                    td.appendChild(span);
                    td.appendChild(wrapper);
                    row.appendChild(td);
                }
            });

            tbody.appendChild(row);
            table.appendChild(tbody);
        });

        if(sameExercisesOnSets)
            for (const riga of table.rows)
                if (riga.cells[0])
                    riga.deleteCell(0);

        divDay.appendChild(box);
    });
}