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

let loginData = {
    fiscalCodeInput: "",
    passwordInput: "",
};

function submit() {
    configurationStore.loginSupplier(loginData.fiscalCodeInput, loginData.passwordInput);
    router.push('/');
}
</script>

<template>
    <main>
        <h1 class="welcome d-flex justify-content-center mb-5">
            Benvenut* fornitore,<br />accedi per gestire i tuoi prodotti
        </h1>
        <div class="form-g">
            <div class="form-group mb-3">
                <label for="">Codice Fiscale</label>
                <input type="text" class="form-control" id="fiscalCodeInput" v-model="loginData.fiscalCodeInput" placeholder="codice fiscale" required />
            </div>
            <div class="form-group row">
                <label for="">Password</label>
                <div class="col-md-13 input-group">
                    <input :type="passwordInputType" class=" form-control mb-5" id="passwordInput" v-model="loginData.passwordInput"
                        placeholder="password" required />
                    <div class="input-group-btn">
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
    width: 350px;
}

input {
    border-color: var(--bs-secondary);
    border-width: 1px;
    height: 40px;
    color: var(--bs-primary);
    min-width: 350px;
}

::placeholder {
    color: var(--bs-secondary);
    opacity: 0.4;
}

label {
    color: var(--bs-primary);
}

.visibility-icon {
    color: var(--bs-secondary);
}

.icon-button {
    height: 40px;
    border-color: var(--bs-secondary);
    border-width: 1px;
    border-top-left-radius: 0%;
    border-bottom-left-radius: 0%;
    border-left: none;
}
</style>
