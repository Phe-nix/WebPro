<template>
    <div class="container is-widescreen">
        <section class="section" v-if="error">
            <div class="container is-widescreen">
                <div class="notification is-danger">
                    {{ error.code + ': ' + error.sqlMessage }}
                </div>
            </div>
        </section>
        <section class="hero" v-else>
            <div class="hero-body">
                <p class="title">
                    {{ blog.title }}
                </p>
            </div>
        </section>
        <section class="section" id="app">
            <div class="content">
                <div class="card has-background-light">
                    <div class="card-image pt-5">
                        <div class="columns">
                            <div class="column">
                                <figure class="image" v-for="image in images" :key="image.file_path">
                                    <img :src="image.file_path ? 'http://localhost:3000' + image.file_path : 'https://bulma.io/images/placeholders/640x360.png'"
                                        alt="Placeholder image">
                                </figure>
                            </div>
                        </div>

                    </div>
                    <div class="card-content">
                        <div class="content">
                            {{ blog.content }}
                        </div>
                        <div class="container">
                            <p class="subtitle">Comments</p>
                            <div class="box" v-for="comment in comments" :key="comment.id">
                                <article class="media">
                                    <div class="media-left">
                                        <figure class="image is-64x64">
                                            <img :src="blogs.file_path ? 'http://localhost:3000' + blogs.file_path : 'https://bulma.io/images/placeholders/640x360.png'">              
                                         </figure>
                                    </div>
                                    <div class="media-content">
                                        <div class="content">
                                            <p>
                                                {{ comment.comment }}
                                            </p>
                                            <p class="is-size-7">
                                                {{ comment.comment_date }}
                                            </p>
                                        </div>
                                        <nav class="level is-mobile">
                                            <div class="level-left">
                                                <a class="level-item" aria-label="like">
                                                    <span class="icon is-small">
                                                        <i class="fas fa-heart" aria-hidden="true"></i>
                                                    </span>
                                                </a>
                                            </div>
                                        </nav>
                                    </div>
                                </article>
                            </div>
                            <form>
                                <div class="columns box">
                                    <div class="column is-7">
                                        <input class="input" type="text" name="comment" placeholder="Comment here..."
                                            v-model="newcomment">
                                    </div>
                                    <div class="column is-3">
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
                                    </div>
                                    <div class="column is-2">
                                        <input class="button is-primary" type="submit" value="Submit" @click="built()">
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <footer class="card-footer">
                        <a class="card-footer-item" href="/">To Home Page</a>
                    </footer>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'BlogDetail',
    data() {
        return {
            error: null,
            blog: {},
            comments: [],
            images: {},
            newcomment: '',
        }
    },
    async created() {
        const blogId = this.$route.params.id
        const getBlog = await axios.get(`http://localhost:3000/blogs/${blogId}`)
        const { data } = getBlog;

        this.blog = data.blog;
        this.comments = data.comments;
        this.images = data.images;
    },
    methods: {
        async built() {
            var formData = new FormData();
            const blogId = this.$route.params.id
            formData.append('blog_image', this.file);
            formData.append('comment', this.newcomment);
            formData.append('blog_id', this.blog.id);
            const response = await axios.post(`http://localhost:3000/${blogId}/comments`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            this.comments.push(response.data)
        },
        handleFileUpload() {
            this.file = this.$refs.file.files[0];
        }
    }
}
</script>