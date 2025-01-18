<template>
  <div>
    <v-card v-for="(data,index) in staffdata" :key="index" style="background:transparent; width:fit-content;">
      
      <stafficon :nickname="data.nickname" :playerid="data.id" :avatar_src="data.avatar_src" :staff_span="data.staff_span"></stafficon>
    </v-card>
  </div>
</template>

<script>
import stafficon from "@/components/stafficon.vue";
import staffdata from "@/data/staff.js";
export default {
  components:{
    stafficon
  },
  data(){
    return {
      staff_tmp_data:staffdata,
      staffdata:[]
    }
  },
  methods:{
    staffget(){
      var __this = this
      this.staff_tmp_data.forEach(element => {
        var tmp={}
        tmp["nickname"]=element.nickname
        tmp["id"]=element.id
        tmp["staff_span"]=element.staff_icon
        __this.$api.getbilibiliuidinfo(element.uid,(res)=>{
          console.log(res.data.data.face)
          tmp["avatar_src"]=res.data.data.face
          __this.staffdata.push(tmp)
        })
        
        
      });
      console.log(this.staffdata)
    }
  },
  mounted(){
    this.staffget();
    console.log(this.api.getbilibiliuidinfo)
  }
}
</script>
