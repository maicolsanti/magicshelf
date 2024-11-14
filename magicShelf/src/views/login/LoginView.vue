<script setup>
import { addIcons } from 'oh-vue-icons'
import { MdVisibilityoffRound, MdVisibilityRound } from 'oh-vue-icons/icons'
import { useLoginStore } from '@/stores/login'
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

addIcons(MdVisibilityRound, MdVisibilityoffRound);
const loginStore = useLoginStore();
const { infos, getPasswordType } = storeToRefs(loginStore);
const passwordInputType = computed(() => getPasswordType.value);
</script>

<template>
    <main>
        <h1 class="welcome d-flex justify-content-center mb-5">
            Benvenut*,<br />accedi per trovare ciò che cerchi
        </h1>
        <div class="form-g">
            <div class="form-group mb-3">
                <label for="">Username</label>
                <input type="email" class="form-control" id="emailInput" placeholder="indirizzo email" required />
            </div>
            <div class="form-group row">
                <label for="">Password</label>
                <div class="col-md-13 input-group">
                    <input :type="passwordInputType" class=" form-control mb-5" id="passwordInput"
                        placeholder="password" required />
                    <div class="input-group-btn">
                        <button class="btn icon-button" @click="loginStore.toggleShowPassword()">
                            <v-icon v-if="!infos.showPassword" name="md-visibility-round" class="visibility-icon" />
                            <v-icon v-if="infos.showPassword" name="md-visibilityoff-round" class="visibility-icon" />
                        </button>
                    </div>
                </div>
            </div>
            <button type="submit" class="btn btn-primary form-button mb-2">
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
