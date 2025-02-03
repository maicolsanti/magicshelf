<script setup lang="ts">
import PageTitleNavigation from '@/components/PageTitleNavigation.vue'
import { useRegistrationStore } from '@/stores/registration'
import { storeToRefs } from 'pinia';
import StepOne from '@/components/registration/StepOne.vue'
import StepTwoCostumer from '@/components/registration/StepTwoCostumer.vue'
import StepTwoSupplier from '@/components/registration/StepTwoSupplier.vue'
import { UserType } from '@/models/user-type';
import { computed } from 'vue';

const registrationStore = useRegistrationStore();
const { registration, getStep } = storeToRefs(registrationStore);

const step = computed(() => getStep.value);

</script>

<template>
  <main>
    <div class="mx-4">
      <PageTitleNavigation subTitle="Registrazione" v-bind:goPreviousStep="registration.step !=0"/>
    </div>
    <StepOne v-if="step == 0"></StepOne>
    <StepTwoCostumer v-if="step == 1 && registration.userType == UserType.COSTUMER"></StepTwoCostumer>
    <StepTwoSupplier v-if="step == 1 && registration.userType == UserType.SUPPLIER"></StepTwoSupplier>
  </main>
</template>

<style scoped>
.step-instruction {
  font-weight: lighter;
}

.user-type-dropdown {
  width: 200px;
  align-content: start;
  align-items: start;
  justify-items: stretch;
  border-color: var(--bs-primary);
  border-width: 2px;
}
</style>