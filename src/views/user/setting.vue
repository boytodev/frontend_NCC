<script setup>
    import editEmail from '@/components/user/editEmail.vue';
    import editUsername from '@/components/user/editUsername.vue';
    import editPassword from '@/components/user/editPassword.vue';
</script>

<template>
  <div class="flex justify-center mt-12">
    <div class="bg-white rounded-lg p-6 w-96 shadow-2xl">
      <h2 class="text-xl font-bold text-center mb-4">⚙️ การตั้งค่าผู้ใช้</h2>
      <editEmail/>
      <editUsername/>
      <editPassword/>
    </div>
  </div>

</template>
