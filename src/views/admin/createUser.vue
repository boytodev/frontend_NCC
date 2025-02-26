<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
const router = useRouter();
const data = ref({
    email: "",
    username: "",
    password: "",
    role: "",
});

const register = async () => {
    try {
        const apiURL = "https://ncc-api.ncc-computerrepair.com/api-user/register"; // ✅ แก้พอร์ตให้ถูกต้อง
        const token = localStorage.getItem("accessToken"); // ✅ ใช้ token ในกรณีที่ admin ต้องเพิ่ม user

        const response = await axios.post(apiURL, data.value, {
            headers: {
                Authorization: `Bearer ${token}`, // 🔒 ส่ง token เพื่อยืนยันสิทธิ์ (ถ้าจำเป็น)
            },
            withCredentials: true, // ✅ ให้ backend รับ cookie (ถ้าใช้)
        });

        console.log("📌 Response:", response.data);

        if (response.status === 201) { // ✅ `201 Created` เหมาะสมกว่า
            Swal.fire({
                icon: "success",
                title: "เพิ่มผู้ใช้สำเร็จ",
                showConfirmButton: false,
                timer: 1500,
            }).then(() => {
                router.push("/admin/manage-users");

                // ✅ รีเซ็ตค่าข้อมูล (password ไม่ควรเก็บ)
                data.value = {
                    email: "",
                    username: "",
                    password: "", // ⚠ ล้าง password เพื่อความปลอดภัย
                    role: "",
                };
            });
        }
    } catch (error) {
        console.error("❌ Error saving data:", error);

        Swal.fire({
            icon: "error",
            title: "บันทึกข้อมูลไม่สำเร็จ",
            text: error.response?.data?.message || "เกิดข้อผิดพลาดในการบันทึกข้อมูล",
            showConfirmButton: true,
        });
    }
};

</script>

<template>
    <div class=" flex justify-center mt-12">
        <div class="bg-neutral-300 rounded-md p-6 w-96 shadow-2xl">
            <h1 class="text-center text-2xl font-bold">
                สร้างผู้ใช้
            </h1>
            <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form class="space-y-6" @submit.prevent="register">
                    <div>
                        <label for="email" class="block text-sm/6 font-medium text-gray-900">email</label>
                        <div class="mt-1">
                            <input v-model="data.email" type="email" required
                                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                        </div>
                    </div>
                    <div>
                        <label for="username" class="block text-sm/6 font-medium text-gray-900">username</label>
                        <div class="mt-1">
                            <input v-model="data.username" type="text" required
                                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                        </div>
                    </div>

                    <div>
                        <div class="flex items-center justify-between">
                            <label for="password" class="block text-sm/6 font-medium text-gray-900">Password</label>
                        </div>
                        <div class="mt-1">
                            <input v-model="data.password" type="password" required
                                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                        </div>
                    </div>
                    <div>
                        <div class="flex items-center justify-between">
                            <label for="role" class="block text-sm/6 font-medium text-gray-900">บทบาท</label>
                        </div>
                        <div class="mt-1">
                            <select v-model="data.role"
                                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                required>
                                <option value="admin">ผู้ดูแลระบบ</option>
                                <option value="user">ผู้ใช้ทั่วไป</option>
                                <option value="technician">ช่างเทคนิค</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <button
                            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer">
                            เพิ่มผู้ใช้
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>