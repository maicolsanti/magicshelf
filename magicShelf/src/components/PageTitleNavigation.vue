<script setup>
import '@/assets/scss/custom-css.css'
import { addIcons } from 'oh-vue-icons'
import { IoArrowBackCircleOutline, IoArrowBackCircle } from "oh-vue-icons/icons";
import { useRouter } from 'vue-router'
import { useRegistrationStore } from '@/stores/registration'

const props = defineProps({
    subTitle: {
        type: String,
        required: false
    },
    goPreviousStep: {
        type: Boolean,
        required: false
    }
})

addIcons(IoArrowBackCircleOutline, IoArrowBackCircle);

const registrationStore = useRegistrationStore();

const router = useRouter()
const goBack = () => {
    if(props.goPreviousStep){
        registrationStore.previousStep();
    } else {
        router.go(-1)
    }
}

</script>
<template>
    <div class="row align-items-end">
        <div class="col d-flex flex-column align-items-start">
            <button @click="goBack"><v-icon name="io-arrow-back-circle" scale="2.3" class="navigation-icon" /></button>
        </div>
        <div class="col sub-page-title d-flex flex-column align-items-end">
            <h4>{{ subTitle }}</h4>
        </div>
    </div>
</template>

<style scoped>
.navigation-icon {
    color: var(--bs-primary);
}

.sub-page-title {
    align-items: end;
    align-content: end;
}

button {
    background-color: unset;
    border: unset;
}
</style>
