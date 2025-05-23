<template>
    <section class="bg-gray-50 ">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-black">
                        Sign in to your account
                    </h1>
                    <form @submit.prevent="login" class="space-y-4 md:space-y-6">
                        <div>
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Email</label>
                            <input v-model="email" type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 rounded-lg block w-full p-2.5" placeholder="example@gmail.com">
                        </div>
                        <div>
                            <label for="password" class="block mb-2 text-sm font-medium">Password</label>
                            <input v-model="password" type="password" name="password" id="password" placeholder="Password" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5">
                        </div>
                        <div class="flex items-center justify-between">
                            <div class="flex items-start">
                                <div class="flex items-center h-5">
                                    <input id="remember" aria-describedby="remember" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50" />
                                </div>
                                <div class="ml-3 text-sm">
                                    <label for="remember" class="text-gray-700">Remember me</label>
                                </div>
                            </div>
                        </div>
                        <button type="submit" class="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign in</button>
                        <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                            Don’t have an account yet? <router-link to="/register" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</router-link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
    import { ref, inject } from 'vue';
    import { useStore } from 'vuex';
    import { useRouter } from 'vue-router';
    import { ToastifySuccess, ToastifyError  } from '../../utils/Toastify';

    const store = useStore();
    const router = useRouter();
    const email = ref('');
    const password = ref('');
    const setAuthToken = inject<(token: string) => void>('setAuthToken');

    const login = async () => {
        try {
            const payload = {
                email: email.value,
                password: password.value,
            };
            const response = await store.dispatch('login/signin', payload);
            if (response.status === 200) {
                ToastifySuccess('Login Successful')
                const token = response.data.token;
                setAuthToken?.(token);
                router.push({ name: 'HomeComponent' });
            }
        } catch (err) {
            console.error('Login error:', err);
            ToastifyError('Login failed. Please try again.')
        }
    };
</script>
