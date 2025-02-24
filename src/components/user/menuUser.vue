<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import axios from 'axios'
import Swal from 'sweetalert2'

const router = useRouter()

const navigation = computed(() => [
  { name: 'แจ้งซ่อม', href: '/user', current: router.currentRoute.value.path === '/user' },
  { name: 'รายการแจ้งซ่อม', href: '/user/history', current: router.currentRoute.value.path === '/user/history' },
  { name: 'การตั้งค่า', href: '/user/userSetting', current: router.currentRoute.value.path === '/user/userSetting' },
])

// ฟังก์ชันออกจากระบบ
const logout = async () => {
    try {
        await axios.post("http://89.116.33.183:3000/api-user/logout", {}, {
            withCredentials: true, // ✅ ให้ Axios ส่ง Cookie อัตโนมัติ
        });

        // ✅ ลบ Token ออกจาก localStorage
        localStorage.removeItem("accessToken");
        localStorage.removeItem("role");

        // ✅ แสดงแจ้งเตือนและเปลี่ยนหน้าไป /login
        Swal.fire({
            icon: "success",
            title: "ออกจากระบบสำเร็จ",
            showConfirmButton: false,
            timer: 1500,
        }).then(() => {
            router.push("/login");
        });

    } catch (error) {
        console.error("❌ Logout error:", error);
    }
};

</script>


<template>
  <Disclosure as="nav" class="bg-gray-800" v-slot="{ open }">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- ปุ่มเมนูมือถือ -->
          <DisclosureButton
            class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-inset">
            <span class="sr-only">Open main menu</span>
            <Bars3Icon v-if="!open" class="block size-6" aria-hidden="true" />
            <XMarkIcon v-else class="block size-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
        <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <div class="flex shrink-0 items-center">
            <router-link to="/user" class="text-white font-bold text-lg cursor-pointer">
              <span class="text-orange-400 text-2xl">NCC</span> ComputerRepair
            </router-link>
          </div>

        </div>
        <div>
          <div class="hidden sm:ml-6 sm:block">
            <div class="flex space-x-4">
              <router-link v-for="item in navigation" :key="item.name" :to="item.href"
                :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'rounded-md px-3 py-2 text-sm font-medium']"
                :aria-current="item.current ? 'page' : undefined">
                {{ item.name }}
              </router-link>
            </div>
          </div>
        </div>
        <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

          <!-- เมนูโปรไฟล์ -->
          <Menu as="div" class="relative ml-3">
            <button @click="logout"
              class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">logout</button>
            <!-- <div>
              <div>
              <MenuButton
                class="relative flex bg-gray-800 ">
                <span class="text-white text-lg cursor-pointer">User</span>
              </MenuButton>
            </div>
            <transition enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95">
              <MenuItems
                class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                <MenuItem v-slot="{ active }">
                <button @click="logout"
                  :class="[active ? 'bg-gray-100' : '', 'block w-full text-left px-4 py-2 text-sm text-gray-700']">ออกจากระบบ</button>
                </MenuItem>
              </MenuItems>
            </transition>
            </div> -->
          </Menu>
        </div>
      </div>
    </div>

    <!-- เมนูมือถือ -->
    <DisclosurePanel class="sm:hidden">
      <div class="space-y-1 px-2 pt-2 pb-3">
        <DisclosureButton v-for="item in navigation" :key="item.name" as="template">
          <router-link :to="item.href"
            :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'block rounded-md px-3 py-2 text-base font-medium']"
            :aria-current="item.current ? 'page' : undefined">
            {{ item.name }}
          </router-link>
        </DisclosureButton>

      </div>
    </DisclosurePanel>
  </Disclosure>
</template>