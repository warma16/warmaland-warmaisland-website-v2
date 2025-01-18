<template>
    <div class="error" v-loading="true" element-loading-text="拼命加载中"
    element-loading-background="rgba(0, 0, 0, 0.8)">
        <i class="error-img"></i>
    </div>
</template>
<style scoped>
.error {
    position:fixed;
    left:0;
    top:0;
    width: 100%;
    height:100%;
}

</style>