<template>
    <div>
        <div class="title">
            <h2>{{ title }}</h2>
        </div>
        
        <div>
           <div class="row">
                <div class="col-md-6">
                    <textarea  v-model="markdown" name="" id="" cols="80" rows="15" @keyup="postMark"></textarea>
                </div>

                <div id="preview" class="col-md-6" v-html="compiledMarkdown"></div>
           </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Home",
  data() {
    return {
      title: "Realtime Markdown Editor",
      markdown: "",
      compiledMarkdown: ""
    };
  },

  created() {
    let pusher = new Pusher("YOUR_API_KEY", {
      cluster: "CLUSTER",
      encrypted: true
    });

    const channel = pusher.subscribe("markdown");
    channel.bind("new-text", data => {
      this.compiledMarkdown = data.markdown;
    });
  },

  methods: {
    postMark(event) {
      const text = this.markdown;
      axios.post("http://localhost:3000/markdown", { text });
    }
  }
};
</script>


<style>
.title {
  margin-bottom: 40px;
}
#preview {
  border: 2px solid;
  text-align: left;
}
</style>
