<template>
    <main>
        <div class="instruction-block py-2 px-4">
            <h3 class="searching-instruction-title mb-3">Cerca in modo semplice</h3>
            <p><span class="instruction-step-t">Step 1</span><br /><span class="instruction-step-p">Accedi, o registrati
                    nel caso tu non abbia ancora un account</span></p>
            <p><span class="instruction-step-t">Step 2</span><br /><span class="instruction-step-p">Vai alla pagina di
                    ricerca</span></p>
            <p><span class="instruction-step-t">Step 3</span><br /><span class="instruction-step-p">Cerca in base al
                    nome del prodotto e filtra in base alle sue caratteristiche</span></p>
            <p><span class="instruction-step-t">Step 4</span><br /><span class="instruction-step-p">Osserva risultati
                    utili e chiari</span></p>
        </div>
    </main>
</template>


<style scoped>
.searching-instruction-title {
    font-family: 'Rubik', Rubik, sans-serif;
    font-weight: lighter;
    color: var(--bs-dark);
}

.instruction-block {
    border: solid;
    border-width: 2px;
    border-color: var(--bs-secondary);
    border-radius: 30px;
    width: fit-content;
}

.instruction-step-t {
    font-weight: 600;
    font-size: 16px;
    color: var(--bs-secondary);
}

.instruction-step-p {
    font-size: 14px;
}
</style>