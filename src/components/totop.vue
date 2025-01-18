​
<template>
    <div id="goTop">
        <button class="goTop ant-btn ant-btn-primary ant-btn-lg ant-btn-circle totop" v-show="goTopShow" @click="goTop" style="border-radius:100%;width:50px;height:50px;">
            <i class="el-icon-caret-top goTopIcon"></i>
        </button>
    </div>
</template>
<script>
export default {
    name: "goTop",
    data() {
        return {
            scrollTop: "",
            goTopShow: false
        };
    },
    watch: {
        scrollTop(val) {
            if (this.scrollTop > 500) {
                this.goTopShow = true;
            } else {
                this.goTopShow = false;
            }
        }
    },
    methods: {
        handleScroll() {
            this.scrollTop =
                window.pageYOffset ||
                document.documentElement.scrollTop ||
                document.body.scrollTop;
            if (this.scrollTop > 500) {
                this.goTopShow = true;
            }
        },
        goTop() {
            let timer = null,
                _that = this;
            cancelAnimationFrame(timer);
            timer = requestAnimationFrame(function fn() {
                if (_that.scrollTop > 0) {
                    _that.scrollTop -= 250;
                    document.body.scrollTop = document.documentElement.scrollTop =
                        _that.scrollTop;
                    timer = requestAnimationFrame(fn);
                } else {
                    cancelAnimationFrame(timer);
                    _that.goTopShow = false;
                }
            });
        }
    },
    mounted() {
        window.addEventListener("scroll", this.handleScroll);
    },
    destroyed() {
        window.removeEventListener("scroll", this.handleScroll);
    }
};
</script>

<style scoped>
.goTop {
    position: fixed;
    right: 40px;
    bottom: 60px;
    
    
    
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
}

</style>

​