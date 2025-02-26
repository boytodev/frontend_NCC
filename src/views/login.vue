<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";

const router = useRouter();
const data = ref({
    username: "",
    password: "",
});
const formRef = ref(null); // อ้างอิงฟอร์มเพื่อรีเซ็ต
const login = async () => {
    try {

        const response = await axios.post("https://ncc-api.ncc-computerrepair.com/api-user/login", data.value, {
            withCredentials: true, // ✅ ให้ Axios จัดการ cookies อัตโนมัติ
        });

        if (response.status === 200) {
            const { accessToken, User, Role } = response.data;

            if (!Role) {
                console.error("❌ Role is missing in response!");
                return;
            }

            // ✅ เก็บเฉพาะ `accessToken`ใน localStorage
            localStorage.setItem("accessToken", accessToken);

            Swal.fire({
                icon: "success",
                title: "เข้าสู่ระบบสำเร็จ",
                showConfirmButton: false,
                timer: 1500,
            }).then(() => {
                router.push(Role === "admin" ||"technician" ? "/admin" : "/user");
            });
        }
    } catch (error) {
        console.error("❌ Error logging in:", error);
        Swal.fire({
            icon: "error",
            title: "เข้าสู่ระบบไม่สำเร็จ",
            text: error.response?.data?.message || "เกิดข้อผิดพลาดในการเข้าสู่ระบบ",
            showConfirmButton: true,
        });
    }
};

</script>

<template>
  <section>
    <div class='air air1'></div>
    <div class='air air2'></div>
    <div class='air air3'></div>
    <div class='air air4'></div>
    <div class="flex justify-center items-center h-[100vh]">
      <div
        class="bg-white shadow-md rounded px-8 pt-6 pb-8 w-[90%] sm:w-[50%] md:w-[40%] lg:w-[40%] xl:w-[30%] 2xl:w-[25%]">
        <span class="flex justify-center text-base sm:text-base md:text-base lg:text-lg xl:text-xl 2xl:text-2xl mb-4">
          <span style="
        font-family: Orbitron, serif;font-optical-sizing: auto;
        font-weight: 700;
        font-style: normal;
        margin-right: 10px;
        color:#ff8c00 ;
        ">NCC</span>ComputerRepair</span>
        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form class="space-y-6" ref="formRef" @submit.prevent="login">
            <div>
              <label for="username" class="block text-sm/6 font-medium text-gray-900">username</label>
              <div class="mt-2">
                <input v-model="data.username" type="text" name="username" id="username" required
                  class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
              </div>
            </div>

            <div>
              <div class="flex items-center justify-between">
                <label for="password" class="block text-sm/6 font-medium text-gray-900">Password</label>
              </div>
              <div class="mt-2">
                <input v-model="data.password" type="password" name="password" id="password" required
                  class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
              </div>
            </div>

            <div>
              <button
                class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer">Sign
                in</button>
            </div>
          </form>
        </div>

      </div>
    </div>
  </section>
</template>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400..900&display=swap');

section {
  position: relative;
  width: 100%;
  height: 100vh;
  background: #3586ff;
  overflow: hidden;
}

section .air {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100px;
  background: url(https://1.bp.blogspot.com/-xQUc-TovqDk/XdxogmMqIRI/AAAAAAAACvI/AizpnE509UMGBcTiLJ58BC6iViPYGYQfQCLcBGAsYHQ/s1600/wave.png);
  background-size: 1000px 100px
}

section .air.air1 {
  animation: wave 30s linear infinite;
  z-index: 1000;
  opacity: 1;
  animation-delay: 0s;
  bottom: 0;
}

section .air.air2 {
  animation: wave2 15s linear infinite;
  z-index: 999;
  opacity: 0.5;
  animation-delay: -5s;
  bottom: 10px;
}

section .air.air3 {
  animation: wave 30s linear infinite;
  z-index: 998;
  opacity: 0.2;
  animation-delay: -2s;
  bottom: 15px;
}

section .air.air4 {
  animation: wave2 5s linear infinite;
  z-index: 997;
  opacity: 0.7;
  animation-delay: -5s;
  bottom: 20px;
}

@keyframes wave {
  0% {
    background-position-x: 0px;
  }

  100% {
    background-position-x: 1000px;
  }
}

@keyframes wave2 {
  0% {
    background-position-x: 0px;
  }

  100% {
    background-position-x: -1000px;
  }
}
</style>