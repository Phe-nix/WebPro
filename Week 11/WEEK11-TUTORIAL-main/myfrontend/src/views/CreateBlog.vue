<template>
    <div>
        <section class="hero">
            <div class="hero-body ml-5">
                <p class="title">Create a New Blog</p>
            </div>
        </section>
        <section class="container">
            <div class="content">
                <div class="field">
                    <label class="label">Title</label>
                    <input class="input" type="text" name="title" placeholder="Blog title" v-model="title">
                    <p class="help is-danger">*Required</p>
                </div>
                <div class="field">
                    <label class="label">Content</label>
                    <div class="control">
                        <textarea class="textarea" placeholder="Textarea" name="content" v-model="content"></textarea>
                        <p class="help is-danger">*Required</p>
                    </div>
                </div>
                <div class="field">
                    <label class="label">Status</label>
                    <div class="control">
                        <div class="select">
                            <select name="status" v-model="status">
                                <option value="01">Drafted</option>
                                <option value="02">Published</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="field">
                    <div class="control">
                        <label class="checkbox">
                            <input type="checkbox" name="pinned" v-model="pinned">
                            Pin this blog?
                        </label>
                    </div>
                </div>
                <div class="file">
                    <label class="file-label">
                        <input class="file-input" type="file" id="file" ref="file" @change="handleFileUpload()">
                        <span class="file-cta">
                            <span class="file-icon">
                                <i class="fas fa-upload"></i>
                            </span>
                            <span class="file-label">
                                Choose an image…
                            </span>
                        </span>
                    </label>
                </div>
                <div class="field is-grouped mt-3">
                    <div class="control">
                        <input type="button" class="button is-link" value="submit" @click="submit()">
                    </div>
                    <div class="control">
                        <button class="button is-link is-light">Back to home</button>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
  
<script>
import axios from 'axios';
export default {
    data() {
        return {
            title: '',
            content: '',
            status: '01',
            pinned: 0,
            file: null
        }
    },
    methods: {
        handleFileUpload() {
            this.file = this.$refs.file.files[0];
        },
        submit() {
            var formData = new FormData();
            formData.append("blog_image", this.file);
            formData.append("title", this.title)
            formData.append("content", this.content)
            formData.append("status", this.status)
            formData.append("pinned", this.pinned ? 1 : 0)
            // var formData = {
            //     title: this.title,
            //     content: this.content,
            //     status: this.status,
            //     pinned: this.pinned
            // }
            console.log(formData);
            axios.post('http://localhost:3000/blogs', formData).then(response => {
                console.log(response);
                this.$router.push({ path: '/' }) // Success! -> redirect to home page
            })
                .catch(error => {
                    console.log(error.message);
                });
        }
    },
}
</script>