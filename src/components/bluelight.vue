<template>
    <div id="bluelight">
        <div class="protecter"></div>
    </div>
</template>
<style scoped>
#bluelight{
    position:fixed;
    left:0;
    top:0;
    width:100%;
    height:100%;
    z-index:-100000;
    opacity:1;
    background:"#FFE8BB";
}
#bluelight .protecter{
    background-color:"#FFE8BB";
    position:absolute;
    left:0;
    top:0;
    width:100%;
    height:100%;
}
</style>