<script setup lang="ts">
import { addIcons } from 'oh-vue-icons'
import { MdVisibilityoffRound, MdVisibilityRound } from 'oh-vue-icons/icons'
import { useLoginStore } from '@/stores/login'
import { useConfigurationStore } from '@/stores/configurations'
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useRouter } from 'vue-router'

addIcons(MdVisibilityRound, MdVisibilityoffRound);
const loginStore = useLoginStore();
const configurationStore = useConfigurationStore();
const { infos, getPasswordType } = storeToRefs(loginStore);
const passwordInputType = computed(() => getPasswordType.value);

const router = useRouter()

// Form data
let loginData = {
    usernameInput: "",
    passwordInput: "",
};

// Login
function submit() {
    configurationStore.loginCostumer(loginData.usernameInput, loginData.passwordInput);
    router.push('/');
}
</script>

<template>
    <main>
        <h1 class="welcome d-flex justify-content-center mb-5">
            Benvenut*,<br />accedi per trovare ciò che cerchi
        </h1>
        <div class="form-g">
            <div class="row form-group mb-3">
                <label for="">Username</label>
                <input type="email" class="form-control" id="usernameInput" v-model="loginData.usernameInput" placeholder="indirizzo email" required />
            </div>
            <div class="row form-group form-column">
                <label for="">Password</label>
                <div class="col-md-13 input-group">
                    <input :type="passwordInputType" class=" form-control mb-5" id="passwordInput" v-model="loginData.passwordInput"
                        placeholder="password" required />
                    <div class="">
                        <button class="btn icon-button" @click="loginStore.toggleShowPassword()">
                            <v-icon v-if="!infos.showPassword" name="md-visibility-round" class="visibility-icon" />
                            <v-icon v-if="infos.showPassword" name="md-visibilityoff-round" class="visibility-icon" />
                        </button>
                    </div>
                </div>
            </div>
            <button @click="submit" class="btn btn-primary form-button mb-2">
                Accedi
            </button>
            <RouterLink to="/registration" class="nav-link inactive-page" active-class="active-page">
                <p class="form-alternative">
                    Non hai un account?<br /><span class="form-alternative-a">Registrati</span>
                </p>
            </RouterLink>
        </div>
    </main>
</template>

<style scoped>
.form-g {
    justify-self: center;
    justify-items: center;
}

input {
    border-color: var(--bs-secondary);
    border-width: 1px;
    height: 40px;
    color: var(--bs-primary);
    min-width: 150px;
}

label {
    color: var(--bs-primary);
}

</style>
